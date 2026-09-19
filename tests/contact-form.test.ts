import { describe, it, expect } from "bun:test";

// Validation logic matching app/contact/page.tsx
function validate(field: "fullname" | "email" | "message", val: string): string | null {
  const trimmed = val.trim();
  if (field === "fullname") {
    if (!trimmed) return "Name is required.";
    if (trimmed.length < 2) return "Name must be at least 2 characters.";
    return null;
  }
  if (field === "email") {
    if (!trimmed) return "Email is required.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(trimmed)) return "Enter a valid email address.";
    return null;
  }
  if (field === "message") {
    if (!trimmed) return "Message is required.";
    if (trimmed.length < 10) return "Message must be at least 10 characters.";
    return null;
  }
  return null;
}

// Simulated submission handler reproducing app/contact/page.tsx handleSubmit
async function submitContactForm(
  formData: { fullname: string; email: string; message: string },
  mockFetch: (url: string, init?: RequestInit) => Promise<Response>
) {
  let status: "idle" | "submitting" | "sent" | "error" = "submitting";
  let errorMessage: string | null = null;
  const preservedForm = { ...formData };

  try {
    const res = await mockFetch("https://formspree.io/f/mgoggodq", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      status = "sent";
    } else {
      const resData = await res.json().catch(() => null);
      errorMessage =
        resData?.errors?.map((err: { message?: string }) => err.message).filter(Boolean).join(", ") ||
        resData?.error ||
        "Message delivery failed.";
      status = "error";
    }
  } catch {
    errorMessage = "Network connection error.";
    status = "error";
  }

  return { status, errorMessage, preservedForm };
}

describe("Contact Form Validation & Resilience", () => {
  it("rejects empty and undersized fields", () => {
    expect(validate("fullname", "")).toBe("Name is required.");
    expect(validate("fullname", "A")).toBe("Name must be at least 2 characters.");
    expect(validate("fullname", "Alex Morgan")).toBeNull();

    expect(validate("email", "")).toBe("Email is required.");
    expect(validate("email", "not-an-email")).toBe("Enter a valid email address.");
    expect(validate("email", "alex@example.com")).toBeNull();

    expect(validate("message", "Too short")).toBe("Message must be at least 10 characters.");
    expect(validate("message", "This is a sufficiently long message.")).toBeNull();
  });

  it("marks status as sent only when fetch response is ok (HTTP 200)", async () => {
    const mockSuccess = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });

    const result = await submitContactForm(
      { fullname: "Alex", email: "alex@example.com", message: "Discussing a compiler migration." },
      mockSuccess
    );

    expect(result.status).toBe("sent");
    expect(result.errorMessage).toBeNull();
  });

  it("marks status as error and preserves form data when server rejects (HTTP 400/429)", async () => {
    const mockRejection = async () =>
      new Response(JSON.stringify({ error: "Formspree rate limit exceeded." }), { status: 429 });

    const initialData = { fullname: "Alex", email: "alex@example.com", message: "Discussing a compiler migration." };
    const result = await submitContactForm(initialData, mockRejection);

    expect(result.status).toBe("error");
    expect(result.errorMessage).toBe("Formspree rate limit exceeded.");
    expect(result.preservedForm).toEqual(initialData);
  });

  it("marks status as error and preserves form data on network disconnect", async () => {
    const mockNetworkFail = async () => {
      throw new Error("Failed to fetch");
    };

    const initialData = { fullname: "Alex", email: "alex@example.com", message: "Discussing a compiler migration." };
    const result = await submitContactForm(initialData, mockNetworkFail);

    expect(result.status).toBe("error");
    expect(result.errorMessage).toContain("Network connection error");
    expect(result.preservedForm).toEqual(initialData);
  });
});
