"use client"

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { MessageCircleMore } from 'lucide-react'

function Navbar() {
  const { data: session } = useSession()
  const user = session?.user as User
  const router = useRouter()

  return (
    <nav className="flex items-center justify-between px-6 h-14 border-b border-[#3f3f46] bg-[#18181b]">

      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[#27272a] border border-[#3f3f46] rounded-lg flex items-center justify-center">
          <MessageCircleMore className="w-3.5 h-3.5 text-[#a3e635]" />
        </div>
        <span className="text-[14px] font-semibold text-white tracking-tight">
          Feedback
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-[13px] text-[#71717a] hover:text-[#d4d4d8] transition-colors">Home</Link>
        <Link href="#" className="text-[13px] text-[#71717a] hover:text-[#d4d4d8] transition-colors">Explore</Link>
        <Link href="#" className="text-[13px] text-[#71717a] hover:text-[#d4d4d8] transition-colors">About</Link>
      </div>

      <div className="flex items-center gap-3">
        {session ? (
          <>
            <div
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3f3f46] bg-[#27272a] hover:bg-[#3f3f46] transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#18181b] border border-[#3f3f46] text-[#a3e635] flex items-center justify-center text-[11px] font-medium">
                {user?.username?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?'}
              </div>
              <span className="text-[13px] font-medium text-[#d4d4d8]">
                {user?.username || user?.email}
              </span>
            </div>
            <button
              onClick={() => signOut()}
              className="h-8 px-3 rounded-lg border border-[#3f3f46] bg-transparent text-[13px] text-[#71717a] hover:bg-[#27272a] hover:text-[#d4d4d8] transition-colors cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/signin"
            className="h-8 px-4 rounded-lg bg-[#a3e635] hover:bg-[#b4ef47] text-[#18181b] text-[13px] font-medium transition-colors flex items-center"
          >
            Login
          </Link>
        )}
      </div>

    </nav>
  )
}

export default Navbar