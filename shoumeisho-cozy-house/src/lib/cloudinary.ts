// Upload ảnh bìa (cover) vào thư mục theo tên truyện
export async function uploadCoverToCloudinary(file: File, storySlug: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
  const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_COVER_PRESET!

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', presetName)
  formData.append('folder', storySlug) // VD: "one-piece"

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error('Cloudinary Upload Error (cover):', res.status, res.statusText, errorText)
    throw new Error('Cloudinary cover upload failed')
  }

  const data = await res.json()
  return data.secure_url
}

// Upload ảnh chương vào thư mục: tên-truyện/chapters
export async function uploadChapterImageToCloudinary(file: File, storySlug: string, chapterSlug: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
  const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_CHAPTER_PRESET!

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', presetName)
  formData.append('folder', `${storySlug}/${chapterSlug}`) // VD: "one-piece/chapters"

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error('Cloudinary Upload Error (chapter):', res.status, res.statusText, errorText)
    throw new Error('Cloudinary chapter upload failed')
  }

  const data = await res.json()
  return data.secure_url
}
