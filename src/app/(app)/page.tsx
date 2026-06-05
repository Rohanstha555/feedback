"use client"

import Link from "next/link";
import { MessageCircleMore, Lock, Zap, ArrowRight } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  // If user is not logged in, default to a placeholder
  const username = user?.username || "username";
  
  // Safely check for window to avoid SSR "window is not defined" errors
  const baseUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : "http://localhost:3000";
  const profileUrl = `${baseUrl}/u/${username}`;

  return (
    <div className="min-h-screen bg-[#18181b]">

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-1.5 bg-[#27272a] border border-[#3f3f46] rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
            <span className="text-[11px] text-[#71717a]">Anonymous feedback platform</span>
          </div>
          <h1 className="text-[52px] sm:text-[64px] font-semibold text-white tracking-tight leading-tight mb-6">
            Honest feedback,
            <br />
            <span className="text-[#a3e635]">no strings attached</span>
          </h1>
          <p className="text-[16px] text-[#71717a] max-w-2xl mx-auto mb-8">
            Collect authentic anonymous messages from anyone. No filters, no fear
            of judgment. Get the real insights you need to grow.
          </p>
          <div className="flex items-center gap-3 justify-center">
            <Link
              href="/signup"
              className="h-10 px-6 rounded-lg bg-[#a3e635] text-[#18181b] text-[14px] font-medium hover:bg-[#b4ef47] transition-colors flex items-center gap-2"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signin"
              className="h-10 px-6 rounded-lg border border-[#3f3f46] text-[#d4d4d8] text-[14px] font-medium hover:bg-[#27272a] transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="bg-[#27272a] border border-[#3f3f46] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-[24px] font-semibold text-white mb-4">
                Your shareable feedback link
              </h2>
              <p className="text-[14px] text-[#71717a] mb-6">
                Generate a unique link and share it anywhere. Get honest feedback
                from friends, colleagues, or your community without revealing who
                said what.
              </p>
              <div className="bg-[#18181b] border border-[#3f3f46] rounded-lg px-4 h-10 flex items-center">
                <span className="text-[12px] text-[#52525b]">
                  {profileUrl}
                </span>
              </div>
            </div>
            <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <MessageCircleMore className="w-12 h-12 text-[#3f3f46] mx-auto mb-3" />
                <p className="text-[13px] text-[#52525b]">Share your link</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-white tracking-tight">
            Why choose Feedback?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Lock className="w-5 h-5 text-[#a3e635]" />,
              title: "Truly anonymous",
              desc: "No user accounts required to send feedback. Complete anonymity means genuine, unfiltered responses.",
            },
            {
              icon: <Zap className="w-5 h-5 text-[#a3e635]" />,
              title: "Instant setup",
              desc: "Create your link in seconds. No complex setup, no integrations. Just sign up and start collecting feedback.",
            },
            {
              icon: <MessageCircleMore className="w-5 h-5 text-[#a3e635]" />,
              title: "Manage easily",
              desc: "Review all messages in one place. Toggle whether you want to accept new feedback anytime.",
            },
          ].map((f, i) => (
            <div key={i} className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-6">
              <div className="w-10 h-10 bg-[#18181b] border border-[#3f3f46] rounded-lg flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-[16px] font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-[13px] text-[#71717a]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-white tracking-tight">
            How it works
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { step: "1", title: "Create your profile", desc: "Sign up and set up your feedback profile in less than a minute." },
            { step: "2", title: "Share your link", desc: "Copy your unique link and share it anywhere — social media, email, your bio." },
            { step: "3", title: "Collect feedback", desc: "People send you honest, anonymous messages without needing an account." },
            { step: "4", title: "Review and grow", desc: "See all messages in your dashboard. Use insights to improve and grow." },
          ].map((s, i) => (
            <div key={i} className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-5 flex gap-5 items-start">
              <div className="w-9 h-9 bg-[#a3e635] text-[#18181b] rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-[13px]">
                {s.step}
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white mb-1">{s.title}</h3>
                <p className="text-[13px] text-[#71717a]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-12">
          <h2 className="text-[36px] font-semibold text-white tracking-tight mb-4">
            Ready to get honest feedback?
          </h2>
          <p className="text-[15px] text-[#71717a] mb-8">
            Start collecting anonymous messages today. It only takes 30 seconds.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-[#a3e635] text-[#18181b] text-[14px] font-medium hover:bg-[#b4ef47] transition-colors"
          >
            Get started for free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#3f3f46] py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-[12px] text-[#52525b]">
          <div>© 2024 Feedback. All rights reserved.</div>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-[#71717a] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}