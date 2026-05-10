import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  password: z.string().min(1, "Password is required"),
});
