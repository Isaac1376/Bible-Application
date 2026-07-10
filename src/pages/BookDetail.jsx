import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock3, Compass, MapPin, Sparkles, Users } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { initialBooks } from '../data/expandedBooks'

function BookDetail({ language }) {
    const { id } = useParams()
    const book = initialBooks.find((item) => item.id === id)

    if (!book) {
        return (
            <div className="rounded-[1.5rem] border border-[#8b5623]/40 bg-[#140f09]/90 p-8 text-center text-[#f0c66d]">
                <h1 className="font-[Times_New_Roman,serif] text-3xl">{language === 'en' ? 'Book not found' : 'புத்தகம் கிடைக்கவில்லை'}</h1>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <Link to="/books" className="inline-flex items-center gap-2 text-sm text-[#f3d28b] hover:text-[#fff4cb]">
                <ArrowLeft size={16} /> {language === 'en' ? 'Back to books' : 'புத்தகங்களுக்குத் திரும்பு'}
            </Link>

            <section className="overflow-hidden rounded-[2rem] border border-[#9d6c2a]/40 bg-[#180e08]/90 shadow-[0_0_80px_rgba(196,132,35,0.2)]">
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <img src={book.coverImage} alt={book.bookName[language]} loading="lazy" className="h-full min-h-[280px] w-full object-cover sm:min-h-[320px]" />
                    <div className="p-8 sm:p-10">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6a84f]/40 bg-[#24130a] px-3 py-2 text-sm text-[#f0c66d]">
                            <Sparkles size={15} /> {book.testament}
                        </div>
                        <h1 className="mb-4 font-[Times_New_Roman,serif] text-4xl text-[#fff3cf] sm:text-5xl">{book.bookName[language]}</h1>
                        <p className="mb-6 text-lg leading-8 text-[#e1cda6]">{book.introduction[language]}</p>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-[#7c4f24]/50 bg-[#140e0a]/80 p-4">
                                <div className="mb-2 flex items-center gap-2 text-[#f3d28b]"><Users size={16} /> {language === 'en' ? 'Author' : 'ஆசிரியர்'}</div>
                                <p className="text-[#fef3cf]">{book.author[language]}</p>
                            </div>
                            <div className="rounded-2xl border border-[#7c4f24]/50 bg-[#140e0a]/80 p-4">
                                <div className="mb-2 flex items-center gap-2 text-[#f3d28b]"><Clock3 size={16} /> {language === 'en' ? 'Date' : 'தேதி'}</div>
                                <p className="text-[#fef3cf]">{book.dateWritten}</p>
                            </div>
                            <div className="rounded-2xl border border-[#7c4f24]/50 bg-[#140e0a]/80 p-4">
                                <div className="mb-2 flex items-center gap-2 text-[#f3d28b]"><MapPin size={16} /> {language === 'en' ? 'Location' : 'இடம்'}</div>
                                <p className="text-[#fef3cf]">{book.locationWritten}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
                {[
                    { title: { en: 'About the Book', ta: 'புத்தகத்தைப் பற்றி' }, text: book.about[language], icon: BookOpen },
                    { title: { en: 'Historical Background', ta: 'வரலாற்றுப் பின்னணி' }, text: book.historicalBackground[language], icon: Compass }
                ].map((card, index) => (
                    <motion.article key={card.title.en} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[1.5rem] border border-[#7f5128]/40 bg-[#140f09]/90 p-6 shadow-[0_0_32px_rgba(173,117,36,0.14)]">
                        <div className="mb-4 flex items-center gap-3 text-[#f3d28b]"><card.icon size={18} /> <h2 className="font-[Times_New_Roman,serif] text-2xl text-[#ffeec5]">{card.title[language]}</h2></div>
                        <p className="leading-8 text-[#d8c39b]">{card.text}</p>
                    </motion.article>
                ))}
            </div>

            <section className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                <h2 className="mb-5 font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{language === 'en' ? 'Chapter insights' : 'அதிகாரத் தெளிவு'}</h2>
                <div className="space-y-4">
                    {book.chaptersData.map((chapter) => (
                        <div key={chapter.chapterNumber} className="rounded-[1.2rem] border border-[#784b1e]/40 bg-[#1b1209] p-4 sm:p-5">
                            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <h3 className="font-[Times_New_Roman,serif] text-xl text-[#ffe5ae]">{language === 'en' ? `Chapter ${chapter.chapterNumber}` : `அதிகாரம் ${chapter.chapterNumber}`} · {chapter.title[language]}</h3>
                                <span className="text-sm text-[#e0b969]">{book.bookName[language]}</span>
                            </div>
                            <p className="mb-3 leading-8 text-[#d7c39b]">{chapter.description[language]}</p>
                            <p className="rounded-2xl border border-[#6c4320]/50 bg-[#120c07] p-4 text-sm leading-7 text-[#f2d79f]">{chapter.explanation[language]}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {chapter.images.map((image) => <img key={image} src={image} alt={chapter.title[language]} className="h-24 w-32 rounded-xl object-cover" />)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BookDetail
