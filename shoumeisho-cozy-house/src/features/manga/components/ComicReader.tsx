'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Comic } from '../config/comicConfig'

type ComicReaderProps = {
  comic: Comic
  chapterIndex: number
  className?: string
}

export default function ComicReader({ comic, chapterIndex, className }: ComicReaderProps) {
  const router = useRouter()
  const [showOverlay, setShowOverlay] = useState(true)
  const [forceShow, setForceShow] = useState(false)
  const currentChapter = comic.chapters[chapterIndex]

  const goToChapter = (index: number) => {
    router.push(`/truyen/${comic.id}/read/${index}`)
  }

  const goToPrev = () => {
    if (chapterIndex > 0) goToChapter(chapterIndex - 1)
  }

  const goToNext = () => {
    if (chapterIndex < comic.chapters.length - 1) goToChapter(chapterIndex + 1)
  }

  const goToHome = () => {
    router.push(`/truyen/${comic.id}`)
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [chapterIndex])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight
      const fullHeight = document.body.scrollHeight
      setForceShow(scrollY >= fullHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={cn('px-2 sm:px-4 max-w-[1600px] mx-auto space-y-6', className)}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/truyen">Truyện</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/truyen/${comic.id}`}>{comic.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Separator />

      <h1 className="text-lg sm:text-xl font-vi font-semibold text-[#80C6EA]">
        {currentChapter.name}
      </h1>

        <div
          className="space-y-6 pb-28 cursor-pointer"
          onClick={() => setShowOverlay((prev) => !prev)}
        >
          {currentChapter.images.map((url, i) => (
            <div key={i} className="w-full max-w-7xl mx-auto">
              <Image
                src={url}
                alt={`Trang ${i + 1}`}
                width={1200}
                height={1600}
                loading="lazy"
                className="w-full h-auto object-contain shadow"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              />
            </div>
          ))}
        </div>

      <div
        className={cn(
          'fixed bottom-0 left-1/2 -translate-x-1/2 z-30 w-auto max-w-7xl px-4 py-2 transition-opacity duration-300',
          showOverlay || forceShow ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex items-center justify-between gap-1 sm:gap-2 text-sm sm:text-base">
          <Button
            onClick={goToPrev}
            disabled={chapterIndex === 0}
            size="icon"
            className="bg-[#80C6EA] hover:bg-blue-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={goToHome}
            size="icon"
            className="bg-[#80C6EA] hover:bg-blue-500"
          >
            <Home className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="truncate flex-1 text-center max-w-[70vw] sm:max-w-[400px] font-vi border-[#80C6EA] text-[#80C6EA]"
                title={`Chương ${chapterIndex + 1}`}
              >
                {`Chương ${chapterIndex + 1}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="max-h-96 overflow-y-auto w-[95vw] sm:w-[640px] bg-white border-[2px] border-[#80C6EA] font-vi text-gray-800"
            >
              {comic.chapters.map((chapter, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={() => goToChapter(i)}
                  className="truncate px-4 py-2 hover:bg-[#80C6EA] hover:text-white"
                >
                  {chapter.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={goToNext}
            disabled={chapterIndex === comic.chapters.length - 1}
            size="icon"
            className="bg-[#80C6EA] hover:bg-blue-500"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}