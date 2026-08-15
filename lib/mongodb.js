import { MongoClient } from 'mongodb';
import dns from 'node:dns';

// Fix for Node.js on Windows with MongoDB Atlas querySrv ECONNREFUSED
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('Could not set custom DNS servers:', e);
}

const uri = process.env.MONGODB_URI || 'mongodb+srv://anmol:4328@scoreboard.nwyuwqt.mongodb.net/?retryWrites=true&w=majority';
const dbName = process.env.MONGODB_DB || 'pen_llm_analytics';

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });
  clientPromise = client.connect();
}

export async function getDatabase() {
  const conn = await clientPromise;
  return conn.db(dbName);
}

export default clientPromise;
