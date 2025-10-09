import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "Studentsdata";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("enquiries");

    const result = await collection.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    res.status(200).json({
      status: "success",
      message: "Form submitted successfully!",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ status: "error", message: "Database error" });
  }
}
