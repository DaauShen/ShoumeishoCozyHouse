'use client'

import {
  Book,
  Cake,
  Calendar,
  Facebook,
  Home as HomeIcon,
  Library,
  MessageCircle,
  Puzzle,
  Sparkles,
  Users,
  Youtube
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import CommunityLinkCard from '@/components/CommunityLinkCard'
import CuteCard from '@/components/CuteCard'
import { Button } from '@/components/ui/button'

import { getTodayBirthdays } from '@/features/birthdays/getTodayBirthdays'

export default function HomePage() {
  const router = useRouter()
  const todayBirthdays = getTodayBirthdays()

  return (
    <div className="flex flex-col items-center space-y-16 mt-10 px-4 pb-[120px]">
      {/* Hero Section */}
      <section className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <HomeIcon size={32} className="animate-wiggle-slight" />
          <h1 className="text-4xl md:text-5xl font-bold font-vi">
            Shoumeisho Cozy House
          </h1>
        </div>
      </section>

      {/* Giới thiệu CCCD */}
      <CuteCard
        icon={<Sparkles className="animate-pulse" size={40} />}
        title="ようこそ！"
        titleLang="jp"
        className="max-w-xl w-full"
      >
        <p>
          Chào mừng bạn đến với{' '}
          <span className="text-[#80C6EA] font-bold">Shoumeisho Cozy House</span>!
        </p>
        <p className="mt-2">
          Đây là căn nhà ấm cúng của page
          <strong> "Chừng nào Vocaloid có CCCD thì xóa blog"</strong>. Tại đây bạn có thể
          tìm hiểu về <strong>Shoumeisho Miku - fanloid đại diện cho blog -</strong> và những câu chuyện thú vị xoay quanh các Vocaloid khác. Hãy kéo xuống dưới để cùng khám phá nhé :3
        </p>
      </CuteCard>

      {todayBirthdays.names.length > 0 && (
      <CuteCard
        icon={<Cake className="text-pink-500 animate-bounce" />}
        title="Hôm nay là sinh nhật của:"
        titleLang="vi"
        className="max-w-xl w-full border-pink-300 bg-pink-50 text-pink-700"
      >
          {todayBirthdays.names.map((name, idx) => (
            <p className="mt-1" key={idx}><strong>{name}</strong></p>
          ))}
      </CuteCard>
    )}

      {/* Điều hướng / tính năng */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <CuteCard icon={<Book size={28} />} title="Shoumeisho Miku Wiki">
          <p className="mb-2">Tìm hiểu về Shoumeisho Miku thông qua wiki của bọn tớ.</p>
          <Button
            variant="outline"
            className="rounded-full text-primary border-primary"
            onClick={() => router.push('/wiki')}
          >
            Đi đến Wiki →
          </Button>
        </CuteCard>

        <CuteCard icon={<Library size={28} />} title="Đọc truyện dễ thương">
          <p className="mb-2">Nơi đọc những bộ manga mà bọn tớ dịch và novel tự sáng tác.</p>
          <Button
            variant="outline"
            className="rounded-full text-primary border-primary"
            onClick={() => router.push('/truyen')}
          >
            Đọc ngay →
          </Button>
        </CuteCard>

        <CuteCard icon={<Puzzle size={28} />} title="Làm quiz về Vocaloid">
          <p className="mb-2">Bạn thuộc dạng fan Vocaloid nào? Khám phá ngay!</p>
          <Button
            variant="outline"
            className="rounded-full text-primary border-primary"
            onClick={() =>
              window.open(
                'https://uquiz.com/quiz/Jh3lrL/vocaloid-quiz-ch%C3%BAng-t%C3%B4i-%C4%91%C3%A1nh-gi%C3%A1-b%E1%BA%A1n-d%E1%BB%B1a-tr%C3%AAn-k%E1%BA%BFt-qu%E1%BA%A3-c%E1%BB%A7a-c%C3%A1i-quiz-n%C3%A0y',
                '_blank'
              )
            }
          >
            Làm Quiz →
          </Button>
        </CuteCard>

        <CuteCard icon={<Calendar size={28} />} title="Lịch sinh nhật của Vocaloid">
          <p className="mb-2">Ăn mừng sinh nhật của Vocaloid mà bạn yêu thích ngay thôi nào!</p>
          <Button
            variant="outline"
            className="rounded-full text-primary border-primary"
            onClick={() => router.push('/birthday') }
          >
            Xem lịch nào →
          </Button>
        </CuteCard>
      </div>

      {/* Kết nối cộng đồng */}
      <div className="max-w-xl w-full space-y-4">
        <CuteCard icon={<Users size={32} />} title="Kết nối cộng đồng">
          <p className="mb-4 text-sm text-gray-700 font-vi">
            Cùng nhau chia sẻ niềm vui tại các nền tảng mạng xã hội của chúng mình nhé!
          </p>

          <div className="space-y-3">
            <CommunityLinkCard
              icon={<MessageCircle size={20} />}
              name="CCCD Fancord"
              description="Discord trò chuyện chính thức của CCCD!"
              href="https://discord.gg/UHavNWc8g3"
              color="#7289da"
            />
            <CommunityLinkCard
              icon={<Facebook size={20} />}
              name="CCCD Blog"
              description="Nơi đăng tải những thông tin hữu ích (hoặc không) về máy hát."
              href="https://facebook.com/shoumeisho.wa.itsu.aru.no"
              color="#4267B2"
            />
            <CommunityLinkCard
              icon={<Youtube size={20} />}
              name="KyoumeiDOU. -5724-"
              description="Xem vietsub bài hát Vocaloid yêu thích của bạn ngay thôi!"
              href="https://youtube.com/@kyoumeidou.5724"
              color="#CD201F"
            />
          </div>
        </CuteCard>
      </div>
    </div>
  )
}
