import CuteTabs from "@/components/CuteTabs";

import WikiCredit from "@/features/wiki/WikiCredit";
import WikiGallery from "@/features/wiki/WikiGallery";
import WikiInfo from "@/features/wiki/WikiInfo";

import { Sparkles } from "lucide-react";
import Image from "next/image";

import Tos from "@/features/wiki/Tos";
import Voicebank from "@/features/wiki/Voicebank";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoumeisho Miku - Wiki",
  description: "Tìm hiểu về Shoumeisho Miku",
};

export default function WikiPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6 px-4 font-vi">
      <div className="flex justify-center">
        <Image
          src="https://res.cloudinary.com/dr3iqzocx/image/upload/v1781230356/x%C3%B4_icon_wuydnz.png"
          alt="Shoumeisho Miku"
          width={280}
          height={280}
          className="rounded-full object-cover w-[180px] sm:w-[220px] md:w-[260px] border-[4px] border-primary shadow-lg"
        />
      </div>

      <h1 className="text-3xl text-center font-bold text-primary flex items-center justify-center gap-2">
        <Sparkles className="text-pink-400 animate-wiggle" size={24} />
        Shoumeisho Miku
        <Sparkles className="text-pink-400 animate-wiggle" size={24} />
      </h1>

      <p className="text-center text-muted-foreground text-sm max-w-xl mx-auto">
        Shoumeisho Miku (gọi tắt là <strong>ShouMiku</strong>) là một fanloid
        kiêm UTAUloid đại diện cho blog “Chừng nào Vocaloid có CCCD thì xoá
        blog”.
      </p>

      {/* Tabs kawaii */}
      <CuteTabs
        defaultValue="info"
        tabs={[
          {
            label: "Thông tin",
            value: "info",
            content: <WikiInfo />,
          },
          {
            label: "Hình ảnh",
            value: "gallery",
            content: <WikiGallery />,
          },
          {
            label: "Thông tin phiên bản",
            value: "credit",
            content: <WikiCredit />,
          },
          {
            label: "Điều khoản sử dụng",
            value: "tos",
            content: <Tos />,
          },
          {
            label: "Voicebank",
            value: "voicebank",
            content: <Voicebank />,
          },
        ]}
      />
    </div>
  );
}
