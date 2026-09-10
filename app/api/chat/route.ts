import { NextResponse } from "next/server";
import {
  getSystemPrompt,
  generateDeterministicResponse,
  isAllowedRate,
  sanitizeMessages,
} from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : (req.headers.get("x-real-ip")?.trim() || "local");
    if (!isAllowedRate(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const rawMessages = body?.messages || [];
    const sanitizedMessages = sanitizeMessages(rawMessages, 10);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: "Valid messages array required" }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    // 1. If GROQ_API_KEY is available, stream from Groq
    if (groqApiKey) {
      try {
        const systemPrompt = getSystemPrompt();
        const groqPayload = [
          { role: "system", content: systemPrompt },
          ...sanitizedMessages,
        ];

        // Candidate models in order of priority: user-defined or modern Groq production models
        const candidateModels = [
          process.env.GROQ_MODEL,
          "openai/gpt-oss-120b",
          "openai/gpt-oss-20b",
          "qwen/qwen3.8-27b",
          "llama-3.3-70b-versatile",
        ].filter(Boolean) as string[];

        for (const model of candidateModels) {
          try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model,
                messages: groqPayload,
                temperature: 0.6,
                max_tokens: 600,
                stream: true,
              }),
            });

            if (response.ok && response.body) {
              return new Response(response.body, {
                headers: {
                  "Content-Type": "text/event-stream",
                  "Cache-Control": "no-cache",
                  "Connection": "keep-alive",
                },
              });
            } else {
              const errText = await response.text().catch(() => "");
              console.warn(`[Groq API] Model "${model}" failed (${response.status}): ${errText}`);
              // If model not found or invalid, continue to next candidate
              if (response.status === 404 || response.status === 400) {
                continue;
              }
            }
          } catch (modelErr) {
            console.warn(`[Groq API] Error requesting model "${model}":`, modelErr);
          }
        }
      } catch (err) {
        console.error("[Groq API] Unexpected error in chat route:", err);
      }
    }

    // 2. Intelligent local streaming fallback with turn awareness & intent matching
    const answerText = generateDeterministicResponse(sanitizedMessages);
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const words = answerText.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          const sseData = `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk } }],
          })}\n\n`;
          controller.enqueue(encoder.encode(sseData));
          await new Promise((r) => setTimeout(r, 14));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
