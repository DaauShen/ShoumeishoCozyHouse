'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  name: string
  description: string
  href: string
  color?: string
}

export default function CommunityLinkCard({
  icon,
  name,
  description,
  href,
  color = '#80C6EA',
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border-[3px] shadow-sm hover:shadow-md transition-all',
        'bg-white',
      )}
      style={{ borderColor: color }}
    >
      <div
        className="text-white rounded-full p-3 flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center font-vi flex-1">
        <p className="text-base font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </a>
  )
}
