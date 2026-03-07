require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function test() {
  const uri = process.env.MONGODB_URL;
  console.log("URI:", uri);
  if (!uri) { console.log("NO URI"); return; }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db();
    const collection = db.collection('posts');
    const docs = await collection.find({}).toArray();
    console.log("Posts:");
    docs.forEach(d => console.log(d.title, d.status, d.slug));
  } finally {
    await client.close();
  }
}
test().catch(console.dir);
