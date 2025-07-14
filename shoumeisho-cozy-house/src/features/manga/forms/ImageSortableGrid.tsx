'use client'

import { DndContext, closestCenter } from '@dnd-kit/core'
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import Image from 'next/image'

export default function ImageSortableGrid({
  images,
  onChange,
}: {
  images: string[]
  onChange: (newImages: string[]) => void
}) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (active.id !== over?.id) {
          const oldIndex = images.findIndex((url) => url === active.id)
          const newIndex = images.findIndex((url) => url === over?.id)
          const sorted = arrayMove(images, oldIndex, newIndex)
          onChange(sorted)
        }
      }}
    >
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url) => (
            <SortableImage key={url} url={url} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function SortableImage({ url }: { url: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: url })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
        transition,
      }}
      className="relative rounded-lg border-[2px] border-[#80C6EA] overflow-hidden shadow"
    >
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={url}
          alt="Ảnh"
          fill
          className="object-cover"
          sizes="200px"
        />
      </div>
    </div>
  )
}