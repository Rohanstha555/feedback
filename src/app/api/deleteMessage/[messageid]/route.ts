import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } },
) {
  await dbConnect();
  
  const {messageid} = await params
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 400 },
    );
  }

console.log("messageId from params:", messageid)
console.log("user._id:", user._id)

  try {
    const result = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageid) } } },
    );
    console.log("result: ", result);
    
    if (result.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "message not found or deleted",
        },
        { status: 404 },
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error deleteing message",
      },
      { status: 500 },
    );
  }
}
