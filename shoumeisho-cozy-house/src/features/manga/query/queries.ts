'use client'

import { useQuery } from '@tanstack/react-query'
import { getComicById, getComics } from '../api/api'

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