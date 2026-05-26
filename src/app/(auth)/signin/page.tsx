"use client";
import { signInSchema } from "@/Schemas/signInSchems";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import {  useState } from "react";
import { Loader2, Eye, EyeOff, Check, MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });
      if (res?.error) {
        toast.error("Invalid email or password");
        return;
      }
      setSuccess(true);
      console.log("signed in");

      toast.success("Signed in successfully");

      router.replace("/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
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

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-[21px] font-semibold text-[#18181b] tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-[13px] text-[#a1a1aa]">
            No account?{" "}
            <Link
              href="/signup"
              className="text-[#18181b] font-medium underline underline-offset-2"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Email / Username */}
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <label className="text-xs font-medium text-[#71717a]">
                    Email
                  </label>
                  <Input
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
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#71717a]">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11.5px] text-[#a1a1aa] hover:text-[#18181b] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="bg-[#fafafa] border-[#e4e4e7] focus:bg-white focus:border-[#18181b] focus:ring-[#18181b]/10 text-[13.5px] pr-9 rounded-lg h-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#d4d4d8] hover:text-[#71717a] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-[11px] font-mono" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || success}
              className={`w-full rounded-lg h-9 text-[13.5px] font-medium tracking-tight transition-colors ${
                success
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-[#18181b] hover:bg-[#18181b]/85"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Signing in...
                </>
              ) : success ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Signed in!
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-2.5 my-5">
          <div className="flex-1 h-px bg-[#f4f4f5]" />
          <span className="text-[11px] text-[#d4d4d8]">or</span>
          <div className="flex-1 h-px bg-[#f4f4f5]" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-white border border-[#e4e4e7] hover:bg-[#fafafa] hover:border-[#d4d4d8] rounded-lg h-9 text-[13px] font-medium text-[#18181b] flex items-center justify-center gap-2 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-[11px] text-[#a1a1aa] mt-5">
          By signing in you agree to our{" "}
          <Link
            href="/terms"
            className="text-[#71717a] underline underline-offset-2"
          >
            Terms
          </Link>{" "}
          &{" "}
          <Link
            href="/privacy"
            className="text-[#71717a] underline underline-offset-2"
          >
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
