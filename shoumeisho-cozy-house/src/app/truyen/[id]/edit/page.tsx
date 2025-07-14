'use client'

import { ComicDTO } from '@/features/manga/config/comicConfig'
import ComicForm from '@/features/manga/forms/ComicForm'
import { useComicById, useUpdateComic } from '@/features/manga/query/queries'
import { useParams, useRouter } from 'next/navigation'

export default function EditMangaPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: comic, isLoading } = useComicById(id as string)
  const { mutateAsync, isPending } = useUpdateComic()

  if (isLoading || !comic) {
    return <div className="text-center text-[#80C6EA] font-vi">Đang tải truyện...</div>
  }

  const handleSubmit = async (updatedComic: ComicDTO) => {
    await mutateAsync({ id: id as string, data: updatedComic })
    router.push(`/truyen/${id}`)
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-vi font-bold text-[#80C6EA] mb-4">Chỉnh sửa truyện</h1>
      <ComicForm defaultValues={comic} onSubmit={handleSubmit} />
    </div>
  )
}