import { db } from '@/lib/firebase'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore'
import { Chapter, Comic, ComicDTO } from '../config/comicConfig'

const comicsRef = collection(db, 'comics')

// Lấy danh sách tất cả truyện
export async function getComics(): Promise<Comic[]> {
  const snapshot = await getDocs(comicsRef)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Comic[]
}

// Lấy 1 truyện theo ID
export async function getComicById(id: string): Promise<Comic> {
  const docRef = doc(comicsRef, id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) throw new Error('Comic not found')
  return { id: snapshot.id, ...snapshot.data() } as Comic
}

// Tạo truyện mới
export async function createComic(data: Omit<ComicDTO, 'chapters'>) {
  const newComic = {
    ...data,
    chapters: [],
  }
  const docRef = await addDoc(comicsRef, newComic)
  return { id: docRef.id, ...newComic }
}

// Cập nhật truyện
export async function updateComic({ id, data }: { id: string; data: ComicDTO }) {
  const comicRef = doc(db, 'comics', id)
  await updateDoc(comicRef, data)
}

// Xoá truyện
export async function deleteComic(id: string) {
  await deleteDoc(doc(comicsRef, id))
}

// Thêm chương mới vào truyện
export async function addChapterToComic(comicId: string, chapter: Chapter) {
  const comicRef = doc(db, 'comics', comicId)
  const snapshot = await getDoc(comicRef)

  if (!snapshot.exists()) throw new Error('Comic not found')

  const comic = snapshot.data() as Comic
  const updatedChapters = [...(comic.chapters || []), chapter]

  await updateDoc(comicRef, { chapters: updatedChapters })
  return { ...comic, chapters: updatedChapters }
}

// Xoá chương theo index
export async function deleteChapter(comicId: string, chapterIndex: number) {
  const comicRef = doc(db, 'comics', comicId)
  const snapshot = await getDoc(comicRef)

  if (!snapshot.exists()) throw new Error('Comic not found')

  const comic = snapshot.data() as Comic
  const chapters = [...(comic.chapters || [])]
  chapters.splice(chapterIndex, 1)

  await updateDoc(comicRef, { chapters })
  return { ...comic, chapters }
}