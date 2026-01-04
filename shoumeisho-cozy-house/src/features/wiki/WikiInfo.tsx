'use client'

import CuteCard from '@/components/CuteCard'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function WikiInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const images = [
    // {
    //   url: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1758031932/image01_uwwbei.png',
    //   caption: 'Thiết kế thường',
    // },
    // {
    //   url: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1758031935/summer_nnzmzn.png',
    //   caption: 'Thiết kế hè',
    // },
    {
      url: 'https://res.cloudinary.com/dr3iqzocx/image/upload/v1767524638/KoBG_ypctjo.png',
      caption: 'Thiết kế thường',
    },
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = images[currentIndex]

  return (
    <CuteCard
      icon={<Info className="text-primary animate-pulse" />}
      title="Thông tin"
      titleLang="vi"
      className="mt-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-vi text-base leading-relaxed">
        {/* Cột trái */}
        <ul className="space-y-3 text-left">
          <li><strong>• Tên:</strong> Shoumeisho Miku</li>
          <li>
            <strong>• Hán Tự:</strong>{' '}
            <span className="font-jp">証明書美玖</span>
          </li>
          <li>
            <strong>• Hiragana:</strong>{' '}
            <span className="font-jp">しょうめいしょみく</span>
          </li>
          <li>
            <strong>• Hán-Việt:</strong> Chứng Minh Thư Mĩ Cửu
          </li>
          <li>
            <strong>• Tên ngắn gọn:</strong> ShouMiku (<span className="font-jp">しょうみく</span>)
          </li>
          <li><strong>• Loại:</strong> Fanloid, UTAU</li>
          <li><strong>• Người cung cấp giọng:</strong> chest</li>
          <li>
            <strong>• Tuổi:</strong>
            <ul className="pl-6 mt-1 space-y-1 text-sm">
              <li className="flex items-start"><span className="mr-2 text-primary">+</span>5 tuổi VocaHuman</li>
              <li className="flex items-start"><span className="mr-2 text-primary">+</span>25 tuổi con người</li>
            </ul>
          </li>
          <li><strong>• Chiều cao:</strong> 174cm</li>
          <li>
            <strong>• Cân nặng:</strong>
            <ul className="pl-6 mt-1 space-y-1 text-sm">
              <li className="flex items-start"><span className="mr-2 text-primary">+</span>42kg (chưa tính tóc)</li>
              <li className="flex items-start"><span className="mr-2 text-primary">+</span>45kg (tính cả tóc)</li>
            </ul>
          </li>
          <li><strong>• Kích cỡ vòng 1:</strong> 86</li>
          <li><strong>• Sinh nhật:</strong> 08.12.2024</li>
          <li>
            <strong>• Giới tính:</strong> VocaHuman
            <Popover>
              <PopoverTrigger asChild>
                <sup className="ml-1 cursor-pointer text-xs text-muted-foreground">[1]</sup>
              </PopoverTrigger>
              <PopoverContent className="text-sm text-center max-w-xs rounded-xl border-primary">
                Giới tính riêng biệt, không liên quan đến chỉ định giới tính.
              </PopoverContent>
            </Popover>
          </li>
          <li><strong>• Đại từ:</strong> She/Her</li>
          <li>
            <strong>• Vật phẩm đại diện:</strong> Chuối Blue Java
            <Popover>
              <PopoverTrigger asChild>
                <sup className="ml-1 cursor-pointer text-xs text-muted-foreground">[2]</sup>
              </PopoverTrigger>
              <PopoverContent className="text-sm text-center max-w-xs rounded-xl border-primary">
                Chuối khi chưa chín có màu xanh lam, vị như kem vani. Xuất xứ Đông Nam Á đến Bắc Úc. (Wikipedia)
              </PopoverContent>
            </Popover>
          </li>
          <li>
            <strong>• Động vật đại diện:</strong> Mèo
          </li>
          <li>
            <strong>• Bạn đồng hành:</strong> Shokogani
            <Popover>
              <PopoverTrigger asChild>
                <sup className="ml-1 cursor-pointer text-xs text-muted-foreground">[3]</sup>
              </PopoverTrigger>
              <PopoverContent className="text-sm text-center max-w-xs rounded-xl border-primary">
              Một sinh vật có hình dạng chú cua, úp lên trên người mình chiếc xô đầy những sợi mì nhiều màu. Có mùi cacao.
              </PopoverContent>
            </Popover>
          </li>
          <li><strong>• Màu sắc biểu tượng:</strong> <span className="text-[#80C6EA]">#80C6EA (xanh trời)</span></li>
          <li><strong>• Nơi sinh sống:</strong> Một nơi nằm giữa không gian mạng và thế giới thực</li>
          <li className="flex items-center gap-2">
            <strong>• Chữ ký:</strong>
            <Image
              src="https://res.cloudinary.com/dr3iqzocx/image/upload/v1758031926/black_sign_y35mor.png"
              alt="Chữ ký"
              width={120}
              height={30}
              className="rounded-lg p-1 object-contain"
            />
          </li>


        </ul>

        {/* Cột phải */}
        <div className="space-y-4 text-sm text-muted-foreground text-justify">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <div className="w-full max-w-xs mx-auto overflow-hidden cursor-zoom-in">
                  <div className="flex justify-center gap-4 text-sm font-semibold mt-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx) }}
                        className={cn(
                          'pb-1',
                          currentIndex === idx
                            ? 'border-b-2 border-[#80C6EA] text-[#80C6EA]'
                            : 'text-gray-500'
                        )}
                      >
                        {img.caption}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full aspect-[3/4] bg-white mt-2">
                    <Image
                      src={currentImage.url}
                      alt={currentImage.caption}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none [&>button]:hidden">
                <DialogTitle />
                <div className="flex justify-center items-center w-full">
                  <Image
                    src={currentImage.url}
                    alt={currentImage.caption}
                    width={1080}
                    height={1080}
                    className="object-contain max-h-[90vh]"
                    unoptimized
                  />
                </div>
              </DialogContent>
            </Dialog>

          <p className="font-medium">
          ShouMiku là biểu tượng được hình thành nên từ vô vàn cảm xúc, là sự kết hợp hài hoà giữa những mảnh ghép trong cộng đồng VocalSynth. Nhiệm vụ của ShouMiku là lan toả âm nhạc của cốt lõi, của tâm hồn đến với thế giới và bảo vệ cộng đồng VocalSynth khỏi những kẻ xấu với ý định cung cấp CCCD cho từng VocalSynth.
          </p>

          <p className="font-medium">
          ShouMiku không phải Hatsune Miku, và sẽ chẳng bao giờ là Hatsune Miku, hay bất cứ biến thể nào của Hatsune Miku
              <Popover>
                <PopoverTrigger asChild>
                  <sup className="ml-1 cursor-pointer text-xs text-muted-foreground">[4]</sup>
                </PopoverTrigger>
                <PopoverContent className="max-w-xs text-sm text-center">
                  Các biến thể của Hatsune Miku có thể kể đến như: Snow Miku, Sakura Miku, Hachune Miku, Mikudayo,…
                </PopoverContent>
              </Popover>
              . ShouMiku chỉ là ShouMiku, một nhân vật fanmade của blog, được xây dựng và thiết kế dựa trên Miku và nhiều VocalSynth, VocaloP khác nhau. Mong mọi người sẽ không hiểu sai điều này.
          </p>

          <h2 className="text-xl font-bold text-center mt-6">– Trivia –</h2>
          <ul className="list-disc pl-4 text-justify">
            <li>Đôi khi, chiếc kính sẽ hiện chữ thể hiện tâm trạng ẻm, điều ẻm muốn nói hoặc điều người khác yêu cầu hiện lên.</li>
            <li>Shoumeisho là tên đệm, không phải họ. ShouMiku không có họ.</li>
          </ul>
        </div>
      </div>
    </CuteCard>
  )
}
