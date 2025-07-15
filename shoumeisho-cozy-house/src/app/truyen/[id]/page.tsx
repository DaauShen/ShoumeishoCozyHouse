'use client'

import ComicDetail from '@/features/manga/components/ComicDetail'
import { useComicById, useDeleteChapter } from '@/features/manga/query/queries'
import { useAuth } from '@/providers/AuthProvider'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MangaDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const { data: comic, isLoading, refetch } = useComicById(id as string)
  const [chapterToDelete, setChapterToDelete] = useState<number | null>(null)
  const deleteMutation = useDeleteChapter(id as string, chapterToDelete ?? -1)

  if (isLoading) {
    return <div className="text-center text-[#80C6EA] font-vi">Đang tải...</div>
  }
  if (!comic) {
    return <div className="text-center text-red-500 font-vi">Không tìm thấy truyện.</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ComicDetail 
        comic={comic}
        isLoggedIn={user? true : false}
      />
    </div>
  )
}