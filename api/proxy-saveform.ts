// api/proxy-saveform.ts
// A safe JSON-only proxy for Google Apps Script.
// Works on Vercel with zero configuration.

const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzhrhieMVZ9RYhnGrCA9e6OUr2wI5tl90SegwzFiS1XxSXo-b1hDKTPACL8DYoqJkNC/exec";

export default async function handler(req: any, res: any) {
  // Preflight support
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method Not Allowed",
    });
  }

  // Begin forwarding
  try {
    const payload = req.body || {};
    const forwardJson =
      String(process.env.FORWARD_JSON || "false").toLowerCase() === "true";

    const fetchOptions: RequestInit = {
      method: "POST",
    };

    // Forward as JSON to the script
    if (forwardJson) {
      fetchOptions.headers = { "Content-Type": "application/json" };
      fetchOptions.body = JSON.stringify(payload);
    }
    // Forward as form-urlencoded
    else {
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        params.append(
          key,
          typeof value === "string" ? value : JSON.stringify(value ?? "")
        );
      });

      fetchOptions.headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      };
      fetchOptions.body = params.toString();
    }

    // Send request to Google Apps Script
    const forwardRes = await fetch(GOOGLE_SCRIPT_URL, fetchOptions);
    const text = await forwardRes.text();

    // Wrap response in safe JSON
    const envelope: any = {
      ok: forwardRes.ok,
      status: forwardRes.status,
      statusText: forwardRes.statusText,
      bodyText: text, // Always include raw text
      jsonBody: null,
    };

    // Try to parse JSON if possible
    try {
      envelope.jsonBody = JSON.parse(text);
    } catch {
      envelope.jsonBody = null;
    }

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(envelope);
  } catch (err: any) {
    console.error("Proxy error:", err);

    return res.status(500).json({
      ok: false,
      error: "Internal Proxy Error",
      detail: err?.message ?? String(err),
    });
  }
}
