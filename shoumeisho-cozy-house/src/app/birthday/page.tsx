import BirthdayCalendar from '@/features/birthdays/BirthdayCalendar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lịch sinh nhật Vocaloid',
  description: 'Sinh nhật của các Vocaloid',
}

export default function SuKienPage() {
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Lịch sinh nhật của Vocaloid</h1>
      <p className="text-gray-700 mb-6 text-center">
        Ấn vào một tháng bất kì để xem sinh nhật của các Vocaloid trong tháng đó. Bạn cũng có thể tìm kiếm ngày sinh nhật theo tên của Vocaloid.
      </p>
      <BirthdayCalendar/>
    </main>
  )
}