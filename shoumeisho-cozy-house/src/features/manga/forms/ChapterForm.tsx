'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { uploadChapterImageToCloudinary } from '@/lib/cloudinary'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Chapter } from '../config/comicConfig'
import { useCreateChapter } from '../query/queries'
import ImageSortableGrid from './ImageSortableGrid'

type ChapterFormProps = {
  comicId: string
  comicName: string
}

type PreviewImage = { file: File; url: string }

function toFolderName(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')         // thay khoảng trắng bằng _
    .replace(/[^a-z0-9_]/g, '')   // loại bỏ ký tự đặc biệt (tuỳ chọn)
}

export default function ChapterForm({ comicId, comicName }: ChapterFormProps) {
  const [images, setImages] = useState<PreviewImage[]>([])
  const { mutateAsync, isPending } = useCreateChapter(comicId)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Chapter>({
    defaultValues: { name: '', images: [] },
    mode: 'onSubmit',
  })

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url))
    }
  }, [images])

  const handleImageChange = (files: File[]) => {
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File ảnh không được vượt quá 10MB.')
        return
      }
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newImages])
  }

  const handleReorder = (newUrls: string[]) => {
    const newOrder = newUrls
      .map((url) => images.find((img) => img.url === url))
      .filter(Boolean) as PreviewImage[]
    setImages(newOrder)
  }

  const onSubmit = async (data: Chapter) => {
    // Validate name before proceeding
    if (!data.name || data.name.trim().length === 0) {
      toast.error('Tên chương không được để trống.')
      return
    }
    if (data.name.length > 100) {
      toast.error('Tên chương không được vượt quá 100 ký tự.')
      return
    }
    toast.success('Đang tải lên, vui lòng chờ...')
    try {
      const imageUrls = await Promise.all(
        images.map((img) => uploadChapterImageToCloudinary(img.file, toFolderName(comicName), toFolderName(data.name)))
      )

      await mutateAsync({
        ...data,
        images: imageUrls,
      })

      reset({ name: '', images: [] })
      images.forEach((img) => URL.revokeObjectURL(img.url))
      setImages([])
      toast.success('Chương đã được tạo thành công!')
      router.push(`/truyen/${comicId}`)
    } catch (error) {
      console.error('Error creating chapter:', error)
      toast.error('Có lỗi xảy ra khi tạo chương. Vui lòng thử lại.')
    }
  }

  return (
    <Card className="max-w-3xl mx-auto rounded-3xl border-[3px] border-[#80C6EA] bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-vi font-semibold text-[#80C6EA]">📝 Tạo chương mới</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-vi text-gray-800">Tên chương</Label>
            <Input
              id="name"
              placeholder="Chương 1: Bắt đầu hành trình..."
              className="border-[#80C6EA] font-vi"
              {...register('name', {
                required: 'Tên chương là bắt buộc',
                maxLength: {
                  value: 100,
                  message: 'Tên chương không được vượt quá 100 ký tự',
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 font-vi">{errors.name.message}</p>
            )}
          </div>
          <p className="text-sm text-red-500 font-vi">
            ⚠️ Lưu ý: Hãy tải ảnh đúng thứ tự và nội dung. Sau khi chọn sẽ không thể xoá.
          </p>

          <div className="space-y-2">
            <Label className="font-vi text-gray-800">Ảnh chương</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-[#80C6EA] text-[#80C6EA] hover:bg-[#80C6EA] hover:text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                📁 Chọn ảnh
              </Button>
              <span className="text-sm text-gray-500 font-vi">
                {images.length} ảnh đã chọn
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                handleImageChange(files)
              }}
            />
          </div>

          {images.length > 0 && (
            <>
              <Separator />
              <ImageSortableGrid
                images={images.map((img) => img.url)}
                onChange={handleReorder}
              />
            </>
          )}

          <Separator />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#80C6EA] hover:bg-blue-500 font-vi"
            >
              {isPending ? 'Đang tạo...' : 'Tạo chương'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}