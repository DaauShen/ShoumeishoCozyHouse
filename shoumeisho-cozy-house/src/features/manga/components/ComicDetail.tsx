'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { Comic } from '../config/comicConfig'

type ComicDetailProps = {
  comic: Comic
  className?: string
}

export default function ComicDetail({ comic, className }: ComicDetailProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Function to convert URLs in description to clickable links
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
    <Card className={cn('rounded-3xl border-[3px] border-[#80C6EA] bg-white shadow-lg p-4', className)}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image on the left */}
        <CardHeader className="p-0 w-full md:w-1/3">
          <div className="relative w-full h-64">
            <Image
              src={comic.coverUrl}
              alt={comic.title}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </CardHeader>

        {/* Info on the right */}
        <CardContent className="font-vi text-gray-800 w-full md:w-2/3 space-y-3">
          <h2 className="text-2xl font-semibold text-[#80C6EA]">{comic.title}</h2>
          <p className="text-sm text-gray-500">Tác giả: {comic.author}</p>
          <p className="text-sm text-gray-500">
            Trạng thái: {comic.status === 'completed' ? 'Đã hoàn thành' : 'Đang tiến hành'}
          </p>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {showFullDescription
                ? formatDescription(comic.description)
                : formatDescription(comic.description.slice(0, 200)) +
                    (comic.description.length > 200 ? '...' : '')}
            </p>
            {comic.description.length > 200 && (
              <Button
                variant="link"
                className="px-0 text-sm text-blue-600"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Thu gọn ▲' : 'Xem thêm ▼'}
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}