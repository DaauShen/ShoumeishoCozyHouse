// lib/getTodayBirthdays.ts

import { vocaloidBirthdays } from './BirthdayData'

export function getTodayBirthdays() {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1

  const todayEvent = vocaloidBirthdays[month]?.find(event => event.day === day)

  return {
    day,
    month,
    names: todayEvent?.names || [],
  }
}
