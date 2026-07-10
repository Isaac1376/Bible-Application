import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Search, Sparkles, Bookmark, Moon, Sun, Trash2, Copy, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { initialBooks } from '../data/expandedBooks'
import { lookupPassage, readChapter } from '../services/esv'

const content = {
    en: {
        title: 'Bible App',
        intro: 'This page now opens real Bible text from a live scripture source, with book and chapter browsing built in for deeper study.',
        lookupTitle: 'Live scripture lookup',
        lookupPlaceholder: 'Try John 3:16 or Genesis 1:1',
        lookupButton: 'Lookup',
        keywordSearch: 'Search by keyword',
        keywordPlaceholder: 'Search for words like "love", "faith", "prayer"...',
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
        copyVerse: 'Copy'
    },
    ta: {
        title: 'பைபிள் ஆப்',
        intro: 'இந்தப் பக்கம் இப்போது நேரடி வேதவசனத் தரவிலிருந்து உண்மையான பைபிள் வாசகங்களைத் திறக்கிறது; ஆழமான ஆய்விற்கு புத்தகங்கள் மற்றும் அதிகாரங்களையும் உலாவ முடியும்.',
        lookupTitle: 'நேரடி வசனத் தேடல்',
        lookupPlaceholder: 'John 3:16 அல்லது Genesis 1:1 போன்றவற்றை முயற்சிக்கவும்',
        lookupButton: 'தேடு',
        keywordSearch: 'குறிப்பை வார்த்தையால் தேடு',
        keywordPlaceholder: '"love", "faith", "prayer" போன்ற வார்த்தைகளைத் தேடு...',
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
        copyVerse: 'நகல்'
    }
}

function BibleApp({ language = 'en' }) {
    const copy = content[language]
    const [reference, setReference] = useState(language === 'en' ? 'John 3:16' : 'யோவான் 3:16')
    const [search, setSearch] = useState('')
    const [selectedBook, setSelectedBook] = useState(initialBooks[0].bookName.en)
    const [selectedChapter, setSelectedChapter] = useState('1')
    const [result, setResult] = useState({
        reference: language === 'en' ? 'John 3:16' : 'யோவான் 3:16',
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
        if (!query) return initialBooks
        return initialBooks.filter((book) => `${book.bookName.en} ${book.bookName.ta} ${book.introduction.en} ${book.introduction.ta}`.toLowerCase().includes(query))
    }, [search])

    // Save bookmarks to localStorage
    useEffect(() => {
        localStorage.setItem('bibleBookmarks', JSON.stringify(bookmarks))
    }, [bookmarks])

    // Save dark mode preference to localStorage
    useEffect(() => {
        localStorage.setItem('bibleDarkMode', isDarkMode.toString())
    }, [isDarkMode])

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
                    text: copy.chapterError
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`min-h-screen ${isDarkMode ? 'bg-[#0a0605] text-white' : 'bg-[#f5f1e8] text-[#1a0f0a]'}`}>
            <div className="relative">
                {/* Background frame with curved edges */}
                <motion.div animate={{ borderColor: isDarkMode ? ['rgba(240,198,109,0.2)', 'rgba(255,240,180,0.4)', 'rgba(240,198,109,0.2)'] : ['rgba(212,165,116,0.2)', 'rgba(240,198,109,0.3)', 'rgba(212,165,116,0.2)'] }} transition={{ duration: 4, repeat: Infinity }} className={`absolute inset-0 rounded-3xl border-2 m-4 pointer-events-none ${isDarkMode ? 'border-[#f0c66d]/30' : 'border-[#d4a574]/30'}`} />

                <div className="relative space-y-8 p-4">
                    {/* Dark Mode Toggle */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`rounded-full p-3 transition ${isDarkMode ? 'bg-[#1b1209] text-[#f0c66d]' : 'bg-[#e8dcc8] text-[#b07c22]'}`}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Header */}
                    <motion.section initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }} className={`relative overflow-hidden rounded-3xl border-2 ${isDarkMode ? 'border-[#f0c66d]/70 bg-[#180e08]/90' : 'border-[#d4a574]/70 bg-[#fff5e6]/90'} p-8 shadow-[0_0_100px_rgba(179,125,40,0.3)] sm:p-10`}>
                        <motion.div animate={{ borderColor: isDarkMode ? ['rgba(240,198,109,0.4)', 'rgba(255,240,180,0.8)', 'rgba(240,198,109,0.4)'] : ['rgba(212,165,116,0.4)', 'rgba(240,198,109,0.6)', 'rgba(212,165,116,0.4)'] }} transition={{ duration: 3, repeat: Infinity }} className={`pointer-events-none absolute inset-0 rounded-3xl border-2 ${isDarkMode ? 'border-[#f4d178]/50' : 'border-[#e0c08a]/40'}`} />
                        <div className={`pointer-events-none absolute inset-0 rounded-3xl ${isDarkMode ? 'bg-[radial-gradient(circle_at_top_left,_rgba(255,221,120,0.24),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,187,45,0.18),_transparent_40%)]' : 'bg-[radial-gradient(circle_at_top_left,_rgba(240,198,109,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,187,45,0.12),_transparent_40%)]'}`} />
                        <div className={`pointer-events-none absolute inset-0 animate-[pulse_3s_ease-in-out_infinite] opacity-70 ${isDarkMode ? '[background-image:linear-gradient(110deg,transparent_0%,rgba(255,240,180,0.16)_45%,transparent_90%)]' : '[background-image:linear-gradient(110deg,transparent_0%,rgba(240,198,109,0.12)_45%,transparent_90%)]'} [background-size:220%_220%]`} />
                        <div className={`mb-4 flex items-center gap-3 ${isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'}`}>
                            <BookOpen size={22} />
                            <h1 className={`font-[Times_New_Roman,serif] text-3xl ${isDarkMode ? 'text-[#fff2c8]' : 'text-[#4a2c15]'} sm:text-4xl`}>{copy.title}</h1>
                        </div>
                        <p className={`max-w-3xl text-lg leading-8 ${isDarkMode ? 'text-[#d8c39b]' : 'text-[#6b4d32]'}`}>{copy.intro}</p>
                    </motion.section>

                    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                        <motion.article initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} className={`relative overflow-hidden rounded-3xl border-2 ${isDarkMode ? 'border-[#f0c66d]/60 bg-[#140f09]/90' : 'border-[#d4a574]/60 bg-[#fff9f0]/90'} p-6 shadow-[0_0_60px_rgba(173,117,36,0.2)]`}>
                            <motion.div animate={{ borderColor: isDarkMode ? ['rgba(245,214,129,0.3)', 'rgba(240,198,109,0.6)', 'rgba(245,214,129,0.3)'] : ['rgba(224,192,138,0.3)', 'rgba(212,165,116,0.5)', 'rgba(224,192,138,0.3)'] }} transition={{ duration: 3, repeat: Infinity }} className={`pointer-events-none absolute inset-0 rounded-3xl border-2 ${isDarkMode ? 'border-[#f5d681]/40' : 'border-[#e0c08a]/30'}`} />
                            <div className={`pointer-events-none absolute inset-0 animate-[pulse_4s_ease-in-out_infinite] opacity-50 ${isDarkMode ? '[background-image:linear-gradient(120deg,transparent_0%,rgba(255,229,144,0.14)_48%,transparent_100%)]' : '[background-image:linear-gradient(120deg,transparent_0%,rgba(240,198,109,0.10)_48%,transparent_100%)]'} [background-size:200%_200%]`} />
                            <div className={`mb-4 flex items-center gap-3 ${isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'}`}>
                                <Search size={18} />
                                <h2 className={`font-[Times_New_Roman,serif] text-2xl ${isDarkMode ? 'text-[#fff2c8]' : 'text-[#4a2c15]'}`}>{copy.lookupTitle}</h2>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input value={reference} onChange={(e) => setReference(e.target.value)} className={`flex-1 rounded-3xl border ${isDarkMode ? 'border-[#7f5128]/50 bg-[#120c07] text-[#fff7df]' : 'border-[#d4a574]/50 bg-[#fffcf7] text-[#4a2c15]'} px-4 py-3 transition focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#f0c66d]/50' : 'focus:ring-[#d4a574]/50'}`} placeholder={copy.lookupPlaceholder} />
                                <button onClick={handleLookup} className={`rounded-full border-2 ${isDarkMode ? 'border-[#f0c66d] bg-[#b07c22] text-[#fff7df] hover:bg-[#c99033]' : 'border-[#d4a574] bg-[#d4a574] text-white hover:bg-[#e0b88a]'} px-6 py-3 font-semibold transition`}>
                                    {loading ? 'Loading...' : copy.lookupButton}
                                </button>
                            </div>
                            <div className={`mt-4 rounded-[1.1rem] border ${isDarkMode ? 'border-[#6c4320]/50 bg-[#1b1209] text-[#d8c39b]' : 'border-[#e0c08a]/50 bg-[#fffcf7] text-[#6b4d32]'} p-4 text-sm leading-7`}>
                                <div className="mb-3 flex items-center justify-between">
                                    <p className={`font-semibold uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'}`}>{result.reference}</p>
                                    <button
                                        onClick={addBookmark}
                                        className={`rounded-lg px-3 py-1 text-xs font-semibold flex items-center gap-2 transition ${isDarkMode ? 'bg-[#b07c22]/20 text-[#f0c66d] hover:bg-[#b07c22]/40' : 'bg-[#d4a574]/20 text-[#b07c22] hover:bg-[#d4a574]/40'}`}
                                    >
                                        <Bookmark size={14} /> {copy.copyVerse}
                                    </button>
                                </div>
                                <p className="whitespace-pre-wrap">{result.text}</p>
                            </div>
                        </motion.article>

                        <motion.article initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} className={`relative overflow-hidden rounded-3xl border-2 ${isDarkMode ? 'border-[#f0c66d]/60 bg-[#140f09]/90' : 'border-[#d4a574]/60 bg-[#fff9f0]/90'} p-6 shadow-[0_0_60px_rgba(173,117,36,0.2)]`}>
                            <motion.div animate={{ borderColor: isDarkMode ? ['rgba(245,214,129,0.3)', 'rgba(240,198,109,0.6)', 'rgba(245,214,129,0.3)'] : ['rgba(224,192,138,0.3)', 'rgba(212,165,116,0.5)', 'rgba(224,192,138,0.3)'] }} transition={{ duration: 3, repeat: Infinity }} className={`pointer-events-none absolute inset-0 rounded-3xl border-2 ${isDarkMode ? 'border-[#f5d681]/40' : 'border-[#e0c08a]/30'}`} />
                            <div className={`pointer-events-none absolute inset-0 animate-[pulse_4s_ease-in-out_infinite] opacity-50 ${isDarkMode ? '[background-image:linear-gradient(120deg,transparent_0%,rgba(255,229,144,0.14)_48%,transparent_100%)]' : '[background-image:linear-gradient(120deg,transparent_0%,rgba(240,198,109,0.10)_48%,transparent_100%)]'} [background-size:200%_200%]`} />
                            <div className={`mb-4 flex items-center gap-3 ${isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'}`}>
                                <Sparkles size={18} />
                                <h2 className={`font-[Times_New_Roman,serif] text-2xl ${isDarkMode ? 'text-[#fff2c8]' : 'text-[#4a2c15]'}`}>{copy.chapterTitle}</h2>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} className={`rounded-3xl border ${isDarkMode ? 'border-[#7f5128]/50 bg-[#120c07] text-[#fff7df]' : 'border-[#d4a574]/50 bg-[#fffcf7] text-[#4a2c15]'} px-4 py-3 transition cursor-pointer focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#f0c66d]/50' : 'focus:ring-[#d4a574]/50'}`}>
                                    {initialBooks.map((book) => (
                                        <option key={book.id} value={book.bookName.en}>{book.bookName.en}</option>
                                    ))}
                                </select>
                                <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className={`rounded-3xl border ${isDarkMode ? 'border-[#7f5128]/50 bg-[#120c07] text-[#fff7df]' : 'border-[#d4a574]/50 bg-[#fffcf7] text-[#4a2c15]'} px-4 py-3 transition cursor-pointer focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#f0c66d]/50' : 'focus:ring-[#d4a574]/50'}`}>
                                    {chapterOptions.map((chapter) => (
                                        <option key={chapter} value={chapter}>Chapter {chapter}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={`mt-4 rounded-[1.1rem] border ${isDarkMode ? 'border-[#6c4320]/50 bg-[#1b1209] text-[#d8c39b]' : 'border-[#e0c08a]/50 bg-[#fffcf7] text-[#6b4d32]'} p-4 text-sm leading-7`}>
                                <p className={`mb-2 font-semibold uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'}`}>{chapterLoading ? copy.loadingChapter : chapterResult.reference}</p>
                                <p className="whitespace-pre-wrap">{chapterResult.text}</p>
                            </div>
                        </motion.article>
                    </section>

                    {/* Keyword Search Section */}
                    <motion.section initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className={`relative overflow-hidden rounded-3xl border-2 ${isDarkMode ? 'border-[#f0c66d]/60 bg-[#140f09]/90' : 'border-[#d4a574]/60 bg-[#fff9f0]/90'} p-6 shadow-[0_0_60px_rgba(173,117,36,0.2)]`}>
                        <motion.div animate={{ borderColor: isDarkMode ? ['rgba(245,214,129,0.3)', 'rgba(240,198,109,0.6)', 'rgba(245,214,129,0.3)'] : ['rgba(224,192,138,0.3)', 'rgba(212,165,116,0.5)', 'rgba(224,192,138,0.3)'] }} transition={{ duration: 3, repeat: Infinity }} className={`pointer-events-none absolute inset-0 rounded-3xl border-2 ${isDarkMode ? 'border-[#f5d681]/40' : 'border-[#e0c08a]/30'}`} />
                        <div className="mb-4">
                            <h2 className={`font-[Times_New_Roman,serif] text-2xl ${isDarkMode ? 'text-[#fff2c8]' : 'text-[#4a2c15]'}`}>{copy.keywordSearch}</h2>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                value={keywordSearch}
                                onChange={(e) => setKeywordSearch(e.target.value)}
                                className={`flex-1 rounded-3xl border ${isDarkMode ? 'border-[#7f5128]/50 bg-[#120c07] text-[#fff7df]' : 'border-[#d4a574]/50 bg-[#fffcf7] text-[#4a2c15]'} px-4 py-3 transition focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#f0c66d]/50' : 'focus:ring-[#d4a574]/50'}`}
                                placeholder={copy.keywordPlaceholder}
                            />
                            <button
                                onClick={handleKeywordSearch}
                                className={`rounded-full border-2 ${isDarkMode ? 'border-[#f0c66d] bg-[#b07c22] text-[#fff7df] hover:bg-[#c99033]' : 'border-[#d4a574] bg-[#d4a574] text-white hover:bg-[#e0b88a]'} px-6 py-3 font-semibold transition`}
                            >
                                {copy.lookupButton}
                            </button>
                        </div>
                        {keywordResults.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
                                {keywordResults.map((result, idx) => (
                                    <motion.div key={result.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className={`rounded-2xl p-3 border-2 ${isDarkMode ? 'border-[#6c4320]/50 bg-[#1b1209]' : 'border-[#e0c08a]/50 bg-[#fffcf7]'}`}>
                                        <p className={`font-semibold ${isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'}`}>{result.reference}</p>
                                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-[#d8c39b]' : 'text-[#6b4d32]'} line-clamp-2`}>{result.text}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.section>
                    {/* Bookmarks Section */}
                    <motion.section initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className={`relative overflow-hidden rounded-3xl border-2 ${isDarkMode ? 'border-[#f0c66d]/60 bg-[#140f09]/90' : 'border-[#d4a574]/60 bg-[#fff9f0]/90'} p-6 shadow-[0_0_60px_rgba(173,117,36,0.2)]`}>
                        <motion.div animate={{ borderColor: isDarkMode ? ['rgba(245,214,129,0.3)', 'rgba(240,198,109,0.6)', 'rgba(245,214,129,0.3)'] : ['rgba(224,192,138,0.3)', 'rgba(212,165,116,0.5)', 'rgba(224,192,138,0.3)'] }} transition={{ duration: 3, repeat: Infinity }} className={`pointer-events-none absolute inset-0 rounded-3xl border-2 ${isDarkMode ? 'border-[#f5d681]/40' : 'border-[#e0c08a]/30'}`} />
                        <h2 className={`font-[Times_New_Roman,serif] text-2xl mb-4 ${isDarkMode ? 'text-[#fff2c8]' : 'text-[#4a2c15]'}`}>{copy.bookmarks}</h2>
                        {bookmarks.length === 0 ? (
                            <p className={`text-center py-8 ${isDarkMode ? 'text-[#d8c39b]' : 'text-[#6b4d32]'}`}>{copy.noBookmarks}</p>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {bookmarks.map((mark, idx) => (
                                    <motion.div key={mark.id} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} className={`rounded-2xl p-4 border-2 ${isDarkMode ? 'border-[#6c4320]/50 bg-[#1b1209]' : 'border-[#e0c08a]/50 bg-[#fffcf7]'}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <p className={`font-semibold ${isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'}`}>{mark.reference}</p>
                                            <button
                                                onClick={() => removeBookmark(mark.id)}
                                                className={`text-xs p-1 rounded-lg ${isDarkMode ? 'hover:bg-[#6c4320]/50 text-[#d8c39b] hover:text-[#f0c66d]' : 'hover:bg-[#d4a574]/20 text-[#6b4d32] hover:text-[#b07c22]'} transition`}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <p className={`text-sm mb-3 ${isDarkMode ? 'text-[#d8c39b]' : 'text-[#6b4d32]'} line-clamp-3`}>{mark.text}</p>
                                        <button
                                            onClick={() => copyToClipboard(`${mark.reference}\n\n${mark.text}`, mark.id)}
                                            className={`text-xs px-2 py-1 rounded-lg flex items-center gap-1 transition ${isDarkMode ? 'bg-[#b07c22]/20 text-[#f0c66d] hover:bg-[#b07c22]/40' : 'bg-[#d4a574]/20 text-[#b07c22] hover:bg-[#d4a574]/40'}`}
                                        >
                                            {copied === mark.id ? <Check size={12} /> : <Copy size={12} />}
                                            {copied === mark.id ? 'Copied!' : copy.copyVerse}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.section>
                    {/* Books Section */}
                    <motion.section initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className={`relative overflow-hidden rounded-3xl border-2 ${isDarkMode ? 'border-[#f0c66d]/60 bg-[#140f09]/90' : 'border-[#d4a574]/60 bg-[#fff9f0]/90'} p-6 shadow-[0_0_60px_rgba(173,117,36,0.2)]`}>
                        <motion.div animate={{ borderColor: isDarkMode ? ['rgba(245,214,129,0.3)', 'rgba(240,198,109,0.6)', 'rgba(245,214,129,0.3)'] : ['rgba(224,192,138,0.3)', 'rgba(212,165,116,0.5)', 'rgba(224,192,138,0.3)'] }} transition={{ duration: 3, repeat: Infinity }} className={`pointer-events-none absolute inset-0 rounded-3xl border-2 ${isDarkMode ? 'border-[#f5d681]/40' : 'border-[#e0c08a]/30'}`} />
                        <div className={`pointer-events-none absolute inset-0 animate-[pulse_4s_ease-in-out_infinite] opacity-35 ${isDarkMode ? '[background-image:linear-gradient(120deg,transparent_0%,rgba(255,229,144,0.14)_48%,transparent_100%)]' : '[background-image:linear-gradient(120deg,transparent_0%,rgba(240,198,109,0.10)_48%,transparent_100%)]'} [background-size:200%_200%]`} />
                        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className={`font-[Times_New_Roman,serif] text-2xl ${isDarkMode ? 'text-[#fff2c8]' : 'text-[#4a2c15]'}`}>{copy.booksTitle}</h2>
                                <p className={`mt-2 ${isDarkMode ? 'text-[#d8c39b]' : 'text-[#6b4d32]'}`}>{copy.booksIntro}</p>
                            </div>
                            <div className={`flex items-center gap-2 rounded-3xl border-2 ${isDarkMode ? 'border-[#7f5128]/50 bg-[#120c07]' : 'border-[#d4a574]/50 bg-[#fffcf7]'} px-3 py-2`}>
                                <Search size={16} className={isDarkMode ? 'text-[#f0c66d]' : 'text-[#b07c22]'} />
                                <input value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full bg-transparent text-sm outline-none sm:w-56 ${isDarkMode ? 'text-[#fff7df]' : 'text-[#4a2c15]'}`} placeholder={copy.chapterPlaceholder} />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {filteredBooks.map((book, idx) => (
                                <motion.div key={book.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: idx * 0.04 }} whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
                                    <Link to={`/books/${book.id}`} className={`block rounded-2xl border-2 ${isDarkMode ? 'border-[#6c4320]/50 bg-[#1b1209] hover:border-[#f0c66d] hover:shadow-[0_0_40px_rgba(240,198,109,0.2)]' : 'border-[#e0c08a]/50 bg-[#fffcf7] hover:border-[#d4a574] hover:shadow-[0_0_40px_rgba(212,165,116,0.2)]'} p-4 transition`}>
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className={`rounded-full border-2 ${isDarkMode ? 'border-[#d6a84f]/40 bg-[#24130a] text-[#f0c66d]' : 'border-[#d4a574]/40 bg-[#fffcf7] text-[#b07c22]'} px-3 py-1 text-[10px] uppercase tracking-[0.3em]`}>{book.testament}</span>
                                            <span className={`text-sm ${isDarkMode ? 'text-[#e0c081]' : 'text-[#b07c22]'}`}>{book.chapters} ch.</span>
                                        </div>
                                        <h3 className={`font-[Times_New_Roman,serif] text-xl ${isDarkMode ? 'text-[#fff2c8]' : 'text-[#4a2c15]'}`}>{language === 'en' ? book.bookName.en : book.bookName.ta}</h3>
                                        <p className={`mt-2 text-sm ${isDarkMode ? 'text-[#d8c39b]' : 'text-[#6b4d32]'}`}>{language === 'en' ? book.introduction.en : book.introduction.ta}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>
        </motion.div>
    )
}

export default BibleApp
