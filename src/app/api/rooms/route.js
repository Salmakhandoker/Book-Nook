import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const dbName = "studynookDB";

let cachedDb = null;

async function connectDB() {
  if (cachedDb) return cachedDb;

  await client.connect();
  cachedDb = client.db(dbName);
  return cachedDb;
}

/*
====================================
GET ROOMS (SEARCH + FILTER FIXED)
====================================
*/
export async function GET(request) {
  try {
    const db = await connectDB();
    const roomsCollection = db.collection("rooms");

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const amenities = searchParams.get("amenities") || "";

    const query = {};

    /* -----------------------------
      SEARCH BY ROOM NAME
    ------------------------------ */
    if (search.trim()) {
      query.roomName = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    /* -----------------------------
      FILTER BY AMENITIES (FIXED)
    ------------------------------ */
    if (amenities.trim()) {
      const amenitiesArray = amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      if (amenitiesArray.length > 0) {
        query.amenities = {
          $in: amenitiesArray,
        };
      }
    }

    const rooms = await roomsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/*
====================================
CREATE ROOM
====================================
*/
export async function POST(request) {
  try {
    const db = await connectDB();
    const roomsCollection = db.collection("rooms");

    const body = await request.json();

    const newRoom = {
      ...body,
      bookingCount: 0,
      createdAt: new Date(),
    };

    const result = await roomsCollection.insertOne(newRoom);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}