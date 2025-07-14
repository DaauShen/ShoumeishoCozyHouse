'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import ComicReader from '@/features/manga/components/ComicReader'
import { useComicById } from '@/features/manga/query/queries'
import { Ban } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function MangaReaderPage() {
  const { id, chapter } = useParams()
  const comicId = id as string
  const chapterIndex = parseInt(chapter as string) || 0
  const { data: comic, isLoading, isError } = useComicById(comicId)

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (isError || !comic || chapterIndex >= comic.chapters.length) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <Ban className="h-5 w-5" />
          <AlertTitle>Lỗi khi tải truyện</AlertTitle>
          <AlertDescription className="font-vi">
            Không thể tải thông tin truyện tranh hoặc chương không tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc thử lại sau.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <ComicReader comic={comic} chapterIndex={chapterIndex} />
    </div>
  )
}