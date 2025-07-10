'use client'

import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import CuteCard from '@/components/CuteCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Sparkles, XCircle } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Đăng nhập thành công!', {
        description: 'Chào mừng bạn quay lại!',
        icon: <Sparkles className="text-green-500 animate-pulse" />,
        duration: 3000,
      })
      router.push('/')
    } catch (err) {
      toast.error('Đăng nhập thất bại!', {
        description: 'Vui lòng kiểm tra lại email hoặc mật khẩu.',
        icon: <XCircle className="text-red-500 animate-shake" />,
        duration: 4000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <CuteCard
        icon={<Lock size={36} className="animate-pulse" />}
        title="Đăng nhập"
        titleLang="vi"
        className="w-[340px]"
      >
        <p className="text-sm text-red-500 font-semibold font-vi -mt-2 mb-4">
          ⚠️ Chỉ có admin mới được đăng nhập
        </p>

        <div className="space-y-4 font-vi">
          <Input
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border-[2px] border-primary pl-4"
          />
          <Input
            placeholder="Mật khẩu"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border-[2px] border-primary pl-4"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-full hover:bg-[#68B0D8] transition-all"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </div>
      </CuteCard>
    </form>
  )
}
