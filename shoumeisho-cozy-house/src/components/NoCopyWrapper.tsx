'use client'

export default function NoCopyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => e.button === 2 && e.preventDefault()}
      className="select-none"
    >
      {children}
    </div>
  )
}
