import Link from "next/link";
import { MessageCircleMore, Lock, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f9f8]">

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-32">
        <div className="text-center mb-20">
          <h1 className="text-[52px] sm:text-[64px] font-semibold text-[#18181b] tracking-tight leading-tight mb-6">
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
              className="h-10 px-6 rounded-lg bg-[#18181b] text-white text-[14px] font-medium hover:bg-[#18181b]/85 transition-colors flex items-center gap-2"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signin"
              className="h-10 px-6 rounded-lg border border-[#ebebeb] text-[#18181b] text-[14px] font-medium hover:bg-[#fafafa] transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-[24px] font-semibold text-[#18181b] mb-4">
                Your shareable feedback link
              </h2>
              <p className="text-[14px] text-[#71717a] mb-6">
                Generate a unique link and share it anywhere. Get honest feedback
                from friends, colleagues, or your community without revealing who
                said what.
              </p>
              <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-lg px-4 h-10 flex items-center">
                <span className="text-[12px] text-[#a1a1aa]">
                  http://localhost:3000/u/puntu
                </span>
              </div>
            </div>
            <div className="bg-[#fafafa] rounded-lg p-6 flex items-center justify-center">
              <div className="text-center">
                <MessageCircleMore className="w-12 h-12 text-[#e4e4e7] mx-auto mb-3" />
                <p className="text-[13px] text-[#a1a1aa]">Share your link</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-[#18181b] tracking-tight">
            Why choose Feedback?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#f4f4f5] rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-[#18181b]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#18181b] mb-2">
              Truly anonymous
            </h3>
            <p className="text-[13px] text-[#71717a]">
              No user accounts required to send feedback. Complete anonymity means
              genuine, unfiltered responses.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#f4f4f5] rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-[#18181b]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#18181b] mb-2">
              Instant setup
            </h3>
            <p className="text-[13px] text-[#71717a]">
              Create your link in seconds. No complex setup, no integrations. Just
              sign up and start collecting feedback.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#f4f4f5] rounded-lg flex items-center justify-center mb-4">
              <MessageCircleMore className="w-5 h-5 text-[#18181b]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#18181b] mb-2">
              Manage easily
            </h3>
            <p className="text-[13px] text-[#71717a]">
              Review all messages in one place. Toggle whether you want to accept
              new feedback anytime.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-[#18181b] tracking-tight">
            How it works
          </h2>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 bg-[#18181b] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-[13px]">
              1
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#18181b] mb-1">
                Create your profile
              </h3>
              <p className="text-[13px] text-[#71717a]">
                Sign up and set up your feedback profile in less than a minute.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 bg-[#18181b] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-[13px]">
              2
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#18181b] mb-1">
                Share your link
              </h3>
              <p className="text-[13px] text-[#71717a]">
                Copy your unique link and share it anywhere — social media, email,
                your bio.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 bg-[#18181b] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-[13px]">
              3
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#18181b] mb-1">
                Collect feedback
              </h3>
              <p className="text-[13px] text-[#71717a]">
                People send you honest, anonymous messages without needing an
                account.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 bg-[#18181b] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-[13px]">
              4
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#18181b] mb-1">
                Review and grow
              </h3>
              <p className="text-[13px] text-[#71717a]">
                See all messages in your dashboard. Use insights to improve and
                grow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-[40px] font-semibold text-[#18181b] tracking-tight mb-4">
          Ready to get honest feedback?
        </h2>
        <p className="text-[16px] text-[#71717a] mb-8">
          Start collecting anonymous messages today. It only takes 30 seconds.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-[#18181b] text-white text-[14px] font-medium hover:bg-[#18181b]/85 transition-colors"
        >
          Get started for free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#ebebeb] bg-white py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-[12px] text-[#a1a1aa]">
          <div>© 2024 Feedback. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#71717a] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#71717a] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#71717a] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}