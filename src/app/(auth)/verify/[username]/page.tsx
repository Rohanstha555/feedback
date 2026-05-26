"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/Schemas/verifySchema";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft, MailCheck, Check } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {}

function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verified, setverified] = useState(false);
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const res = await axios.post("/api/verifyCode", {
        username: params.username,
        code: data.code,
      });
      toast.success(res.data.message);
      router.replace("/signin");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Signup failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f8] px-4 py-8">
      <div className="w-full max-w-[400px] bg-white border border-[#ebebeb] rounded-2xl p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-[30px] h-[30px] bg-[#18181b] rounded-lg flex items-center justify-center">
            <MessageCircleMore className="w-4 h-4 text-[#a3e635]" />
          </div>
          <span className="text-[15px] font-semibold text-[#18181b] tracking-tight">
            Feedback
          </span>
        </div>

        {/* Icon */}
        <div className="w-11 h-11 bg-[#f4f4f5] rounded-xl flex items-center justify-center mb-4">
          <MailCheck className="w-5 h-5 text-[#18181b]" />
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-[21px] font-semibold text-[#18181b] tracking-tight mb-1.5">
            Check your email
          </h1>
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
            We sent a 6-digit code to your email. Enter it below to verify{" "}
            <span className="text-[#18181b] font-medium">
              @{params.username}
            </span>
            .
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* OTP Input */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    containerClassName="flex gap-2 w-full"
                  >
                    <InputOTPGroup className="flex gap-2 w-full">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-[52px] h-[52px] flex-1 text-[20px] font-semibold bg-[#fafafa] border border-[#e4e4e7] rounded-[10px] focus-within:border-[#18181b] focus-within:ring-2 focus-within:ring-[#18181b]/10"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage className="text-[11px] font-mono text-red-500" />
                </FormItem>
              )}
            />

            {/* Resend row
            <div className="flex items-center justify-end min-h-[20px]">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[12px] text-[#71717a] hover:text-[#18181b] transition-colors"
                >
                  Resend code
                </button>
              ) : (
                <span className="text-[12px] font-mono text-[#a1a1aa]">
                  Resend in 0:{timer.toString().padStart(2, "0")}
                </span>
              )}
            </div> */}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || verified}
              className={`w-full rounded-lg h-9 text-[13.5px] font-medium tracking-tight transition-colors ${
                verified
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-[#18181b] hover:bg-[#18181b]/85"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Verifying...
                </>
              ) : verified ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Verified!
                </>
              ) : (
                "Verify account"
              )}
            </Button>
          </form>
        </Form>

        {/* Back */}
        <Link
          href="/sign-up"
          className="flex items-center justify-center gap-1.5 mt-5 text-[12px] text-[#a1a1aa] hover:text-[#18181b] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sign up
        </Link>
      </div>
    </div>
  );
}

export default Page;
