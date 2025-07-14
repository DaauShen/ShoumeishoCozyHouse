'use client'

import { ComicDTO } from '@/features/manga/config/comicConfig'
import ComicForm from '@/features/manga/forms/ComicForm'
import { useCreateComic } from '@/features/manga/query/queries'
import { useRouter } from 'next/navigation'

export default function CreateMangaPage() {
  const router = useRouter()
  const { mutateAsync, isPending } = useCreateComic()

  const handleSubmit = async (data: ComicDTO) => {
    const { id } = await mutateAsync(data)
    router.push(`/truyen/${id}`)
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-vi font-bold text-[#80C6EA] mb-4">Tạo truyện mới</h1>
      <ComicForm onSubmit={handleSubmit} />
    </div>
  )
}