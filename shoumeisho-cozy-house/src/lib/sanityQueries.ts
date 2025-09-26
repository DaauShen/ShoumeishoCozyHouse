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

  export const birthdaySchema = z.object({
    id: z.string(),
    character: z.string(),
    date: z.string(), // dạng YYYY-MM-DD trong Sanity
  })
  
  export type Birthday = z.infer<typeof birthdaySchema>
  
  /**
   * Lấy toàn bộ danh sách sinh nhật
   */
  export async function getBirthdayList(options?: { order?: 'asc' | 'desc' }): Promise<Birthday[]> {
    const sortOrder = options?.order || 'asc'
    const query = `
      *[_type == "birthdayCalendar"] | order(date ${sortOrder}) {
        _id,
        character,
        date
      }
    `
    const data = await client.fetch<any[]>(query)
  
    const mapped = data.map((item) => ({
      id: item._id,
      character: item.character,
      date: item.date,
    }))
  
    return z.array(birthdaySchema).parse(mapped)
  }
  
  /**
   * Lấy sinh nhật theo tên nhân vật
   */
  export async function getBirthdayByCharacter(name: string): Promise<Birthday | null> {
    const query = `
      *[_type == "birthdayCalendar" && character == $name][0]{
        _id,
        character,
        date
      }
    `
    const data = await client.fetch<any>(query, { name })
  
    if (!data) return null
  
    const mapped = {
      id: data._id,
      character: data.character,
      date: data.date,
    }
  
    return birthdaySchema.parse(mapped)
  }
  
  /**
   * Lấy danh sách sinh nhật hôm nay
   */
  export async function getTodayBirthday(): Promise<Birthday[]> {
    const allBirthdays = await getBirthdayList()
    const today = new Date()
    const todayMMDD = today.toISOString().slice(5, 10) // "MM-DD"
  
    const filtered = allBirthdays.filter((b) => {
      const mmdd = b.date.slice(5, 10)
      return mmdd === todayMMDD
    })
  
    return filtered
  }