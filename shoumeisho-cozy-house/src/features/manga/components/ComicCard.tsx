'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Comic } from '../config/comicConfig'

type ComicCardProps = {
  comic: Comic
  className?: string
}

export default function ComicCard({ comic, className }: ComicCardProps) {
  const router = useRouter()
  const latestChapterIndex = comic.chapters.length - 1
  const latestChapter = comic.chapters[latestChapterIndex]

  return (
    <Link href={`/truyen/${comic.id}`}>
      <Card
        className={cn(
          'rounded-xl border-[2px] border-[#80C6EA] bg-white shadow-md hover:scale-105 transition-transform overflow-hidden',
          className
        )}
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={comic.coverUrl}
            alt={comic.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
        </div>
        <CardContent className="p-3 space-y-1 font-vi text-gray-800">
          <h3 className="font-semibold text-sm text-[#80C6EA] line-clamp-2">{comic.title}</h3>
          <p className="text-xs text-gray-500 line-clamp-1">Tác giả: {comic.author}</p>
          <Badge variant={comic.status === 'completed' ? 'secondary' : 'default'} className="text-xs">
            {comic.status === 'completed' ? 'Đã hoàn thành' : 'Đang tiến hành'}
          </Badge>
          <div>
            <Button
              size="sm"
              className="mt-1 w-full bg-[#80C6EA] hover:bg-blue-500 text-xs py-1"
              onClick={(e) => {
                e.preventDefault()
                router.push(`/truyen/${comic.id}/read/0`)
              }}
            >
              Đọc ngay
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}