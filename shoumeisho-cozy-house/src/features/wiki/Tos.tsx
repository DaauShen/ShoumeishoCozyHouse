'use client'

import CuteCard from '@/components/CuteCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FileText } from 'lucide-react'

export default function WikiCredit() {
  return (
    <CuteCard
      icon={<FileText className="text-primary animate-bounce" />}
      title="Điều khoản sử dụng / Term of Use"
      titleLang="vi"
      className="mt-6"
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="vietnamese"
        className="space-y-4 font-vi text-left"
      >
        <AccordionItem value="vietnamese">
          <AccordionTrigger className="text-base font-semibold text-left flex items-center gap-2">
            Tiếng Việt
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <div>
              <p className="text-lg font-bold">Về phần nhân vật:</p>
              <p>
                “Nhân vật” ở đây là bao gồm tất cả các hình ảnh, thiết kế và tên nhân vật
                “Shoumeisho Miku” được sử dụng cho tất cả các sản phẩm.
              </p>
              <p className="mt-2 font-semibold">Những việc sử dụng được cấp phép mà không cần liên hệ trước:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Sử dụng nhân vật Shoumeisho Miku cho mục đích phi thương mại, ví dụ như tạo ra những
                  sản phẩm phái sinh: fan-art, cosplay, dựng 3D, fan-fiction… mà không vi phạm vào pháp luật
                  hay đạo đức.
                </li>
              </ul>

              <p className="mt-2 font-semibold">Những việc sử dụng có khả năng được cấp phép nhưng phải liên hệ trước:</p>
              <p className="italic">
                Hãy liên hệ trực tiếp qua tin nhắn với page “Chừng nào Vocaloid có CCCD thì xoá blog”.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Sử dụng nhân vật Shoumeisho Miku với mục đích thương mại dưới mọi hình thức.
                </li>
              </ul>

              <p className="mt-2 font-semibold">Những việc sử dụng hoàn toàn bị cấm:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Sử dụng nhân vật Shoumeisho Miku để làm những hành vi trái với pháp luật và đạo đức.
                </li>
                <li>
                  Phỉ báng nhân vật Shoumeisho Miku, hay gián tiếp phỉ báng blog
                  “Chừng nào Vocaloid có CCCD thì xoá blog” qua nhân vật Shoumeisho Miku.
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-bold">Về phần sản phẩm:</p>
              <p>
                “Sản phẩm” ở đây có nghĩa là sản phẩm ngân hàng giọng UTAU của Shoumeisho Miku.
              </p>
              <p className="mt-2 font-semibold">Những việc sử dụng được cấp phép mà không cần liên hệ trước:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Sử dụng sản phẩm Shoumeisho Miku cho mục đích phi thương mại mà không vi phạm vào pháp
                  luật hay đạo đức.
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="english">
          <AccordionTrigger className="text-base font-semibold text-left flex items-center gap-2">
            English
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
          <div>
              <p className="text-lg font-bold">About the character:</p>
              <p>
              The “character” in this context shall include all graphics, designs and the character’s name “Shoumeisho Miku” used in all products.
              </p>
              <p className="mt-2 font-semibold">These actions below are valid without any permissions:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                Using the character Shoumeisho Miku for non-commercial purposes, e.g. creating fanworks or derivatives: fanarts, cosplaying performances, 3D models, fanfictions, etc. which do not violate any laws or moralities.
                </li>
              </ul>

              <p className="mt-2 font-semibold">These actions below are possibly valid, however one shall contact to the creators for permissions before:</p>
              <p className="italic">
              Contact through the boxchat of “Chừng nào Vocaloid có CCCD thì xóa blog” page.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                Using the character Shoumeisho Miku for commercial purposes under any circumstances.
                </li>
              </ul>

              <p className="mt-2 font-semibold">These actions below are completely prohibited:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                Using the character Shoumeisho Miku for illegal and immoral doings.
                </li>
                <li>
                Humiliating the character Shoumeisho Miku, or indirectly humiliating “Chừng nào Vocaloid có CCCD thì xóa blog” page using the character Shoumeisho Miku.
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-bold">About the product:</p>
              <p>
              The “product” in this context shall mean the UTAU voicebank of Shoumeisho Miku.
              </p>
              <p className="mt-2 font-semibold">These actions below are valid without any permissions:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                Using the product Shoumeisho Miku for non-commercial purposes which do not violate any laws or moralities.
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CuteCard>
  )
}
