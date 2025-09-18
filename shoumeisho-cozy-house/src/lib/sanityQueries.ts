// lib/sanityQueries.ts
import { Comic, comicSchema } from '@/features/manga/config/comicConfig'
import { client } from '@/sanity/client'
import { type SanityDocument } from 'next-sanity'
import z from 'zod'

export async function getWikiGallery(options?: { order?: 'asc' | 'desc' }) {
    const sortOrder = options?.order || 'asc'
    const query = `
        *[_type == "wikiGallery"] | order(_createdAt ${sortOrder}) {
        title,
        images[]{
            caption,
            image
        }
    }
    `
    const data = await client.fetch<SanityDocument[]>(query)

    // map để lấy width/height trực tiếp
    return data.map((item: any) => ({
        title: item.title,
        images: (item.images || []).map((img: any) => ({
            src: img.image.secure_url,
            width: img.image.width,
            height: img.image.height,
            caption: img.caption,
        })),
    }))
}

// === Hàm mới để lấy manga ===
export async function getMangaById(id: string): Promise<Comic> {
    const query = `
      *[_type == "manga" && _id == $id][0]{
        _id,
        title,
        author,
        description,
        status,
        cover {
          secure_url
        },
        "chapters": chapters[]{
          title,
          "pages": pages[].secure_url
        }
      }
    `
  
    const data = await client.fetch<any>(query, { id })
  
    if (!data) {
      throw new Error(`Manga with id ${id} not found`)
    }
  
    const mapped = {
      id: data._id,
      title: data.title,
      author: data.author || '',
      coverUrl: data.cover?.secure_url || '',
      status: data.status,
      description: data.description || '',
      chapters: (data.chapters || []).map((chap: any) => ({
        name: chap.title || '', // map title -> name
        images: chap.pages || [], // map pages -> images
      })),
    }
  
    return comicSchema.parse(mapped)
  }
  
  export async function getMangaList(): Promise<Comic[]> {
    const query = `
      *[_type == "manga"] | order(_createdAt desc) {
        _id,
        title,
        author,
        description,
        status,
        cover {
          secure_url
        },
        "chapters": chapters[]{
          title,
          "pages": pages[].secure_url
        }
      }
    `
  
    const data = await client.fetch<any[]>(query)
  
    const mapped = data.map((m) => ({
      id: m._id,
      title: m.title,
      author: m.author || '',
      coverUrl: m.cover?.secure_url || '',
      status: m.status,
      description: m.description || '',
      chapters: (m.chapters || []).map((chap: any) => ({
        name: chap.title || '',
        images: chap.pages || [],
      })),
    }))
  
    return z.array(comicSchema).parse(mapped)
  }