import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-Studentsdata:rYxPds7vSHJW8XIc@studentsdata.tjf8xog.mongodb.net/?retryWrites=true&w=majority";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable to preserve value across hot reloads in dev
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
