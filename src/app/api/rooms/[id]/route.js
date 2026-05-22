import { NextResponse } from "next/server";

import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const dbName = "studynookDB";

/*
========================================
GET SINGLE ROOM
========================================
*/

export async function GET(req, context) {
  try {
    await client.connect();

    const db = client.db(dbName);

    const roomsCollection =
      db.collection("rooms");

    const id = context.params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid room ID",
        },
        {
          status: 400,
        }
      );
    }

    const room =
      await roomsCollection.findOne({
        _id: new ObjectId(id),
      });

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          message: "Room not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

/*
========================================
UPDATE ROOM
========================================
*/

export async function PUT(req, context) {
  try {
    await client.connect();

    const db = client.db(dbName);

    const roomsCollection =
      db.collection("rooms");

    const id = context.params.id;

    const updatedData =
      await req.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid room ID",
        },
        {
          status: 400,
        }
      );
    }

    const result =
      await roomsCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: updatedData,
        }
      );

    return NextResponse.json({
      success: true,
      modifiedCount:
        result.modifiedCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

/*
========================================
DELETE ROOM
========================================
*/

export async function DELETE(
  req,
  context
) {
  try {
    await client.connect();

    const db = client.db(dbName);

    const roomsCollection =
      db.collection("rooms");

    const bookingsCollection =
      db.collection("bookings");

    const id = context.params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid room ID",
        },
        {
          status: 400,
        }
      );
    }

    /*
    DELETE RELATED BOOKINGS
    */

    await bookingsCollection.deleteMany({
      roomId: id,
    });

    /*
    DELETE ROOM
    */

    const result =
      await roomsCollection.deleteOne({
        _id: new ObjectId(id),
      });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Room not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Room deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}