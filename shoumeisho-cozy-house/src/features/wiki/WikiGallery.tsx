'use client'

import CuteCard from '@/components/CuteCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getWikiGallery } from '@/lib/sanityQueries'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface GalleryImage {
  src: string
  width: number
  height: number
  caption: string
}

interface ImageSection {
  title: string
  value: string
  images: GalleryImage[]
}

export default function WikiGalleryAccordion() {
  const [imageSections, setImageSections] = useState<ImageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const data = await getWikiGallery({ order: 'asc' })
      const sections: ImageSection[] = data.map((item, idx) => ({
        title: item.title,
        value: `section-${idx}`,
        images: item.images,
      }))
      setImageSections(sections)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <CuteCard
      title="Bộ sưu tập minh hoạ"
      titleLang="vi"
      className="mt-6"
    >
      <p className="text-sm text-gray-600 mb-4 text-justify">
        Đây là những minh hoạ chính thức và fanart cho Shoumeisho Miku. Nhấn vào ảnh để phóng to.
      </p>

      {loading ? (
        // Skeleton dạng block
        <div
          className="bg-gray-300 animate-pulse rounded-xl h-48"
        />
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue={imageSections[0]?.value} // Tab đầu tiên mở sẵn
          className="space-y-4 font-vi text-left"
        >
          {imageSections.map((section) => (
            <AccordionItem key={section.value} value={section.value}>
              <AccordionTrigger className="text-base font-semibold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.images.map((img, idx) => (
                    <Dialog key={idx} onOpenChange={(open) => setSelectedImage(open ? img : null)}>
                      <DialogTrigger asChild>
                        <div className="flex flex-col cursor-zoom-in group">
                          <div
                            className="relative w-full overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-all"
                            style={{ aspectRatio: `${img.width} / ${img.height}` }}
                          >
                            <Image
                              src={img.src}
                              alt={img.caption}
                              fill
                              loading="lazy"
                              className="object-cover transition-transform group-hover:scale-[1.02]"
                            />
                          </div>
                          <div className="px-2 py-2 text-center text-sm text-gray-700 font-vi min-h-[48px] flex items-center justify-center">
                            {img.caption}
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none [&>button]:hidden">
                        <DialogTitle />
                        <DialogDescription/>
                        <div className="flex flex-col items-center gap-2">
                          <Image
                            src={img.src}
                            alt={img.caption}
                            width={img.width}
                            height={img.height}
                            loading="lazy"
                            className="rounded-xl object-contain max-h-[90vh] w-auto"
                            unoptimized
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </CuteCard>
  )
}
