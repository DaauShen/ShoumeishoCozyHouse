'use client'

import CuteCard from '@/components/CuteCard'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { FaGoogleDrive } from 'react-icons/fa6'

export default function Voicebank() {
    return (
        <CuteCard
            icon={<FaGoogleDrive className="text-[#3e6fc9] animate-bounce text-2xl" />}
            title="Voicebank"
            titleLang="vi"
            className="mt-6"
        >
            <Accordion
                type="single"
                collapsible
                defaultValue="shoumikucv"
                className="space-y-4 font-vi text-left"
            >
                <AccordionItem value="shoumikucv">
                    <AccordionTrigger className="text-base font-semibold text-left flex items-center gap-2">
                        Shoumeisho Miku CV
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-4">
                        <div>
                            <p className="text-lg font-bold">Link tải:</p>
                            <p>
                                <a href="https://drive.google.com/file/d/1d28fK_GIpOcV6xHuIooyE55Xt1x0atZL/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Drive</a>
                            </p>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CuteCard>
    )
}
