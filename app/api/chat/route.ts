import { NextResponse } from "next/server";
import {
  getSystemPrompt,
  generateDeterministicResponse,
  isAllowedRate,
  sanitizeMessages,
} from "@/lib/ai";

export const runtime = "nodejs";

const MAX_PAYLOAD_BYTES = 32_768; // 32KB max request body

const SECURITY_HEADERS = {
  "Cache-Control": "private, no-cache, no-store, must-revalidate",
  "X-Content-Type-Options": "nosniff",
};

export async function POST(req: Request) {
  try {
    // 1. Enforce payload size limit prior to full memory allocation
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return new NextResponse(
        JSON.stringify({ error: "Payload too large. Maximum body size is 32KB." }),
        {
          status: 413,
          headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
          },
        }
      );
    }

    // 2. Client IP extraction prioritizing Vercel's trusted edge proxy header
    const vercelIp = req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
    const realIp = req.headers.get("x-real-ip")?.trim();
    const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const ip = vercelIp || realIp || forwarded || "127.0.0.1";

    if (!isAllowedRate(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Rate limit exceeded. Please wait a moment before sending more messages." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
          },
        }
      );
    }

    // 3. Safe JSON parsing with graceful syntax error rejection
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new NextResponse(
        JSON.stringify({ error: "Malformed JSON payload in request body." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
          },
        }
      );
    }

    const rawMessages = (body as Record<string, unknown>)?.messages;
    const sanitizedMessages = sanitizeMessages(Array.isArray(rawMessages) ? rawMessages : [], 10);

    if (sanitizedMessages.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "A valid non-empty messages array is required." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
          },
        }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    // 4. If GROQ_API_KEY is available, stream from Groq with abort signal & timeout
    if (groqApiKey) {
      try {
        const systemPrompt = getSystemPrompt();
        const groqPayload = [
          { role: "system", content: systemPrompt },
          ...sanitizedMessages,
        ];

        const candidateModels = [
          process.env.GROQ_MODEL,
          "openai/gpt-oss-120b",
          "openai/gpt-oss-20b",
          "qwen/qwen3.8-27b",
          "llama-3.3-70b-versatile",
        ].filter(Boolean) as string[];

        for (const model of candidateModels) {
          try {
            const timeoutSignal = AbortSignal.timeout(8000);
            const combinedSignal = req.signal
              ? AbortSignal.any([req.signal, timeoutSignal])
              : timeoutSignal;

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
              signal: combinedSignal,
            });

            if (response.ok && response.body) {
              return new Response(response.body, {
                headers: {
                  "Content-Type": "text/event-stream; charset=utf-8",
                  "Connection": "keep-alive",
                  ...SECURITY_HEADERS,
                },
              });
            } else {
              if (response.status === 404 || response.status === 400) {
                continue;
              }
            }
          } catch (modelErr: unknown) {
            const isAbort = modelErr instanceof Error && modelErr.name === "AbortError";
            if (isAbort && req.signal?.aborted) {
              // Client disconnected, stop trying candidate models
              break;
            }
          }
        }
      } catch {
        // Fall back gracefully to local deterministic response generator
      }
    }

    // 5. Intelligent local streaming fallback with disconnect-aware ReadableStream
    const answerText = generateDeterministicResponse(sanitizedMessages);
    const encoder = new TextEncoder();
    let isCancelled = false;

    const stream = new ReadableStream({
      async start(controller) {
        const words = answerText.split(" ");
        for (let i = 0; i < words.length; i++) {
          if (isCancelled) break;
          const chunk = (i === 0 ? "" : " ") + words[i];
          const sseData = `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk } }],
          })}\n\n`;

          try {
            controller.enqueue(encoder.encode(sseData));
          } catch {
            break;
          }

          await new Promise((r) => setTimeout(r, 14));
        }

        if (!isCancelled) {
          try {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch {
            // Stream was closed externally
          }
        }
      },
      cancel() {
        isCancelled = true;
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Connection": "keep-alive",
        ...SECURITY_HEADERS,
      },
    });
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    if (isAbort) {
      return new NextResponse(
        JSON.stringify({ error: "Request timed out or was cancelled by the client." }),
        {
          status: 504,
          headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
          },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred while processing your request." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...SECURITY_HEADERS,
        },
      }
    );
  }
}
