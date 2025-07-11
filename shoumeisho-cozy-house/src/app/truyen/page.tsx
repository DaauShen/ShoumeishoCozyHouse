import CuteCard from '@/components/CuteCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Cat } from 'lucide-react'
import Link from 'next/link'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đọc truyện',
  description: 'Đọc truyện',
}


export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      <CuteCard
        icon={<Cat className="animate-bounce" size={40} />}
        title="Trang đang được xây dựng!"
        titleLang="vi"
        className="max-w-md w-full"
      >
        <p className="text-gray-700 font-vi text-base">
          Trang này vẫn chưa được xây xong... nhưng đừng buồn nhé~ 💔
        </p>

        <div className="relative group inline-block mt-4">
          <Link href="/" passHref>
            <Button
              className="rounded-full bg-[#80C6EA] text-white px-6 py-2 hover:bg-[#68B0D8] transition-all duration-300"
            >
              Quay về trang chủ
            </Button>
          </Link>
          <span
            className={cn(
              'absolute -top-6 left-1/2 -translate-x-1/2 scale-0 opacity-0',
              'group-hover:scale-100 group-hover:opacity-100 transition-all text-[#FFB6C1] text-sm font-bold font-jp'
            )}
          >
            にゃーん 🐾
          </span>
        </div>
      </CuteCard>
    </main>
  )
}