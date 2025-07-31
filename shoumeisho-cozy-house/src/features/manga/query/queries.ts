'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addChapterToComic, createComic, deleteChapter, deleteComic, getComicById, getComics, updateComic } from '../api/api'
import { Chapter, ComicDTO } from '../config/comicConfig'

// Lấy danh sách tất cả truyện
export function useComics() {
  return useQuery({
    queryKey: ['comics'],
    queryFn: getComics,
  })
}

// Lấy 1 truyện theo ID
export function useComicById(id: string) {
  return useQuery({
    queryKey: ['comics', id],
    queryFn: () => getComicById(id),
    enabled: !!id,
  })
}

// Tạo mới truyện
export function useCreateComic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<ComicDTO, 'chapters'>) => createComic(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comics'] })
    },
  })
}

// Cập nhật truyện
export function useUpdateComic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ComicDTO }) => updateComic({ id, data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['comics'] })
      queryClient.invalidateQueries({ queryKey: ['comics', id] })
    },
  })
}

// Xoá truyện
export function useDeleteComic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteComic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comics'] })
    },
  })
}

// Thêm chương mới
export function useCreateChapter(comicId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Chapter) => addChapterToComic(comicId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comics', comicId] })
    },
  })
}

interface DeleteChapterParams {
  comicId: string
  chapterIndex: number
}

// Xoá chương
export function useDeleteChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ comicId, chapterIndex }: DeleteChapterParams) => {
      return deleteChapter(comicId, chapterIndex)
    },
    onSuccess: (_data, { comicId }) => {
      queryClient.invalidateQueries({ queryKey: ['comics', comicId] })
    },
  })
}