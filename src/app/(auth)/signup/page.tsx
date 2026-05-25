"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { signUpSchema } from "@/Schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Check, X, Eye, EyeOff, MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

export default function Page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const res = await axios.get(`/api/checkUsername?username=${username}`)
          console.log("res:", res);
          setUsernameMessage(res.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username");
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsername();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/signup", data);
      console.log("res:", res.data);
      console.log("data:", data);
      toast.success(res.data.message);
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUsernameAvailable = usernameMessage === "Username is available";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f8] px-4 py-8">
      <div className="w-full max-w-[400px] bg-white border border-[#ebebeb] rounded-2xl p-8">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-7">
          <div className="w-[30px] h-[30px] bg-[#18181b] rounded-lg flex items-center justify-center">
            <MessageCircleMore className="w-4 h-4 text-[#a3e635]" />
          </div>
          <span className="text-[15px] font-semibold text-[#18181b] tracking-tight">
            Feedback
          </span>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-[22px] font-semibold text-[#18181b] tracking-tight mb-1">
            Create an account
          </h1>
          <p className="text-[13px] text-[#a1a1aa]">
            Already have one?{" "}
            <Link href="/sign-in" className="text-[#18181b] font-medium underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <label className="text-xs font-medium text-[#71717a]">
                    Username
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="your_handle"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      className="bg-[#fafafa] border-[#e4e4e7] focus:bg-white focus:border-[#18181b] focus:ring-[#18181b]/10 text-[13.5px] pr-8 rounded-lg h-9"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      {isCheckingUsername && (
                        <Loader2 className="w-3 h-3 animate-spin text-[#71717a]" />
                      )}
                      {!isCheckingUsername && username && isUsernameAvailable && (
                        <Check className="w-3 h-3 text-green-600" />
                      )}
                      {!isCheckingUsername && usernameMessage && !isUsernameAvailable && (
                        <X className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>

                  {!isCheckingUsername && usernameMessage && (
                    <p className={`text-[11px] font-mono ${
                      isUsernameAvailable ? "text-green-600" : "text-red-500"
                    }`}>
                      {usernameMessage}
                    </p>
                  )}

                  {!isCheckingUsername && isUsernameAvailable && (
                    <p className="text-[11px] font-mono text-[#a1a1aa]">
                      feedbackapp.io/{username}
                    </p>
                  )}

                  <FormMessage className="text-[11px] font-mono" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <label className="text-xs font-medium text-[#71717a]">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="bg-[#fafafa] border-[#e4e4e7] focus:bg-white focus:border-[#18181b] focus:ring-[#18181b]/10 text-[13.5px] rounded-lg h-9"
                  />
                  <FormMessage className="text-[11px] font-mono" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <label className="text-xs font-medium text-[#71717a]">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="min. 8 characters"
                      {...field}
                      className="bg-[#fafafa] border-[#e4e4e7] focus:bg-white focus:border-[#18181b] focus:ring-[#18181b]/10 text-[13.5px] pr-8 rounded-lg h-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#d4d4d8] hover:text-[#71717a] transition-colors"
                    >
                      {showPassword
                        ? <EyeOff className="w-3.5 h-3.5" />
                        : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <FormMessage className="text-[11px] font-mono" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || isCheckingUsername}
              className="w-full bg-[#18181b] hover:bg-[#18181b]/85 text-white rounded-lg h-9 text-[13.5px] font-medium tracking-tight mt-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>

          </form>
        </Form>

        <p className="text-center text-[11px] text-[#a1a1aa] mt-5">
          By signing up you agree to our{" "}
          <Link href="/terms" className="text-[#71717a] underline underline-offset-2">Terms</Link>
          {" "}&{" "}
          <Link href="/privacy" className="text-[#71717a] underline underline-offset-2">Privacy</Link>
        </p>

      </div>
    </div>
  );
}