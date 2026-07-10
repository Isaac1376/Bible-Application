import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { initialBooks } from '../data/expandedBooks'

function Books({ language }) {
    return (
        <div className="space-y-8">
            <div className="rounded-[2rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-6 shadow-[0_0_60px_rgba(179,125,40,0.16)] sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#e2b76a]">{language === 'en' ? 'Bible books' : 'பைபிள் புத்தகங்கள்'}</p>
                        <h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff1c7] sm:text-4xl">{language === 'en' ? 'Explore every book in the timeline' : 'காலவரிசையில் ஒவ்வொரு புத்தகத்தையும் ஆராயுங்கள்'}</h1>
                    </div>
                    <div className="rounded-full border border-[#d6a84f]/40 bg-[#23140b] px-4 py-2 text-sm text-[#f0c66d]">{initialBooks.length} {language === 'en' ? 'books' : 'புத்தகங்கள்'}</div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {initialBooks.map((book, index) => (
                    <motion.article key={book.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6, scale: 1.01 }} className="group overflow-hidden rounded-[1.6rem] border border-[#8d5722]/40 bg-[#140f09]/90 shadow-[0_0_40px_rgba(179,121,36,0.16)]">
                        <img src={book.coverImage} alt={book.bookName[language]} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
                        <div className="p-6">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="rounded-full border border-[#d6a84f]/40 bg-[#24130a] px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#f0c66d]">{book.testament}</span>
                                <span className="flex items-center gap-2 text-sm text-[#d8bf86]"><Clock3 size={14} /> {book.chapters} {language === 'en' ? 'chapters' : 'அதிகாரங்கள்'}</span>
                            </div>
                            <h2 className="mb-3 font-[Times_New_Roman,serif] text-2xl text-[#fff4d1]">{book.bookName[language]}</h2>
                            <p className="mb-5 text-sm leading-7 text-[#d6c09b]">{book.introduction[language]}</p>
                            <div className="mb-5 flex flex-wrap gap-2">
                                {book.keyThemes.slice(0, 3).map((theme) => (
                                    <span key={theme} className="rounded-full border border-[#6c4320]/50 bg-[#1d120b] px-3 py-1 text-xs text-[#f5deb1]">{theme}</span>
                                ))}
                            </div>
                            <Link to={`/books/${book.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffd36b] transition hover:text-[#fff3c4]">
                                {language === 'en' ? 'View details' : 'விவரங்களைப் பார்க்க'} <ArrowRight size={15} />
                            </Link>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    )
}

export default Books
