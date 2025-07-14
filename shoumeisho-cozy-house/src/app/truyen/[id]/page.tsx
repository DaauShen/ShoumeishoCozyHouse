'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import ComicDetail from '@/features/manga/components/ComicDetail'
import { useComicById, useDeleteChapter } from '@/features/manga/query/queries'
import { useAuth } from '@/providers/AuthProvider'
import { Book, BookOpen, Edit, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

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
      <ComicDetail comic={comic} />
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => router.push(`/truyen/${comic.id}/read/0`)}
          className="bg-[#80C6EA] hover:bg-blue-500 font-vi flex items-center gap-2"
        >
          <Book className="w-4 h-4" />
          Đọc từ đầu
        </Button>
        {user && (
          <>
            <Button
              variant="outline"
              onClick={() => router.push(`/truyen/${comic.id}/create-chapter`)}
              className="border-[#80C6EA] text-[#80C6EA] hover:bg-[#80C6EA] hover:text-white font-vi flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Thêm chương
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/truyen/${comic.id}/edit`)}
              className="border-[#80C6EA] text-[#80C6EA] hover:bg-[#80C6EA] hover:text-white font-vi flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa truyện
            </Button>
          </>
        )}
      </div>
      <div>
        <h2 className="text-xl font-vi font-semibold text-[#80C6EA] flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Danh sách chương
        </h2>
        <Separator className="my-2 bg-[#80C6EA]" />
        <ul className="space-y-2">
          {comic.chapters.map((chap, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-[#80C6EA]/10 px-4 py-2 rounded-md"
            >
              <Link
                href={`/truyen/${comic.id}/read/${index}`}
                className="text-[#80C6EA] hover:underline font-vi"
              >
                {chap.name || `Chương ${index + 1}`}
              </Link>
              {user && (
                <Dialog
                  open={chapterToDelete === index}
                  onOpenChange={(open) => {
                    if (open) setChapterToDelete(index)
                    else setChapterToDelete(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-[2px] border-[#80C6EA] font-vi">
                    <DialogHeader>
                      <DialogTitle>Xoá chương?</DialogTitle>
                      <DialogDescription>
                        Bạn có chắc muốn xoá chương{' '}
                        <strong>{chap.name || `#${index + 1}`}</strong>?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="border-[#80C6EA] text-[#80C6EA] font-vi">
                          Huỷ
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        disabled={deleteMutation.isPending}
                        onClick={async () => {
                          try {
                            await deleteMutation.mutateAsync()
                            toast.success(`Đã xoá chương ${index + 1}`)
                            setChapterToDelete(null)
                            await refetch()
                          } catch {
                            toast.error('Lỗi khi xoá chương')
                          }
                        }}
                        className="font-vi"
                      >
                        Xoá
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}