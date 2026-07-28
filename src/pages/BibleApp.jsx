import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Search, Sparkles, Bookmark, Moon, Sun, Trash2, Copy, Check } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { useBooks } from '../context/BooksContext'
import { getBookCoverImage } from '../data/imageMap'
import { lookupPassage, readChapter } from '../services/esv'

const content = {
    en: {
        title: 'Bible App',
        intro: 'This page now opens real Bible text from a live scripture source, with book and chapter browsing built in for deeper study.',
        lookupTitle: 'Live scripture lookup',
        lookupPlaceholder: 'Try John 3:16 or Genesis 1:1',
        lookupButton: 'Lookup',
        keywordSearch: 'Search saved bookmarks',
        keywordPlaceholder: 'Search your saved verses for words like "love", "faith", "prayer"...',
        chapterTitle: 'Read a full chapter',
        chapterPlaceholder: 'Search books',
        booksTitle: 'Bible books',
        booksIntro: 'Browse the main books of the Bible and open their detailed study pages.',
        noReference: 'Enter a verse reference to load the real scripture text.',
        loadingChapter: 'Loading chapter text...',
        chapterError: 'The chapter could not be loaded right now. Try a different reference or add a Bible API key.',
        lookupError: 'The Bible service could not load this reference right now. Add your ESV API token for live results.',
        bookmarks: 'Saved Bookmarks',
        noBookmarks: 'No bookmarks yet. Save your favorite verses!',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        removeBookmark: 'Remove',
        saveBookmark: 'Save bookmark',
        copyVerse: 'Copy'
    },
    ta: {
        title: 'பைபிள் ஆப்',
        intro: 'இந்தப் பக்கம் இப்போது நேரடி வேதவசனத் தரவிலிருந்து உண்மையான பைபிள் வாசகங்களைத் திறக்கிறது; ஆழமான ஆய்விற்கு புத்தகங்கள் மற்றும் அதிகாரங்களையும் உலாவ முடியும்.',
        lookupTitle: 'நேரடி வசனத் தேடல்',
        lookupPlaceholder: 'John 3:16 அல்லது Genesis 1:1 போன்றவற்றை முயற்சிக்கவும்',
        lookupButton: 'தேடு',
        keywordSearch: 'சேமிக்கப்பட்ட புக்மார்க்குகளில் தேடு',
        keywordPlaceholder: '"love", "faith", "prayer" போன்ற வார்த்தைகளை உங்கள் சேமித்த வசனங்களில் தேடுங்கள்...',
        chapterTitle: 'முழு அதிகாரம் வாசிக்கவும்',
        chapterPlaceholder: 'புத்தகங்களைத் தேடு',
        booksTitle: 'பைபிள் புத்தகங்கள்',
        booksIntro: 'பைபிளின் முக்கிய புத்தகங்களை உலாவி அவற்றின் விரிவான ஆய்வு பக்கங்களைத் திறக்கவும்.',
        noReference: 'உண்மையான வேதவசனங்களை ஏற்ற ஒரு வசன குறிப்பை உள்ளிடவும்.',
        loadingChapter: 'அதிகாரம் ஏற்றப்படுகிறது...',
        chapterError: 'இந்த அதிகாரம் இப்போது ஏற்றப்படவில்லை. வேறு குறிப்பு முயற்சிக்கவும் அல்லது பைபிள் API விசையைச் சேர்க்கவும்.',
        lookupError: 'இந்த குறிப்பு இப்போது ஏற்றப்படவில்லை. நேரடி முடிவுகளுக்கு உங்கள் ESV API டோக்கனை சேர்க்கவும்.',
        bookmarks: 'சேமிக்கப்பட்ட புக்மார்க்குகள்',
        noBookmarks: 'இன்னும் புக்மார்க்குகள் இல்லை. உங்கள் விருப்ப வசனங்களைச் சேமிக்கவும்!',
        darkMode: 'இருண்ட பயன்முறை',
        lightMode: 'ஒளி பயன்முறை',
        removeBookmark: 'அகற்று',
        saveBookmark: 'புக்மார்க் சேமி',
        copyVerse: 'நகல்'
    }
}

const decodeTamil = (text) => {
    if (!text || !text.includes('à')) return text
    try { return new TextDecoder().decode(Uint8Array.from(text, (char) => char.charCodeAt(0))) } catch { return text }
}

function BibleApp({ language = 'en' }) {
    const { books } = useBooks()
    const [searchParams] = useSearchParams()
    const copy = language === 'ta' ? Object.fromEntries(Object.entries(content.ta).map(([key, value]) => [key, decodeTamil(value)])) : content.en
    const [reference, setReference] = useState('John 3:16')
    const [search, setSearch] = useState('')
    
    const [selectedBook, setSelectedBook] = useState(() => {
        const bookParam = searchParams.get('book')
        if (bookParam) {
            const found = books.find(b => b.bookName.en.toLowerCase() === bookParam.toLowerCase() || b.bookName.ta === bookParam)
            if (found) return found.bookName.en
        }
        return books[0]?.bookName.en ?? 'Genesis'
    })
    
    const [selectedChapter, setSelectedChapter] = useState(() => {
        return searchParams.get('chapter') || '1'
    })
    
    const [result, setResult] = useState({
        reference: 'John 3:16',
        text: copy.noReference
    })
    const [chapterResult, setChapterResult] = useState({
        reference: 'Genesis 1',
        text: copy.loadingChapter
    })
    const [loading, setLoading] = useState(false)
    const [chapterLoading, setChapterLoading] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('bibleDarkMode') === 'true'
        }
        return true
    })
    const [bookmarks, setBookmarks] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('bibleBookmarks')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })
    const [copied, setCopied] = useState(null)
    const [keywordSearch, setKeywordSearch] = useState('')
    const [keywordResults, setKeywordResults] = useState([])

    const filteredBooks = useMemo(() => {
        const query = search.toLowerCase().trim()
        if (!query) return books
        return books.filter((book) => `${book.bookName.en} ${book.bookName.ta} ${book.introduction.en} ${book.introduction.ta}`.toLowerCase().includes(query))
    }, [search, books])

    // Sync state if search params change (e.g. clicking different chapters)
    useEffect(() => {
        const bookParam = searchParams.get('book')
        const chapterParam = searchParams.get('chapter')
        if (bookParam) {
            const found = books.find(b => b.bookName.en.toLowerCase() === bookParam.toLowerCase() || b.bookName.ta === bookParam)
            if (found) {
                setSelectedBook(found.bookName.en)
            }
        }
        if (chapterParam) {
            setSelectedChapter(chapterParam)
        }
    }, [searchParams, books])

    // Save bookmarks to localStorage
    useEffect(() => {
        localStorage.setItem('bibleBookmarks', JSON.stringify(bookmarks))
    }, [bookmarks])

    // Save dark mode preference to localStorage
    useEffect(() => {
        localStorage.setItem('bibleDarkMode', isDarkMode.toString())
    }, [isDarkMode])

    const activeBook = books.find((book) => book.bookName.en === selectedBook) || books[0]
    const chapterOptions = Array.from({ length: activeBook.chapters }, (_, index) => String(index + 1))

    useEffect(() => {
        const loadChapter = async () => {
            setChapterLoading(true)
            try {
                const passage = await readChapter(activeBook.bookName.en, selectedChapter, language)
                setChapterResult(passage)
            } catch {
                setChapterResult({
                    reference: `${activeBook.bookName.en} ${selectedChapter}`,
                    text: copy.chapterError
                })
            } finally {
                setChapterLoading(false)
            }
        }

        void loadChapter()
    }, [activeBook.bookName.en, selectedChapter, copy.chapterError, language])

    const handleLookup = async () => {
        if (!reference.trim()) return
        setLoading(true)
        try {
            const passage = await lookupPassage(reference, language)
            setResult(passage)
        } catch {
            setResult({
                reference: reference.trim(),
                text: copy.lookupError
            })
        } finally {
            setLoading(false)
        }
    }

    const addBookmark = () => {
        const newBookmark = { id: Date.now(), reference: result.reference, text: result.text }
        setBookmarks([...bookmarks, newBookmark])
    }

    const removeBookmark = (id) => {
        setBookmarks(bookmarks.filter(b => b.id !== id))
    }

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    const handleKeywordSearch = async () => {
        if (!keywordSearch.trim()) {
            setKeywordResults([])
            return
        }
        // Search through bookmarks for matching keywords
        const keyword = keywordSearch.toLowerCase()
        const matches = bookmarks.filter(b =>
            b.text.toLowerCase().includes(keyword) || b.reference.toLowerCase().includes(keyword)
        )
        setKeywordResults(matches)
    }

    return (
        <main className={`min-h-screen ${isDarkMode ? 'bg-[#0b0d12] text-[#f7f1e6]' : 'bg-[#f6f3ed] text-[#231b14]'}`}>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
                <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className={`overflow-hidden rounded-[2rem] border ${isDarkMode ? 'border-white/10 bg-[#151923]' : 'border-[#d9cbb7] bg-white'} p-6 shadow-2xl sm:p-10`}>
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#c9964f]">Personal study space</p>
                            <h1 className="font-[Times_New_Roman,serif] text-4xl sm:text-6xl">{copy.title}</h1>
                            <p className={`mt-4 max-w-2xl text-base leading-7 ${isDarkMode ? 'text-[#bfc4cf]' : 'text-[#6b6256]'}`}>{copy.intro}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <span className={`rounded-full border px-4 py-2 text-sm ${isDarkMode ? 'border-white/10 bg-white/5 text-[#e5c182]' : 'border-[#e1c790] bg-[#fffaf0] text-[#8a5a20]'}`}>66 books</span>
                            <span className={`rounded-full border px-4 py-2 text-sm ${isDarkMode ? 'border-white/10 bg-white/5 text-[#e5c182]' : 'border-[#e1c790] bg-[#fffaf0] text-[#8a5a20]'}`}>{bookmarks.length} saved</span>
                            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`rounded-full border p-2.5 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#f5cf84]' : 'border-[#e1c790] bg-[#fffaf0] text-[#8a5a20]'}`} aria-label="Toggle color mode">{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
                        </div>
                    </div>
                </motion.header>

                <section className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.5fr]">
                    <aside className={`rounded-[2rem] border p-5 ${isDarkMode ? 'border-white/10 bg-[#151923]' : 'border-[#d9cbb7] bg-white'}`}>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9964f]">Open a chapter</p>
                        <h2 className="mt-2 font-[Times_New_Roman,serif] text-3xl">Read Scripture</h2>
                        <div className="mt-6 space-y-3">
                            <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDarkMode ? 'border-white/10 bg-[#0e1118] text-white' : 'border-[#ded1bd] bg-[#fffdf9]'}`}>{books.map((book) => <option key={book.id} value={book.bookName.en}>{language === 'ta' ? decodeTamil(book.bookName.ta) : book.bookName.en}</option>)}</select>
                            <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDarkMode ? 'border-white/10 bg-[#0e1118] text-white' : 'border-[#ded1bd] bg-[#fffdf9]'}`}>{chapterOptions.map((chapter) => <option key={chapter} value={chapter}>Chapter {chapter}</option>)}</select>
                        </div>
                        <div className={`mt-6 overflow-hidden rounded-2xl ${isDarkMode ? 'bg-[#0e1118]' : 'bg-[#f8f2e8]'}`}>
                            <img src={getBookCoverImage(activeBook.bookName.en)} alt="" className="h-36 w-full object-cover opacity-75" />
                            <div className="p-4"><p className="font-[Times_New_Roman,serif] text-2xl">{activeBook.bookName[language]}</p><p className={`mt-1 text-sm ${isDarkMode ? 'text-[#aeb5c3]' : 'text-[#766b5d]'}`}>{activeBook.chapters} chapters</p></div>
                        </div>
                    </aside>

                    <article className={`rounded-[2rem] border p-6 sm:p-9 ${isDarkMode ? 'border-white/10 bg-[#151923]' : 'border-[#d9cbb7] bg-white'}`}>
                        <div className="flex items-start justify-between gap-4 border-b pb-5 border-[#c9964f]/25"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9964f]">Now reading</p><h2 className="mt-2 font-[Times_New_Roman,serif] text-3xl sm:text-4xl">{chapterLoading ? copy.loadingChapter : chapterResult.reference}</h2></div><BookOpen className="text-[#c9964f]" size={26} /></div>
                        <p className={`mt-7 whitespace-pre-wrap font-[Georgia,serif] text-lg leading-9 ${isDarkMode ? 'text-[#e0e3e9]' : 'text-[#443a31]'}`}>{chapterResult.text}</p>
                    </article>
                </section>

                <section className={`mt-6 rounded-[2rem] border p-6 sm:p-8 ${isDarkMode ? 'border-white/10 bg-[#151923]' : 'border-[#d9cbb7] bg-white'}`}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9964f]">Passage finder</p><h2 className="mt-2 font-[Times_New_Roman,serif] text-3xl">Find a verse</h2></div><div className="flex w-full max-w-xl gap-2"><input value={reference} onChange={(e) => setReference(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLookup()} placeholder={copy.lookupPlaceholder} className={`min-w-0 flex-1 rounded-2xl border px-4 py-3 outline-none ${isDarkMode ? 'border-white/10 bg-[#0e1118] text-white' : 'border-[#ded1bd] bg-[#fffdf9]'}`} /><button onClick={handleLookup} className="rounded-2xl bg-[#b87b2d] px-5 py-3 font-semibold text-white">{loading ? '...' : copy.lookupButton}</button></div></div>
                    <div className={`mt-5 rounded-2xl p-5 ${isDarkMode ? 'bg-[#0e1118]' : 'bg-[#f8f2e8]'}`}><div className="mb-3 flex justify-between gap-3"><strong className="text-[#c9964f]">{result.reference}</strong><button onClick={addBookmark} className="text-sm text-[#c9964f]"><Bookmark size={15} className="inline" /> Save</button></div><p className="whitespace-pre-wrap leading-8">{result.text}</p></div>
                </section>

                <section className="mt-10"><div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9964f]">Explore</p><h2 className="mt-2 font-[Times_New_Roman,serif] text-3xl">Bible library</h2></div><label className={`flex items-center gap-2 rounded-2xl border px-4 py-3 ${isDarkMode ? 'border-white/10 bg-[#151923]' : 'border-[#d9cbb7] bg-white'}`}><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books" className="w-56 bg-transparent outline-none" /></label></div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredBooks.map((book, index) => <motion.div key={book.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * 0.02, 0.2) }}><Link to={`/books/${book.id}`} className={`group block overflow-hidden rounded-[1.5rem] border ${isDarkMode ? 'border-white/10 bg-[#151923]' : 'border-[#d9cbb7] bg-white'}`}><img src={getBookCoverImage(book.bookName.en)} alt="" loading="lazy" decoding="async" className="h-32 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-4"><p className="text-xs uppercase tracking-[0.2em] text-[#c9964f]">{book.testament}</p><h3 className="mt-2 font-[Times_New_Roman,serif] text-2xl">{book.bookName[language]}</h3><p className={`mt-2 text-sm ${isDarkMode ? 'text-[#aeb5c3]' : 'text-[#766b5d]'}`}>{book.chapters} chapters</p></div></Link></motion.div>)}</div>
                </section>
            </div>
        </main>
    )
}

export default BibleApp