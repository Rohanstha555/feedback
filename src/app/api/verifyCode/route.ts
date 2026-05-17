import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({
      username: decodedUsername,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 },
      );
    }

    const isValidCode = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (!isValidCode || !isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Code didn't match",
        },
        { status: 400 },
      );
    }

    user.isVerified = true;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "verified Successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error verifying code", error);

    return Response.json(
      {
        success: false,
        message: "Error verifying code",
      },
      { status: 400 },
    );
  }
}
