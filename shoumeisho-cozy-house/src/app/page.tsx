"use client";

import {
  Book,
  Cake,
  Calendar,
  Home as HomeIcon,
  Sparkles,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FaBilibili,
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";

import CommunityLinkCard from "@/components/CommunityLinkCard";
import CuteCard from "@/components/CuteCard";
import { Button } from "@/components/ui/button";

import { Birthday, getTodayBirthday } from "@/lib/sanityQueries";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [todayBirthdays, setTodayBirthdays] = useState<Birthday[]>([]);

  useEffect(() => {
    getTodayBirthday().then((data) => setTodayBirthdays(data));
  });

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
          Chào mừng bạn đến với{" "}
          <span className="text-[#80C6EA] font-bold">
            Shoumeisho Cozy House
          </span>
          !
        </p>
        <p className="mt-2">
          Đây là trang web chính thức của trang Facebook{" "}
          <strong>"Chừng nào Vocaloid có CCCD thì xoá blog"</strong>.
        </p>
      </CuteCard>

      {todayBirthdays.length > 0 && (
        <CuteCard
          icon={<Cake className="text-pink-500 animate-bounce" />}
          title="Hôm nay là sinh nhật của:"
          titleLang="vi"
          className="max-w-xl w-full border-pink-300 bg-pink-50 text-pink-700"
        >
          {todayBirthdays.map((bd, idx) => (
            <p className="mt-1" key={idx}>
              <strong>{bd.character}</strong>
            </p>
          ))}
        </CuteCard>
      )}

      {/* Điều hướng / tính năng */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <CuteCard icon={<Book size={28} />} title="Shoumeisho Miku Wiki">
          <p className="mb-2">Tất tần tật về vocal synth của blog.</p>
          <Button
            variant="outline"
            className="rounded-full text-primary border-primary"
            onClick={() => router.push("/wiki")}
          >
            Đi đến Wiki
          </Button>
        </CuteCard>

        {/* <CuteCard icon={<Library size={28} />} title="Đọc manga và light novel">
          <p className="mb-2">Nơi đọc những bộ manga/light novel mà bọn tớ dịch hoặc tự sáng tác.</p>
          <Button
            variant="outline"
            className="rounded-full text-primary border-primary"
            onClick={() => router.push('/truyen')}
          >
            Đọc ngay →
          </Button>
        </CuteCard> */}

        {/* <CuteCard icon={<Puzzle size={28} />} title="Làm quiz về Vocaloid">
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
        </CuteCard> */}

        <CuteCard
          icon={<Calendar size={28} />}
          title="Lịch sinh nhật của vocal synth"
        >
          <p className="mb-2">
            Tổng hợp sinh nhật/ngày kỉ niệm của nhiều vocal synth khác nhau
          </p>
          <Button
            variant="outline"
            className="rounded-full text-primary border-primary"
            onClick={() => router.push("/birthday")}
          >
            Tới lịch
          </Button>
        </CuteCard>
      </div>

      {/* Kết nối cộng đồng */}
      <div className="max-w-xl w-full space-y-4">
        <CuteCard icon={<Users size={32} />} title="Kết nối cộng đồng">
          <p className="mb-4 text-sm text-gray-700 font-vi">
            Cùng nhau chia sẻ niềm vui tại các nền tảng mạng xã hội của chúng
            mình nhé!
          </p>

          <div className="space-y-3">
            <CommunityLinkCard
              icon={<FaDiscord size={20} />}
              name="[CCCD Fancord] Chúng tôi chơi máy hát thay vì chơi đá"
              description="Máy chủ chính thức của blog CCCD"
              href="https://discord.gg/VjchEWEV2R"
              color="#7289da"
            />
            <CommunityLinkCard
              icon={<FaFacebook size={20} />}
              name="Chừng nào Vocaloid có CCCD thì xoá blog"
              description="Trang Facebook chính thức"
              href="https://facebook.com/shoumeisho.wa.itsu.aru.no"
              color="#4267B2"
            />
            <CommunityLinkCard
              icon={<FaYoutube size={20} />}
              name="KyoumeiDOU. -5724-"
              description="Chi nhánh của CCCD, nơi đăng tải các video Vietsub nhạc Vocaloid cùng những video chính thức của Shoumeisho Miku"
              href="https://youtube.com/@kyoumeidou.5724"
              color="#CD201F"
            />
            <CommunityLinkCard
              icon={<FaBilibili size={20} />}
              name="hcrrr_"
              description="Kênh Bilibili chính thức của blog CCCD, nơi đăng tải các video chính thức của Shoumeisho Miku"
              href="https://b23.tv/jJQT7GA"
              color="#23ADE5"
            />
            <CommunityLinkCard
              icon={<FaEnvelope size={20} />}
              name="Email"
              description="cccdvocaloid@gmail.com"
              href="mailto:[cccdvocaloid@gmail.com]"
              color="#c71610"
            />
          </div>
        </CuteCard>
      </div>
    </div>
  );
}
