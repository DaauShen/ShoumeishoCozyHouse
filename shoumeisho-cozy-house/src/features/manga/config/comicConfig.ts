import { z } from 'zod'

export const chapterSchema = z.object({
    name: z.string().min(1),
    images: z.array(z.string().url()),
})

export const comicDTOSchema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    coverUrl: z.string(),
    status: z.enum(['ongoing', 'completed']),
    chapters: z.array(chapterSchema),
    description: z.string(), // Mô tả ngắn về truyện
})

export const comicSchema = comicDTOSchema.extend({
    id: z.string(), // ID có thể không có khi tạo mới
})


export type Chapter = z.infer<typeof chapterSchema>
export type ComicDTO = z.infer<typeof comicDTOSchema>
export type Comic = z.infer<typeof comicSchema>