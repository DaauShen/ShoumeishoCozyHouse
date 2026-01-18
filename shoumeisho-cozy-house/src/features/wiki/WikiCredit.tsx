'use client'

import CuteCard from '@/components/CuteCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CircleQuestionMark, Mic2, Music2, Palette, Panda, ScanEye, Sparkles, SunMedium } from 'lucide-react'

export default function WikiCredit() {
  return (
    <CuteCard
      icon={<Palette className="text-primary animate-bounce" />}
      title="Thông tin phiên bản"
      titleLang="vi"
      className="mt-6"
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="original"
        className="space-y-4 font-vi text-left"
      >
        {/* Accordion: Thiết kế gốc */}
        <AccordionItem value="original">
          <AccordionTrigger className="text-base font-semibold text-left flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Gốc
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <ul className="list-disc pl-4 space-y-1">
              {/* <li>Ý tưởng: jidousha, alice</li>
              <li>Thiết kế: alice, jidousha, yix, yze, chest</li> */}
              <li>Minh hoạ chính: Tiêu Tiêu</li>
              <li>Minh họa chibi chính: <i>Coming soon...</i></li>
              <li>Minh hoạ bản thiết kế: yix</li>
            </ul>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Mic2 className="w-4 h-4 text-pink-500" />
                Vocal Synthesizers
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                {[
                  'Hatsune Miku', 'Kaai Yuki', 'Kagamine Rin', 'GUMI (VOCALOID)', 'Luo Tianyi', 'Utatane Piko',
                  'Otomachi Una', 'flower (v4 flower)', 'MEIKA Hime & Mikoto', 'Kasane Teto (SynthV)',
                  'Megurine Luka (V4X)', 'MEIKO (V3)', 'Yuzuki Yukari (V3)', 'KAITO', 'IA',
                  'Oliver', 'Fukase', 'MAYU', 'KAFU', 'VOCALOID', 'UTAU'
                ].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Music2 className="w-4 h-4 text-yellow-600" />
                Vocaloid Producers
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                {[
                  'Kairiki Bear', 'Nounai Kakumei Girl – MARETU', 'Hoshi-kun – OC của Kikuo',
                  'TeamOS', 'PinocchioP', 'DECO*27', 'Ayase', 'Kashii Moimi', 'Mafumafu', 'wotaku',
                  'Unknown Mother Goose – wowaka', 'Matryoshka – HACHI', 'syudou', 'KING – Kanaria',
                ].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Khác
              </div>
              <ul className="pl-2 list-none space-y-1">
                {['Ado', 'bo en'].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Accordion: Thiết kế hè */}
        <AccordionItem value="summer">
          <AccordionTrigger className="text-base font-semibold text-left flex items-center gap-2">
            <SunMedium className="w-5 h-5 text-yellow-500" />
            Hè
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <ul className="list-disc pl-4 space-y-1">
              <li>Ý tưởng: jidousha</li>
              <li>Thiết kế: jidousha, higashi</li>
              <li>Minh hoạ ý tưởng: higashi</li>
              <li>Minh hoạ chính kiêm bản thiết kế: Duy Anh</li>
            </ul>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Mic2 className="w-4 h-4 text-pink-500" />
                Vocal Synthesizers
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                {[
                  'Hatsune Miku', 'Kagamine Rin', 'Otomachi Una', 'Macne Nana', 'Yuezheng Ling (V3)',
                  'YANHE (V3)', 'SeeU', 'ROSA (CeVIO AI)', 'Koharu Rikka', 'SF-A2 miki',
                  'Rana', 'Synthesizer V',
                ].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Music2 className="w-4 h-4 text-yellow-600" />
                Vocaloid Producers
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                {[
                  'shikiura sougo', 'Hachiouji-P', 'Haraguchi Sasuke', 'Orangestar',
                  'Neru', 'Iyowa', 'Azari', 'Misumi', 'Hoshi-kun (OC của Kikuo)',
                ].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>


        <AccordionItem value="bear">
          <AccordionTrigger className="text-base font-semibold text-left flex items-center gap-2">
            <Panda className="w-5 h-5 text-black-500" />
            Jirai Kei × Kairiki Bear
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <ul className="list-disc pl-4 space-y-1">
              <li>Ý tưởng: jidousha</li>
              <li>Thiết kế: jidousha</li>
              <li>Minh hoạ chính: <i>coming soon...</i></li>
              <li>Minh hoạ bản thiết kế: jidousha & Duy Anh</li>
            </ul>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Music2 className="w-4 h-4 text-yellow-600" />
                <p>Kairiki Bear</p>
              </div>
              <div className="pl-5 flex flex-col gap-2"> {/* 👈 thêm padding-left để thụt vào ngang chữ */}
                <p><b>Các bài hát:</b></p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                  {[
                    'Venom', 
                    'Kokoro Nonsense', 
                    'Hitosama Allergy',
                    'Seidenki Ningen',
                    'Shippaisaku Shoujo',
                    'Darling Dance',
                    'Bug',
                    'Down Timer',
                    'Barabara Kokoro',
                    'Minus Label',
                    'Mane Mane Psychotropic'
                  ].map((item, idx) => (
                    <li key={idx}>・{item}</li>
                  ))}
                </ul>
                <p><b>Các nhân vật:</b></p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                  {[
                    'Aia', 
                    'Luruca (nhân vật trong game #Compass)'
                  ].map((item, idx) => (
                    <li key={idx}>・{item}</li>
                  ))}
                </ul>
              </div>
            </div>


            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Mic2 className="w-4 h-4 text-pink-500" />
                Vocal Synthesizers
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                {[
                  'CeVIO'
                ].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="menhera">
          <AccordionTrigger className="text-base font-semibold text-left flex items-center gap-2">
            <ScanEye className="w-5 h-5 text-black-500" />
            Menhera
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <ul className="list-disc pl-4 space-y-1">
              <li>Ý tưởng: alice</li>
              <li>Thiết kế: alice</li>
              <li>Minh hoạ chính: Trâm Nguyễn & alice</li>
            </ul>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <CircleQuestionMark className="w-4 h-4 text-red-500" />
                Trivia
              </div>
              <ul className="gap-x-4 pl-2 list-none space-y-1">
                <li>・Cô không (được chính thức công nhận) là một yandere. Cô chỉ mang một số vấn đề tâm lý và đôi lúc bộc lộ thiên hướng "cute aggression" của mình. VD: Nếu người yêu của cô bắt cá hai tay, chắc chắn 100% là cô sẽ chỉ khóc than như Parasite của DECO*27.</li>
                <li>・Tựa game yêu thích của Menhera ShouMiku là Yume Nikki. Nhân vật yêu thích nhất của cô là Seccom Masada. Hơn nữa, cô cũng mong chờ được chơi bản phát hành chính thức của Habromania.</li>
                <li>・Cô thích ăn táo.</li>
                <li>・Loài hoa yêu thích của cô là anh túc đỏ.</li>
                <li>・Thức uống yêu thích của cô là Monster – Ultra Strawberry Dreams.</li>
                <li>・Dù ngoại hình có phần đáng sợ, Menhera ShouMiku cực kỳ hút mèo; cô cũng thấy điều này thú vị.</li>
                <li>・Cô có một thú nhồi bông hình mèo – táo.</li>
                <li>・Vật phẩm đại diện của cô ngoài chuối Blue Java ra là táo Red Delicious.</li>
              </ul>
            </div>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Mic2 className="w-4 h-4 text-pink-500" />
                Vocal Synthesizers & Fanloids
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                {[
                  'Kaai Yuki', 'Flower', 'MAYU', 'Yowane Haku', 'Chika',
                  'Fukase', 'Sukone Tei', 'Namine Ritsu', 'Poyoroid Sou', 'Calne Ca'
                ].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <div className="font-semibold underline underline-offset-4 decoration-primary mb-1 flex items-center gap-1">
                <Music2 className="w-4 h-4 text-yellow-600" />
                Vocaloid Producers
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2 list-none space-y-1">
                {[
                  'Utsu-P – GREATEST SHITS',
                  'Hoshi-kun – OC của Kikuo',
                  'Rolling Girl – wowaka',
                  'Ghost and Pals',
                  'Peace – CircusP',
                  'Osage-chan – OC của inabakumori & Nukunuku Nigirimeshi',
                  'Watashi no Heritage – iyowa',
                  'Darling Dance & Venom – Kairiki Bear',
                  'Mahou Shoujo to Chocolate – PinocchioP',
                  'Q – siinamota',
                  'Candy Addict Full Course – Machigerita',
                  'Magical Doctor – MARETU',
                  'Riliane Lucifen d’Autriche (Ác chi nương) – mothy',
                  'AaAaAaAAaAaAAa – nashimoto-P',
                  'MACHINEGUN POEM DOLL – cosMo@Bousou-P',
                ].map((item, idx) => (
                  <li key={idx}>・{item}</li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
      </Accordion>
    </CuteCard>
  )
}
