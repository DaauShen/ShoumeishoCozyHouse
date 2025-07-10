'use client'

import clsx from 'clsx'
import { Cat } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RouteLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    let doneTimeout: NodeJS.Timeout

    setLoading(true)
    setProgress(0)
    setFinished(false)

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 10) + 5)
        if (next >= 100) {
          clearInterval(interval)
          setFinished(true)
          doneTimeout = setTimeout(() => {
            setLoading(false)
          }, 700)
        }
        return next
      })
    }, 200)

    return () => {
      clearTimeout(doneTimeout)
      clearInterval(interval)
      setProgress(100)
      setLoading(false)
    }
  }, [pathname])

  if (!loading) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-primary font-vi text-lg transition-opacity duration-700',
        finished ? 'opacity-0' : 'opacity-100'
      )}
    >
      <Cat
        size={64}
        className={clsx(
          'mb-4 transition-transform duration-700',
          finished ? 'animate-shake-head' : 'animate-bounce-up'
        )}
      />
      <p className="text-xl font-bold">Đang tải... {progress}%</p>
    </div>
  )
}
