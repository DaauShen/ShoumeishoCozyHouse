'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Book, BookOpen, Info } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Comic } from '../config/comicConfig'

type ComicDetailProps = {
  comic: Comic
  className?: string
}

const CHAPTERS_PER_PAGE = 10 // Số chương mỗi trang

export default function ComicDetail({ comic, className }: ComicDetailProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()

  const latestChapterIndex = comic.chapters.length - 1
  const totalPages = Math.ceil(comic.chapters.length / CHAPTERS_PER_PAGE)

  const startIndex = (currentPage - 1) * CHAPTERS_PER_PAGE
  const currentChapters = comic.chapters.slice(startIndex, startIndex + CHAPTERS_PER_PAGE)

  const formatDescription = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return (
    <Card className={cn('rounded-3xl border-[3px] border-[#80C6EA] bg-white shadow-lg p-4 space-y-4', className)}>
      <div className="flex flex-col md:flex-row gap-4">
        <CardHeader className="p-0 h-full md:w-1/3">
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={comic.coverUrl}
            alt={comic.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        </CardHeader>

        <CardContent className="font-vi text-gray-800 w-full md:w-2/3 space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-[#80C6EA] break-words">{comic.title}</h2>

          <p className="text-sm break-words">
            <span className="font-medium text-[#80C6EA]">Tác giả:</span> {comic.author}
          </p>
          <p className="text-sm">
            <span className="font-medium text-[#80C6EA]">Trạng thái:</span>{' '}
            {comic.status === 'completed' ? 'Đã hoàn thành' : 'Đang tiến hành'}
          </p>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => router.push(`/truyen/${comic.id}/read/0`)}
              className="bg-[#80C6EA] hover:bg-blue-500 font-vi flex items-center gap-2 text-xs md:text-sm"
            >
              <Book className="w-4 h-4" /> Đọc từ đầu
            </Button>

            <Button
              className="bg-[#80C6EA] hover:bg-blue-500 text-white text-xs md:text-sm"
              onClick={() => router.push(`/truyen/${comic.id}/read/${latestChapterIndex}`)}
            >
              Đọc chương mới nhất
            </Button>
          </div>
        </CardContent>
      </div>

      {/* Giới thiệu */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-muted-foreground whitespace-pre-line space-y-2 break-words">
        <div className="flex items-center gap-2">
          <Info className="text-primary w-5 h-5" />
          <h1 className="text-xl font-bold text-[#80C6EA]">Giới thiệu:</h1>
        </div>

        <div>
          {showFullDescription ? (
            formatDescription(comic.description)
          ) : (
            <>
              {formatDescription(comic.description.slice(0, 300))}
              {comic.description.length > 300 && '...'}
            </>
          )}
        </div>

        {comic.description.length > 300 && (
          <Button
            variant="link"
            className="px-0 text-xs md:text-sm text-blue-600"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? 'Thu gọn ▲' : 'Xem thêm ▼'}
          </Button>
        )}
      </div>

      {/* Danh sách chương */}
      <div>
        <h2 className="text-lg md:text-xl font-vi font-semibold text-[#80C6EA] flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Danh sách chương
        </h2>
        <Separator className="my-2 bg-[#80C6EA]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentChapters
            .slice()
            .reverse()
            .map((chap, reversedIndex) => {
              const realIndex = startIndex + (currentChapters.length - 1 - reversedIndex)

              return (
                <div
                  key={realIndex}
                  className="flex items-center justify-between bg-[#80C6EA]/10 px-4 py-2 rounded-md"
                >
                  <Button
                    variant="link"
                    className="px-0 text-left justify-start text-xs md:text-sm text-[#80C6EA] break-words whitespace-normal w-full min-w-0"
                    onClick={() => router.push(`/truyen/${comic.id}/read/${realIndex}`)}
                  >
                    {chap.name || `Chương ${realIndex + 1}`}
                  </Button>
                </div>
              )
            })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 font-vi text-xs md:text-sm">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ◀
          </Button>

          <span className="text-[#80C6EA] font-medium">
            Trang <strong>{currentPage}</strong> / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ▶
          </Button>
        </div>
      </div>
    </Card>
  )
}
