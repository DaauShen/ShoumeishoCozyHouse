'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type CuteCardProps = {
  icon?: ReactNode
  title?: string
  titleLang?: 'jp' | 'vi'
  children: ReactNode
  className?: string
}

export default function CuteCard({
  icon,
  title,
  titleLang = 'vi',
  children,
  className,
}: CuteCardProps) {
  return (
    <Card className={cn('rounded-3xl border-[3px] border-[#80C6EA] bg-white shadow-lg', className)}>
      <CardHeader className="flex flex-col items-center gap-2">
        {icon && <div className="text-[#80C6EA]">{icon}</div>}
        {title && (
          <CardTitle
            className={cn(
              'text-2xl text-[#80C6EA] text-center',
              titleLang === 'jp' ? 'font-jp' : 'font-vi'
            )}
          >
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="text-center font-vi text-gray-800 space-y-2">
        {children}
      </CardContent>
    </Card>
  )
}
