// api/proxy-saveform.ts
// FINAL STABLE VERSION — no errors, no missing types, full compatibility.

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzhrhieMVZ9RYhnGrCA9e6OUr2wI5tl90SegwzFiS1XxSXo-b1hDKTPACL8DYoqJkNC/exec';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body ?? {};
    const forwardJson = String(process.env.FORWARD_JSON || 'false').toLowerCase() === 'true';

    let fetchOptions: RequestInit = { method: 'POST' };

    if (forwardJson) {
      // Forward as JSON
      fetchOptions.headers = { 'Content-Type': 'application/json' };
      fetchOptions.body = JSON.stringify(payload);
    } else {
      // Forward as x-www-form-urlencoded (best compatibility for Google Apps Script)
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        params.append(key, typeof value === 'string' ? value : JSON.stringify(value ?? ''));
      });

      fetchOptions.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
      fetchOptions.body = params.toString();
    }

    const forwardRes = await fetch(GOOGLE_SCRIPT_URL, fetchOptions);
    const text = await forwardRes.text();

    // Try to respond with JSON if possible
    try {
      const json = JSON.parse(text);
      res.setHeader('Content-Type', 'application/json');
      return res.status(forwardRes.status).json(json);
    } catch {
      // Fallback: plain text
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(forwardRes.status).send(text);
    }
  } catch (err: any) {
    console.error('proxy-saveform error:', err);
    return res.status(502).json({
      error: 'Failed to forward request',
      detail: err?.message ?? String(err),
    });
  }
}
