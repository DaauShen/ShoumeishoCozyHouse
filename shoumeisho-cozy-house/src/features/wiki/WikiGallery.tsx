'use client'

import CuteCard from '@/components/CuteCard'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const images = [
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1752679248/full_sbnmlo.png',
    caption: 'Bản thiết kế chính thức – Illust. An Orange',
    width: 1439,
    height: 1198,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1752679345/yix_msmppj.png',
    caption: 'Minh hoạ chibi chính – Illust. yix',
    width: 1000,
    height: 1000,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379329/image08_mz0cwi.jpg',
    caption: 'Minh hoạ phụ – Illust. Ilyshia Qii',
    width: 1080,
    height: 1439,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1752679254/m%C3%A8o_c%C3%B3_n%E1%BB%81n_ijqaj5.png',
    caption: 'Icon/Avatar – Illust. An Orange',
    width: 1000,
    height: 1000,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379328/image10_mpn2ds.jpg',
    caption: 'ShouMiku ngu si #1 – Illust. An Orange',
    width: 1000,
    height: 1000,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379326/image02_kh3mu1.jpg',
    caption: 'ShouMiku ngu si #2 – Illust. jidousha',
    width: 1000,
    height: 1000,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379328/image11_kkqkx8.jpg',
    caption: 'Minh hoạ từ wiki của “Giai điệu chữa lành tôi” – Illust. An Orange',
    width: 694,
    height: 769,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1752679398/%E2%92%B8_HMFCVN_%E2%92%B8_Nh%C3%A0_Tr%E1%BA%BB_Migu_%E2%92%B8_Amelodious_%E2%92%B8%E2%92%B8_20250522_101600_0003_ml7nc9.png',
    caption: '“Ngũ Hành” – Illust. An Orange',
    width: 1440,
    height: 1440,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1751379327/image09_ql1rem.jpg',
    caption: 'Wonder of Wonder art – Illust. alice',
    width: 956,
    height: 1439,
  },
  {
    src: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1752679337/Summeisho_Miku_nthwkb.png',
    caption: 'Summeisho Miku – Illust. Duy Anh',
    width: 1500,
    height: 1700,
  },
]

export default function WikiGalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null)

  return (
        <CuteCard
          icon={<ImageIcon className="text-primary animate-wiggle-slight" />}
          title="Bộ sưu tập minh hoạ"
          titleLang="vi"
          className="mt-6" // ← Cập nhật ở đây
        >
          <p className="text-sm text-gray-600 mb-4 text-justify">
          Đây là những minh hoạ chính thức và fanart cho Shoumeisho Miku. Nhấn vào ảnh để phóng to.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <Dialog key={idx} onOpenChange={(open) => setSelectedImage(open ? img : null)}>
                <DialogTrigger asChild>
                  <div className="flex flex-col cursor-zoom-in group">
                    {/* Ảnh với border riêng */}
                    <div
                      className="relative w-full overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-all"
                      style={{ aspectRatio: `${img.width} / ${img.height}` }}
                    >
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Caption riêng biệt, không có border */}
                    <div className="px-2 py-2 text-center text-sm text-gray-700 font-vi min-h-[48px] flex items-center justify-center">
                      {img.caption}
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none [&>button]:hidden">
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
  )
}
