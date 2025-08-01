'use client'

import ComicDetail from '@/features/manga/components/ComicDetail'
import { useComicById } from '@/features/manga/query/queries'
import { useAuth } from '@/providers/AuthProvider'
import { useParams, useRouter } from 'next/navigation'

export default function MangaDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const { data: comic, isLoading, refetch } = useComicById(id as string)

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