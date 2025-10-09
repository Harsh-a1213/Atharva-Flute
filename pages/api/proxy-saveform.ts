// pages/api/proxy-saveform.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Only POST allowed" });

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxH4uHA7dPVFjJvE0GuOG-_OWg_RJzwOFRnS57-OejZHZi0CGrHce_8eX9LvsPwjDUQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text(); // Apps Script may return text
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: (err as any).message });
  }
}
