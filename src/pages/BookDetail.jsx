import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, BookOpen, Clock3, Compass, MapPin, Sparkles, Users } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useBooks } from '../context/BooksContext'
import { getBookCoverImage } from '../data/imageMap'

const MotionLink = motion.create(Link)

function BookDetail({ language }) {
    const { id } = useParams()
    const { books } = useBooks()
    const book = books.find((item) => item.id === id)

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
                    <img src={getBookCoverImage(book.bookName.en)} alt={book.bookName[language]} loading="lazy" className="h-full min-h-[280px] w-full object-cover sm:min-h-[320px]" />
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
                        <div className="mt-4 rounded-2xl border border-[#7c4f24]/50 bg-[#140e0a]/80 p-4">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 text-[#f3d28b]"><ArrowUpRight size={16} /> {language === 'en' ? 'Pinterest inspiration' : 'பின்டரஸ்ட் ஈர்ப்பு'}</div>
                                <a
                                    href={`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(book.bookName[language])}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 rounded-full border border-[#d6a84f]/40 bg-[#24130a] px-3 py-2 text-sm text-[#fff3cf] transition hover:bg-[#2b180f]"
                                >
                                    {language === 'en' ? 'Search' : 'தேட'} <ArrowUpRight size={14} />
                                </a>
                            </div>
                            <p className="text-sm leading-6 text-[#d8c39b]">{language === 'en' ? 'Explore Pinterest for related artwork and devotional images for this book.' : 'இந்த புத்தகத்திற்கு தொடர்புடைய கலைப்படங்கள் மற்றும் பக்தி படங்களை பின்டரஸ்ட்டில் ஆராயுங்கள்.'}</p>
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
                <h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{language === 'en' ? 'Read the chapters' : '\u0b85\u0ba4\u0bbf\u0b95\u0bbe\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0bb5\u0bbe\u0b9a\u0bbf\u0baf\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd'}</h2>
                <p className="mt-3 max-w-3xl leading-7 text-[#d8c39b]">{language === 'en' ? 'Open the Bible reader to load the actual Scripture text for a chapter. This page no longer shows generated chapter summaries.' : '\u0bb5\u0bc7\u0ba4\u0bbe\u0b95\u0bae \u0bb5\u0b9a\u0ba9\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0bb5\u0b9a\u0bbf\u0b95\u0bcd\u0b95 \u0baa\u0bc8\u0baa\u0bbf\u0bb3\u0bcd \u0bb0\u0bc0\u0b9f\u0bb0\u0bc8\u0ba4\u0bcd \u0ba4\u0bbf\u0bb1\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd.'}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {book.chaptersData.map((chapter) => (
                        <MotionLink
                            key={chapter.chapterNumber}
                            to={`/bible-app?book=${encodeURIComponent(book.bookName.en)}&chapter=${chapter.chapterNumber}`}
                            className="group relative isolate min-h-24 overflow-hidden rounded-2xl border border-[#7c4f24]/60 bg-[#1b1209] p-4 text-sm text-[#f3d28b] transition hover:-translate-y-0.5 hover:border-[#f0c66d] hover:text-[#fff2c8]"
                        >
                            <img
                                src={getBookCoverImage(book.bookName.en)}
                                alt=""
                                loading="lazy"
                                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35 transition duration-500 group-hover:scale-110 group-hover:opacity-55"
                            />
                            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#140e0a]/95 via-[#140e0a]/75 to-[#140e0a]/45" />
                            <span className="inline-flex rounded-full border border-[#d6a84f]/45 bg-[#1b1209]/80 px-3 py-1.5 font-medium shadow-sm">
                                {language === 'en' ? `Chapter ${chapter.chapterNumber}` : `\u0b85\u0ba4\u0bbf\u0b95\u0bbe\u0bb0\u0bae\u0bcd ${chapter.chapterNumber}`}
                            </span>
                        </MotionLink>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BookDetail
