'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import ComicCard from '@/features/manga/components/ComicCard'
import { useComics } from '@/features/manga/query/queries'
import { useAuth } from '@/providers/AuthProvider'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const ITEMS_PER_PAGE = 8

export default function MangaListPage() {
  const { user } = useAuth()
  const { data: comics = [], isLoading } = useComics()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filteredComics = useMemo(() => {
    return comics.filter((comic) =>
      comic.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, comics])

  const totalPages = Math.ceil(filteredComics.length / ITEMS_PER_PAGE)

  const paginatedComics = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filteredComics.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredComics, page])

  useEffect(() => setPage(1), [search])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Tìm truyện..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs border-[#80C6EA] font-vi"
        />
        {user && (
          <Button asChild className="bg-[#80C6EA] hover:bg-blue-500 font-vi">
            <Link href="/truyen/create">Tạo truyện mới</Link>
          </Button>
        )}
      </div>

      <Separator className="bg-[#80C6EA]" />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[#80C6EA]" />
        </div>
      ) : filteredComics.length === 0 ? (
        <div className="text-center text-gray-500 font-vi">Không tìm thấy truyện nào.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedComics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="border-[#80C6EA] text-[#80C6EA] hover:bg-[#80C6EA] hover:text-white font-vi"
              >
                ← Trước
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={`page-${i + 1}`}
                  variant={page === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                  className={
                    page === i + 1
                      ? 'bg-[#80C6EA] hover:bg-blue-500 font-vi'
                      : 'border-[#80C6EA] text-[#80C6EA] hover:bg-[#80C6EA] hover:text-white font-vi'
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="border-[#80C6EA] text-[#80C6EA] hover:bg-[#80C6EA] hover:text-white font-vi"
              >
                Sau →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}