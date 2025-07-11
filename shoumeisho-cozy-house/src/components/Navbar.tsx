'use client'

import LogoutDialog from '@/components/login/LogOutDialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/providers/AuthProvider'
import clsx from 'clsx'
import { signOut } from 'firebase/auth'
import { Book, Calendar, Home, Library, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    toast.success('👋 Bạn đã đăng xuất!')
    setDialogOpen(false)
    router.push('/')
  }

  const navItems = [
    { href: '/', icon: <Home size={24} />, label: 'Trang chủ' },
    { href: '/wiki', icon: <Book size={24} />, label: 'Wiki' },
    { href: '/birthday', icon: <Calendar size={24} />, label: 'Sinh nhật' },
    { href: '/truyen', icon: <Library size={24} />, label: 'Truyện' },
  ]

  return (
    <>
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-md bg-white border-[3px] border-[#80C6EA] shadow-lg px-4 py-2 rounded-3xl backdrop-blur-md">
        <div className="flex justify-between w-full">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <div
                className={clsx(
                  'flex flex-col items-center text-xs font-vi transition-all',
                  pathname === item.href
                    ? 'text-[#80C6EA] font-bold scale-105'
                    : 'text-gray-500 hover:text-[#80C6EA]'
                )}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </div>
            </Link>
          ))}

          {/* Popover Account */}
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={clsx(
                    'flex flex-col items-center text-xs font-vi transition-all',
                    'text-gray-500 hover:text-[#80C6EA]'
                  )}
                >
                  <User size={24} />
                  <span className="text-[10px] mt-0.5">Tài khoản</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 rounded-xl border-[2px] border-primary font-vi">
                <p className="text-sm mb-2 font-semibold text-primary">👤 {user.email}</p>
                <button
                  onClick={() => setDialogOpen(true)}
                  className="w-full px-3 py-1 mt-2 text-sm text-white bg-[#F87171] rounded-full hover:bg-red-500 transition"
                >
                  Đăng xuất
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login">
              <div
                className={clsx(
                  'flex flex-col items-center text-xs font-vi transition-all',
                  pathname === '/login'
                    ? 'text-[#80C6EA] font-bold scale-105'
                    : 'text-gray-500 hover:text-[#80C6EA]'
                )}
              >
                <User size={24} />
                <span className="text-[10px] mt-0.5">Đăng nhập</span>
              </div>
            </Link>
          )}
        </div>
      </nav>

      <LogoutDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}
