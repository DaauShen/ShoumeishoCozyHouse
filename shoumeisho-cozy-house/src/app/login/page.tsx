import LoginForm from '@/components/login/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng Nhập',
  description: 'Đăng nhập',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#FFFDF7]">
      <LoginForm />
    </main>
  )
}
