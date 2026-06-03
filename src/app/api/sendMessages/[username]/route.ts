import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request, { params }: { params: { username: string } },) {
  await dbConnect();
  
  const {username} = await params;
  const { content } = await request.json();
  console.log(username);
  console.log(content);
  
  try {
    const user = await UserModel.findOne({ username });
    console.log(user);
    
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      ); // 404 not 401
    }

    if (!user.isAcceptMsg) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 },
      ); // 403 not 404
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message); // messages not message
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error sending message",
      },
      { status: 500 },
    ); // 500 not 401
  }
}
