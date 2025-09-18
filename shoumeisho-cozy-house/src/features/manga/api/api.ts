import { getMangaById, getMangaList } from '@/lib/sanityQueries';
import { Comic } from '../config/comicConfig';

// Lấy danh sách tất cả truyện
export async function getComics(): Promise<Comic[]> {
  return getMangaList();
}

// Lấy 1 truyện theo ID
export async function getComicById(id: string): Promise<Comic> {
  return getMangaById(id);
}