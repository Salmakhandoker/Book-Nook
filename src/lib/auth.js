import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./dbConnect";

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise.then(c => c.db("studynook"))),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  trustedOrigins: ["http://localhost:3000"],
});



// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// import clientPromise from "./dbConnect";

// const client = await clientPromise;

// export const auth = betterAuth({
//   database: mongodbAdapter(client.db("studynook")),

//   emailAndPassword: {
//     enabled: true,
//   },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },

//   trustedOrigins: [
//     "http://localhost:3000",
//   ],
// });

// import { betterAuth } from "better-auth"
// import { mongodbAdapter } from "better-auth/adapters/mongodb"
// import { MongoClient } from "mongodb"
// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("studyNookDB");


// export const auth = betterAuth({
//    database: mongodbAdapter(db,{
//     client
//    }),
//    emailAndPassword: {
//     enabled:true,
//    },
//     socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID ,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET  
//         }, 
//     },
//       trustedOrigins: [
//     "http://localhost:3000",
//   ],
// });