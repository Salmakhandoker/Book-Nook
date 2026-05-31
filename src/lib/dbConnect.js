import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

// import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("MONGODB_URI is not defined in .env.local");
// }

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   // In development, use a global variable so the MongoClient
//   // is not re-created on every hot-reload
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production, create a fresh client
//   client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });
//   clientPromise = client.connect();
// }

// // ✅ Export a function that resolves the promise and returns the db instance
// // Use this in your auth.js: getDb() gives Better Auth what it needs
// export async function getDb(dbName = "studyNookDB") {
//   const mongoClient = await clientPromise;
//   return mongoClient.db(dbName);
// }

// // ✅ Export clientPromise for Better Auth adapter
// export { clientPromise };

// // ✅ Default export stays the same for any existing code
// export default clientPromise;