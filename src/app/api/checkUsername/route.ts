import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import { usernameValidation } from "@/Schemas/signUpSchema";
import UserModel from "@/model/User";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  // if(request.method !== "GET"){
  //         return Response.json({
  //             success: false,
  //             message: "method not allowed"
  //         },{status:405})
  // }

  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryparams = {
      username: searchParams.get("username"),
    };
    //validate

    const result = usernameQuerySchema.safeParse(queryparams);
    console.log(result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ") // ← actual error reason
              : "invalid query parameters", // ← fallback if no specific error
        },
        { status: 400 },
      );
    }
    const { username } = result.data;

    const existingVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: "Username Already Taken",
        },
        { status: 400 },
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error Checking Username",
      },
      { status: 500 },
    );
  }
}
