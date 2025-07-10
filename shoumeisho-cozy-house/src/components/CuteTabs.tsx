'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CuteTabsProps {
  tabs: {
    label: string
    value: string
    content: React.ReactNode
  }[]
  defaultValue?: string
}

export default function CuteTabs({ tabs, defaultValue }: CuteTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue ?? tabs[0]?.value)

  return (
    <div className="w-full mt-6 font-vi">
      {/* Tab header */}
      <div className="flex overflow-hidden rounded-full border-[3px] border-[#80C6EA] bg-white shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex-1 px-4 py-2 text-center text-sm sm:text-base font-semibold transition-all duration-200',
              activeTab === tab.value
                ? 'text-[#80C6EA] underline underline-offset-[6px] decoration-[3px]'
                : 'text-gray-700 hover:text-[#80C6EA]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {tabs.map((tab) =>
          tab.value === activeTab ? (
            <div key={tab.value}>{tab.content}</div>
          ) : null
        )}
      </div>
    </div>
  )
}
