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

  const redirectDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <nav className="flex items-center justify-between px-6 h-14 border-b bg-white">
      
       <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#18181b] rounded-lg flex items-center justify-center cursor-pointer">
            <MessageCircleMore className="w-3.5 h-3.5 text-[#a3e635]" />
          </div>
          <span className="text-[14px] font-semibold text-[#18181b] tracking-tight cursor-pointer">
            Feedback
          </span>
        </Link>

      <div className="flex items-center gap-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Explore</Link>
        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
      </div>

      <div className="flex items-center gap-3">
        {session ? (
          <>
            <div onClick={redirectDashboard} className="flex items-center cursor-pointer gap-2 px-3 py-1 rounded-full border bg-muted text-sm">
              <div  className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-medium">
                {user?.username?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?'}
              </div>
              <span className="font-medium">{user?.username || user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/signin">
            <Button size="sm">Login</Button>
          </Link>
        )}
      </div>

    </nav>
  )
}

export default Navbar