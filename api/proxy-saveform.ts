// api/proxy-saveform.ts
const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzhrhieMVZ9RYhnGrCA9e6OUr2wI5tl90SegwzFiS1XxSXo-b1hDKTPACL8DYoqJkNC/exec";

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const payload = req.body || {};

    // Auto-detect: if client sent JSON, forward JSON; otherwise forward form-encoded
    const incomingContentType = (req.headers?.["content-type"] || req.headers?.["Content-Type"] || "").toString().toLowerCase();
    const forwardJsonEnv = String(process.env.FORWARD_JSON || "false").toLowerCase() === "true";
    const shouldForwardJson = forwardJsonEnv || incomingContentType.includes("application/json");

    const fetchOptions: RequestInit = { method: "POST" };

    if (shouldForwardJson) {
      fetchOptions.headers = { "Content-Type": "application/json" };
      fetchOptions.body = JSON.stringify(payload);
    } else {
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        params.append(key, typeof value === "string" ? value : JSON.stringify(value ?? ""));
      });
      fetchOptions.headers = { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" };
      fetchOptions.body = params.toString();
    }

    const forwardRes = await fetch(GOOGLE_SCRIPT_URL, fetchOptions);
    const text = await forwardRes.text();

    const envelope: any = {
      ok: forwardRes.ok,
      status: forwardRes.status,
      statusText: forwardRes.statusText,
      bodyText: text,
      jsonBody: null,
    };

    try { envelope.jsonBody = JSON.parse(text); } catch { envelope.jsonBody = null; }

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(envelope);
  } catch (err: any) {
    console.error("Proxy error:", err);
    return res.status(500).json({ ok: false, error: "Internal Proxy Error", detail: err?.message ?? String(err) });
  }
}
