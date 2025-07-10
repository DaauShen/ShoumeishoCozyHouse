'use client'

import CuteCard from '@/components/CuteCard'
import NoCopyWrapper from '@/components/NoCopyWrapper'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const images = [
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379327/image04_gfuw32.jpg',
    caption: 'Official Design Sheet – Art by An Orange',
    width: 1439,
    height: 1198,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379328/image07_mqwdwu.jpg',
    caption: 'Main Chibi Visual – Art by yix',
    width: 1000,
    height: 1000,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379329/image08_mz0cwi.jpg',
    caption: 'Sub Visual – Art by Ilyshia Qii',
    width: 1080,
    height: 1439,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379327/image05_homiv0.jpg',
    caption: 'Icon/Avatar Illustration – Art by An Orange',
    width: 900,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379328/image10_mpn2ds.jpg',
    caption: 'Stupid ShouMiku #1 – Art by An Orange',
    width: 1000,
    height: 1000,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379326/image02_kh3mu1.jpg',
    caption: 'Stupid ShouMiku #2 – Art by jidousha',
    width: 1000,
    height: 1000,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379328/image11_kkqkx8.jpg',
    caption: 'Illust. from “Giai điệu chữa lành tôi” – Art by An Orange',
    width: 694,
    height: 769,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379328/image12_ffa9ux.jpg',
    caption: '“Ngũ Hành” – Art by An Orange',
    width: 1440,
    height: 1140,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379327/image09_ql1rem.jpg',
    caption: 'Wonder of Wonder – Art by alice',
    width: 956,
    height: 1439,
  },
]

export default function WikiGalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null)

  return (
    <NoCopyWrapper>
      <div className="max-w-6xl w-full mx-auto px-4 py-6">
        <CuteCard
          icon={<ImageIcon className="text-primary animate-wiggle-slight" />}
          title="Bộ sưu tập minh hoạ"
          titleLang="vi"
        >
          <p className="text-sm text-gray-600 mb-4 text-justify">
            Đây là các minh hoạ chính thức và fan art cho Shoumeisho Miku. Click vào để phóng to~
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <Dialog key={idx} onOpenChange={(open) => setSelectedImage(open ? img : null)}>
                <DialogTrigger asChild>
                  <div className="cursor-zoom-in rounded-xl overflow-hidden bg-white border-[3px] border-primary shadow-md hover:shadow-lg transition-all">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                      className="object-cover w-full h-[180px] sm:h-[220px] md:h-[240px] lg:h-[260px] transition-transform hover:scale-[1.02]"
                    />
                    <p className="text-sm text-center text-gray-700 px-2 py-2 font-vi">
                      {img.caption}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="max-w-4xl p-0 bg-transparent border-none shadow-none [&>button]:hidden"
                >
                  <DialogTitle />
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                      className="rounded-xl object-contain max-h-[90vh] w-auto"
                      unoptimized
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CuteCard>
      </div>
    </NoCopyWrapper>
  )
}
