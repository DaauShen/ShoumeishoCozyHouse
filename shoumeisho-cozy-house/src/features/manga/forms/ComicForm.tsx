'use client'

import CoverUpload from '@/components/CoverUpload'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { uploadCoverToCloudinary } from '@/lib/cloudinary'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ComicDTO, comicDTOSchema } from '../config/comicConfig'

type ComicFormProps = {
  defaultValues?: ComicDTO
  onSubmit: (data: ComicDTO) => void
}

const defaultComic: ComicDTO = {
  title: '',
  author: '',
  coverUrl: '',
  status: 'ongoing',
  chapters: [],
  description: '',
}

function toFolderName(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')         // thay khoảng trắng bằng _
    .replace(/[^a-z0-9_]/g, '')   // loại bỏ ký tự đặc biệt (tuỳ chọn)
}


export default function ComicForm({ defaultValues, onSubmit }: ComicFormProps) {
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const form = useForm<ComicDTO>({
    resolver: zodResolver(comicDTOSchema),
    defaultValues: defaultValues ?? defaultComic,
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const handleUploadSubmit = async (data: ComicDTO) => {
    let coverUrl = data.coverUrl

    if (coverFile) {
      coverUrl = await uploadCoverToCloudinary(coverFile, toFolderName(form.getValues('title')))
    }

    onSubmit({
      ...data,
      coverUrl,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleUploadSubmit)}
        className="space-y-6 border-[3px] border-[#80C6EA] p-6 rounded-3xl bg-white shadow-lg"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-vi text-gray-800">Tiêu đề</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên truyện"
                  className="border-[#80C6EA] font-vi"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-vi text-gray-800">Tác giả</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên tác giả"
                  className="border-[#80C6EA] font-vi"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-vi text-gray-800">Ảnh bìa</FormLabel>
              <FormControl>
                <CoverUpload
                  value={coverFile || field.value}
                  onChange={(file) => {
                    setCoverFile(file)
                    field.onChange('')
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-vi text-gray-800">Tình trạng</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border-[2px] border-[#80C6EA] rounded-md px-3 py-2 font-vi text-gray-800"
                >
                  <option value="ongoing">Đang tiến hành</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-vi text-gray-800">Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả nội dung truyện…"
                  className="resize-none border-[#80C6EA] font-vi"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#80C6EA] hover:bg-blue-500 font-vi"
        >
          {defaultValues ? 'Cập nhật truyện' : 'Tạo truyện'}
        </Button>
      </form>
    </Form>
  )
}