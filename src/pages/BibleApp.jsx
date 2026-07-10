import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { initialBooks } from '../data/expandedBooks'
import { lookupPassage, readChapter } from '../services/esv'

function BibleApp() {
    const [reference, setReference] = useState('John 3:16')
    const [search, setSearch] = useState('')
    const [selectedBook, setSelectedBook] = useState(initialBooks[0].bookName.en)
    const [selectedChapter, setSelectedChapter] = useState('1')
    const [result, setResult] = useState({
        reference: 'John 3:16',
        text: 'Enter a verse reference to load the real scripture text.'
    })
    const [chapterResult, setChapterResult] = useState({
        reference: 'Genesis 1',
        text: 'Loading chapter text...'
    })
    const [loading, setLoading] = useState(false)
    const [chapterLoading, setChapterLoading] = useState(false)

    const filteredBooks = useMemo(() => {
        const query = search.toLowerCase().trim()
        if (!query) return initialBooks
        return initialBooks.filter((book) => `${book.bookName.en} ${book.bookName.ta} ${book.introduction.en}`.toLowerCase().includes(query))
    }, [search])

    const activeBook = initialBooks.find((book) => book.bookName.en === selectedBook) || initialBooks[0]
    const chapterOptions = Array.from({ length: activeBook.chapters }, (_, index) => String(index + 1))

    useEffect(() => {
        const loadChapter = async () => {
            setChapterLoading(true)
            try {
                const passage = await readChapter(activeBook.bookName.en, selectedChapter)
                setChapterResult(passage)
            } catch {
                setChapterResult({
                    reference: `${activeBook.bookName.en} ${selectedChapter}`,
                    text: 'The chapter could not be loaded right now. Try a different reference or add a Bible API key.'
                })
            } finally {
                setChapterLoading(false)
            }
        }

        void loadChapter()
    }, [activeBook.bookName.en, selectedChapter])

    const handleLookup = async () => {
        if (!reference.trim()) return
        setLoading(true)
        try {
            const passage = await lookupPassage(reference)
            setResult(passage)
        } catch {
            setResult({
                reference: reference.trim(),
                text: 'The Bible service could not load this reference right now. Add your ESV API token for live results.'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-8 shadow-[0_0_70px_rgba(179,125,40,0.16)] sm:p-10">
                <div className="mb-4 flex items-center gap-3 text-[#f0c66d]">
                    <BookOpen size={22} />
                    <h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2c8] sm:text-4xl">Bible App</h1>
                </div>
                <p className="max-w-3xl text-lg leading-8 text-[#d8c39b]">
                    This page now opens real Bible text from a live scripture source, with book and chapter browsing built in for deeper study.
                </p>
            </motion.section>

            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                    <div className="mb-4 flex items-center gap-3 text-[#f0c66d]">
                        <Search size={18} />
                        <h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">Live scripture lookup</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input value={reference} onChange={(e) => setReference(e.target.value)} className="flex-1 rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" placeholder="Try John 3:16 or Genesis 1:1" />
                        <button onClick={handleLookup} className="rounded-full border border-[#f0c66d] bg-[#b07c22] px-4 py-3 font-semibold text-[#fff7df]">
                            {loading ? 'Loading...' : 'Lookup'}
                        </button>
                    </div>
                    <div className="mt-4 rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4 text-sm leading-7 text-[#d8c39b]">
                        <p className="mb-2 font-semibold uppercase tracking-[0.2em] text-[#f0c66d]">{result.reference}</p>
                        <p className="whitespace-pre-wrap">{result.text}</p>
                    </div>
                </motion.article>

                <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                    <div className="mb-4 flex items-center gap-3 text-[#f0c66d]">
                        <Sparkles size={18} />
                        <h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">Read a full chapter</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} className="rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]">
                            {initialBooks.map((book) => (
                                <option key={book.id} value={book.bookName.en}>{book.bookName.en}</option>
                            ))}
                        </select>
                        <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className="rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]">
                            {chapterOptions.map((chapter) => (
                                <option key={chapter} value={chapter}>Chapter {chapter}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4 rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4 text-sm leading-7 text-[#d8c39b]">
                        <p className="mb-2 font-semibold uppercase tracking-[0.2em] text-[#f0c66d]">{chapterLoading ? 'Loading chapter...' : chapterResult.reference}</p>
                        <p className="whitespace-pre-wrap">{chapterResult.text}</p>
                    </div>
                </motion.article>
            </section>

            <section className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">Bible books</h2>
                        <p className="mt-2 text-[#d8c39b]">Browse the main books of the Bible and open their detailed study pages.</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-3 py-2">
                        <Search size={16} className="text-[#f0c66d]" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent text-sm text-[#fff7df] outline-none sm:w-56" placeholder="Search books" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <Link key={book.id} to={`/books/${book.id}`} className="rounded-[1.2rem] border border-[#6c4320]/50 bg-[#1b1209] p-4 transition hover:border-[#f0c66d] hover:translate-y-[-2px]">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="rounded-full border border-[#d6a84f]/40 bg-[#24130a] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#f0c66d]">{book.testament}</span>
                                <span className="text-sm text-[#e0c081]">{book.chapters} ch.</span>
                            </div>
                            <h3 className="font-[Times_New_Roman,serif] text-xl text-[#fff2c8]">{book.bookName.en}</h3>
                            <p className="mt-2 text-sm text-[#d8c39b]">{book.introduction.en}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BibleApp
