import Navbar from '@/components/Navbar'

import QueryProvider from '@/components/QueryProvider'
import { Toaster } from 'sonner'
import '../styles/fonts.css'
import './globals.css'

export const metadata = {
  title: 'Shoumeisho Cozy House',
  description: 'Căn nhà ấm cúng của Shoumeisho Miku',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <html lang="ja">
      <body className="font-default bg-[#FFFDF7] text-gray-800 min-h-screen flex flex-col">
        <QueryProvider>
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              classNames: {
                title: 'font-bold font-vi',
                description: 'font-vi text-sm',
              },
            }}
          />
          <Navbar />
          <main className="flex-1 p-4 pb-24">{children}</main>
        </QueryProvider>
      </body>
    </html>
  )
}

