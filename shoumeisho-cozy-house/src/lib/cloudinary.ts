export async function uploadImageToCloudinary(file: File, preset: 'cover' | 'chapter'): Promise<string> {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
    const presetName = preset === 'cover'
      ? process.env.NEXT_PUBLIC_CLOUDINARY_COVER_PRESET!
      : process.env.NEXT_PUBLIC_CLOUDINARY_CHAPTER_PRESET!
  
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', presetName)
    formData.append('folder', preset === 'cover' ? 'covers' : 'chapters')
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })
  
    if (!res.ok) throw new Error('Cloudinary upload failed')
  
    const data = await res.json()
    return data.secure_url
  }
  