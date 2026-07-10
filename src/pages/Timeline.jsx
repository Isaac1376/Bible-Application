import { motion } from 'framer-motion'
import { Compass, Sparkles } from 'lucide-react'
import { initialBooks } from '../data/expandedBooks'

const imagePrompts = [
    { title: 'Creation scene', prompt: 'A cinematic depiction of the first day of creation, with light breaking over a vast, radiant earth.' },
    { title: 'Noah’s Ark', prompt: 'A dramatic biblical illustration of Noah’s ark on rising waters under a stormy sky.' },
    { title: 'Abraham journey', prompt: 'A sweeping, symbolic scene of Abraham traveling through the desert under God’s promise.' },
    { title: 'Moses crossing Red Sea', prompt: 'A powerful image of Moses leading the people through the parted Red Sea at dawn.' },
    { title: 'Jesus ministry', prompt: 'A reverent, illuminated portrait of Jesus teaching and healing in a first-century landscape.' }
]

function Timeline({ language }) {
    return (
        <div className="space-y-8">
            <div className="rounded-[2rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-6 shadow-[0_0_60px_rgba(179,125,40,0.16)] sm:p-8">
                <div className="flex items-center gap-3 text-[#f0c66d]">
                    <Compass size={20} />
                    <h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2c8] sm:text-4xl">{language === 'en' ? 'Complete chronology' : 'முழுமையான காலவரிசை'}</h1>
                </div>
                <p className="mt-3 max-w-3xl text-[#dac8a2]">{language === 'en' ? 'A curated timeline showcasing the flow from Genesis to Acts with a cinematic, study-friendly layout.' : 'ஆதியாகமத்திலிருந்து அப்போஸ்தலர் பணிகள் வரை, ஆய்வு செய்ய வசதியான சினிமா போன்ற அமைப்பில் காலவரிசை காட்டப்படுகிறது.'}</p>
            </div>

            <section className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                <div className="mb-4 flex items-center gap-3 text-[#f0c66d]">
                    <Sparkles size={18} />
                    <h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{language === 'en' ? 'Timeline image prompts' : 'காலவரிசை படத் தூண்டுதல்கள்'}</h2>
                </div>
                <p className="mb-5 max-w-3xl text-[#d8c39b]">{language === 'en' ? 'Use these prompts with DALL·E, Stable Diffusion, or Midjourney to generate visual scenes for the major moments in Scripture.' : 'சிருஷ்டி முதல் இயேசு ஊழியம் வரை முக்கிய தருணங்களுக்கான காட்சிகளை உருவாக்க DALL·E, Stable Diffusion அல்லது Midjourney உடன் இத்தூண்டுதல்களை பயன்படுத்தவும்.'}</p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {imagePrompts.map((item) => (
                        <div key={item.title} className="rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4">
                            <p className="font-semibold text-[#ffe5ae]">{item.title}</p>
                            <p className="mt-2 text-sm leading-7 text-[#d8c39b]">{item.prompt}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="relative space-y-6 border-l-2 border-[#8a5b2c]/60 pl-6">
                {initialBooks.map((book, index) => (
                    <motion.div key={book.id} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} className="relative rounded-[1.4rem] border border-[#85511e]/40 bg-[#140f09]/90 p-6 shadow-[0_0_32px_rgba(173,117,36,0.14)]">
                        <div className="absolute -left-[1.46rem] top-7 h-4 w-4 rounded-full border-4 border-[#14110c] bg-[#f1c566]" />
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-[#d6a84f]/40 bg-[#24130a] px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#f0c66d]">{book.testament}</span>
                            <span className="text-sm text-[#e0c081]">{book.dateWritten}</span>
                        </div>
                        <h2 className="mb-2 font-[Times_New_Roman,serif] text-2xl text-[#fff2cb]">{book.bookName[language]}</h2>
                        <p className="mb-4 leading-8 text-[#d8c39b]">{book.introduction[language]}</p>
                        <div className="flex flex-wrap gap-2">
                            {book.keyThemes.map((theme) => <span key={theme} className="rounded-full border border-[#6c4320]/50 bg-[#1d120b] px-3 py-1 text-xs text-[#f6deaf]">{theme}</span>)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Timeline
