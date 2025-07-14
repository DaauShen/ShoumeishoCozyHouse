'use client'

import ChapterForm from '@/features/manga/forms/ChapterForm'
import { useParams } from 'next/navigation'

export default function CreateChapterPage() {
  const { id } = useParams()

  if (!id || typeof id !== 'string') {
    return <div className="text-center text-red-500 font-vi">Truyện không hợp lệ</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-vi font-bold text-[#80C6EA]">Thêm chương mới</h1>
      <ChapterForm comicId={id} />
    </div>
  )
}