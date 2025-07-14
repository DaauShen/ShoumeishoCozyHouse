'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type CoverUploadProps = {
  value?: File | string
  onChange?: (file: File | null) => void
}

export default function CoverUpload({ value, onChange }: CoverUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const preview = value
    ? typeof value === 'string'
      ? value
      : URL.createObjectURL(value)
    : file
    ? URL.createObjectURL(file)
    : ''

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      onChange?.(selected)
    }
  }

  const handleReset = () => {
    setFile(null)
    onChange?.(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(preview)
    }
  }, [file, preview])

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative group w-fit">
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src={preview}
                alt="preview"
                width={150}
                height={200}
                className="rounded-md border cursor-pointer transition hover:brightness-90"
              />
            </DialogTrigger>
            <DialogContent className="w-fit max-w-full">
                <DialogTitle></DialogTitle>
              <Image
                src={preview}
                alt="cover preview"
                width={400}
                height={600}
                className="rounded-md"
              />
            </DialogContent>
          </Dialog>

          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-1" />
              Chọn lại
            </Button>

            <Button
              variant="destructive"
              size="sm"
              type="button"
              onClick={handleReset}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Xóa ảnh
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Chọn ảnh bìa
        </Button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  )
}
