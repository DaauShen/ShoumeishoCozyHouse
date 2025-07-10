'use client'

import CuteTabs from '@/components/CuteTabs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { Cake, CalendarDays, Search } from 'lucide-react'
import { useState } from 'react'
import { vocaloidBirthdays } from './BirthdayData'

const months = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
]

const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export default function BirthdayCalendar() {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth)
  const [search, setSearch] = useState('')
  const [selectedDay, setSelectedDay] = useState<{ day: number, names: string[] } | null>(null)

  const renderMonthGrid = (month: number) => {
    const year = today.getFullYear()
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const paddedArray = [...Array(firstDayOfMonth).fill(null), ...daysArray]
    const events = vocaloidBirthdays[month] || []

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 text-center font-medium text-sm text-muted-foreground">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {paddedArray.map((day, idx) => {
            const dayEvents = events.find(e => e.day === day)
            const isToday = day === currentDay && month === currentMonth
            const hasEvents = day !== null && dayEvents !== undefined

            return (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <div
                    className={clsx(
                      'border rounded-xl p-2 min-h-[72px] text-sm cursor-pointer transition hover:shadow-sm bg-white',
                      isToday && 'border-pink-400 bg-pink-50 font-bold',
                      hasEvents && 'hover:border-primary hover:ring-2 hover:ring-primary/30',
                      !hasEvents && 'cursor-default text-muted-foreground'
                    )}
                    onClick={() => hasEvents && setSelectedDay(dayEvents)}
                  >
                    {day && (
                      <>
                        <div>{day}</div>
                        {hasEvents && (
                          <>
                            <div className="text-xs mt-1 text-primary flex items-center justify-center gap-1">
                              <Cake size={12} /> {dayEvents.names[0]}
                            </div>
                            {dayEvents.names.length > 1 && (
                              <div className="text-[11px] text-muted-foreground text-center">
                                +{dayEvents.names.length - 1} nữa
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </DialogTrigger>
                {hasEvents && (
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-primary">
                        <Cake size={20} /> Sinh nhật ngày {day}/{month}
                      </DialogTitle>
                    </DialogHeader>
                    <ul className="space-y-1 text-sm">
                      {dayEvents.names.map((name, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Cake className="text-pink-400" size={16} /> {name}
                        </li>
                      ))}
                    </ul>
                  </DialogContent>
                )}
              </Dialog>
            )
          })}
        </div>
      </div>
    )
  }

  const allEvents = Object.entries(vocaloidBirthdays)
    .flatMap(([month, events]) =>
      events.flatMap((e) =>
        e.names.map((name) => ({
          day: e.day,
          name,
          month: Number(month),
        }))
      )
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  const filteredEvents = allEvents.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <CuteTabs
      defaultValue="month"
      tabs={[
        {
          label: (
            <>
              <CalendarDays className="inline-block mr-1" size={18} />
              Theo tháng
            </>
          ) as any,
          value: 'month',
          content: (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <p className="font-semibold text-sm">Chọn tháng:</p>
                <div className="flex flex-wrap gap-2">
                  {months.map((label, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant={selectedMonth === i + 1 ? 'default' : 'outline'}
                      className="rounded-full"
                      onClick={() => setSelectedMonth(i + 1)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
  
              {selectedMonth && (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-center text-primary">
                    🎂 {months[selectedMonth - 1]}
                  </h3>
                  {renderMonthGrid(selectedMonth)}
                </>
              )}
            </>
          ),
        },
        {
          label: (
            <>
              <Search className="inline-block mr-1" size={18} />
              Theo tên
            </>
          ) as any,
          value: 'alphabet',
          content: (
            <>
              <Input
                type="text"
                placeholder="Tìm theo tên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm mb-4"
              />
  
              <div className="space-y-6">
                {filteredEvents.length === 0 ? (
                  <p className="text-sm italic text-muted-foreground">
                    Không tìm thấy nhân vật phù hợp.
                  </p>
                ) : (
                  Object.entries(
                    filteredEvents.reduce((acc, event) => {
                      const normalized = event.name
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toUpperCase()
                      const firstChar = normalized[0] ?? '?'
  
                      if (!acc[firstChar]) acc[firstChar] = []
                      acc[firstChar].push(event)
                      return acc
                    }, {} as Record<string, typeof filteredEvents>)
                  )
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([char, events]) => (
                      <div key={char} className="space-y-2">
                        <h3 className="text-lg font-bold text-primary">{char}</h3>
                        {events.map((event, i) => {
                          const isToday =
                            event.day === currentDay &&
                            event.month === currentMonth
                          return (
                            <div
                              key={i}
                              className={clsx(
                                'text-sm border-l-4 pl-3',
                                isToday
                                  ? 'text-pink-600 font-bold border-pink-400'
                                  : 'border-primary'
                              )}
                            >
                              <strong>
                                {event.day.toString().padStart(2, '0')}/
                                {event.month.toString().padStart(2, '0')}
                              </strong>{' '}
                              – {event.name}
                            </div>
                          )
                        })}
                      </div>
                    ))
                )}
              </div>
            </>
          ),
        },
      ]}
    />
  )
  
}
