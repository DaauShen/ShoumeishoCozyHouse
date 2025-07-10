'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Cat } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogoutDialog({ open, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl border-[3px] border-primary bg-white">
        <DialogHeader className="flex items-center gap-2 text-primary">
          <Cat className="animate-bounce" />
          <DialogTitle className="text-xl font-vi">Bạn chắc chắn muốn đăng xuất?</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button className="bg-primary text-white hover:bg-[#68B0D8]" onClick={onConfirm}>
            Đăng xuất
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
