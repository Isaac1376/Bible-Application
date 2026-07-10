import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Trash2, Edit3, ShieldCheck, Upload, ImagePlus } from 'lucide-react'
import { initialBooks } from '../data/expandedBooks'

const STORAGE_KEY = 'bible-admin-books'

const getStoredBooks = () => {
    if (typeof window === 'undefined') return initialBooks
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : initialBooks
    } catch {
        return initialBooks
    }
}

const persistBooks = (books) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.readAsDataURL(file)
})

const createEmptyDraft = () => ({
    bookName: { en: '', ta: '' },
    testament: 'Old Testament',
    author: { en: '', ta: '' },
    dateWritten: '',
    locationWritten: '',
    chapters: 1,
    introduction: { en: '', ta: '' },
    about: { en: '', ta: '' },
    historicalBackground: { en: '', ta: '' },
    keyThemes: '',
    importantVerses: '',
    coverImage: ''
})

const buildChapterData = (bookName, taName, chapterCount, imageUrl, existingChapters = []) =>
    Array.from({ length: chapterCount }, (_, index) => {
        const existing = existingChapters[index] || {}
        return {
            chapterNumber: index + 1,
            title: existing.title || { en: `${bookName} ${index + 1}`, ta: `${taName} ${index + 1}` },
            description: existing.description || {
                en: `Chapter ${index + 1} in ${bookName} gives readers a simple and helpful summary of the main event, the people involved, and the lesson carried by the passage. It highlights the turning point or important action that shapes the chapter’s meaning and shows how this section fits into the larger story of the book. This short reflection makes the chapter easier to understand, remember, and apply in daily study and devotion.`,
                ta: `அதிகாரம் ${index + 1}, ${taName} இல் இடம்பெறும் முக்கிய நிகழ்வை, சம்பந்தப்பட்ட மக்களை மற்றும் அந்தப் பகுதியின் பாடத்தைக் குறித்த எளிய மற்றும் பயனுள்ள சுருக்கத்தை வாசகர்களுக்கு அளிக்கிறது. இந்த அதிகாரத்தின் அர்த்தத்தை வடிவமைக்கும் முக்கிய மாற்றம் அல்லது செயலைக் காட்டி, புத்தகத்தின் பெரிய கதையுடன் இது எவ்வாறு இணைகிறது என்பதையும் இது தெளிவாக்குகிறது.`
            },
            explanation: existing.explanation || {
                en: `This chapter contributes to the broader themes of ${bookName} and deepens the spiritual message of the book.`,
                ta: `இந்த அதிகாரம் ${taName} இன் பரந்த கருப்பொருள்களுக்கும், புத்தகத்தின் ஆன்மீக செய்திக்கும் பங்களிக்கிறது.`
            },
            images: existing.images?.length ? existing.images : [imageUrl]
        }
    })

function AdminDashboard({ language }) {
    const [books, setBooks] = useState(getStoredBooks)
    const [draft, setDraft] = useState(createEmptyDraft)
    const [editingBookId, setEditingBookId] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')

    const stats = useMemo(() => ({
        total: books.length,
        old: books.filter((book) => book.testament === 'Old Testament').length,
        new: books.filter((book) => book.testament === 'New Testament').length
    }), [books])

    useEffect(() => {
        persistBooks(books)
    }, [books])

    const resetDraft = () => {
        setDraft(createEmptyDraft())
        setEditingBookId(null)
        setUploadMessage('')
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const result = await readFileAsDataUrl(file)
            setDraft((current) => ({ ...current, coverImage: result }))
            setUploadMessage(language === 'en' ? 'Image uploaded successfully.' : 'படம் வெற்றிகரமாக பதிவேற்றப்பட்டது.')
        } catch {
            setUploadMessage(language === 'en' ? 'Image upload failed. Please try again.' : 'படப் பதிவேற்றம் தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.')
        }
    }

    const handleCreate = (event) => {
        event.preventDefault()
        const bookNameEn = draft.bookName.en.trim()
        if (!bookNameEn) return

        const newBook = {
            id: bookNameEn.toLowerCase().replace(/\s+/g, '-'),
            bookName: draft.bookName,
            testament: draft.testament,
            author: draft.author,
            dateWritten: draft.dateWritten,
            locationWritten: draft.locationWritten,
            chapters: Number(draft.chapters),
            introduction: draft.introduction,
            about: draft.about,
            historicalBackground: draft.historicalBackground,
            keyThemes: draft.keyThemes.split(',').map((item) => item.trim()).filter(Boolean),
            importantVerses: draft.importantVerses.split(',').map((item) => item.trim()).filter(Boolean),
            relatedBooks: ['Genesis'],
            coverImage: draft.coverImage || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
            chaptersData: buildChapterData(draft.bookName.en, draft.bookName.ta, Number(draft.chapters), draft.coverImage || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80')
        }
        setBooks([newBook, ...books])
        resetDraft()
    }

    const handleEdit = (book) => {
        setEditingBookId(book.id)
        setDraft({
            bookName: book.bookName,
            testament: book.testament,
            author: book.author,
            dateWritten: book.dateWritten,
            locationWritten: book.locationWritten,
            chapters: book.chapters,
            introduction: book.introduction,
            about: book.about,
            historicalBackground: book.historicalBackground,
            keyThemes: book.keyThemes.join(', '),
            importantVerses: book.importantVerses.join(', '),
            coverImage: book.coverImage
        })
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        if (!editingBookId) return

        setBooks((currentBooks) => currentBooks.map((book) => {
            if (book.id !== editingBookId) return book

            return {
                ...book,
                bookName: draft.bookName,
                testament: draft.testament,
                author: draft.author,
                dateWritten: draft.dateWritten,
                locationWritten: draft.locationWritten,
                chapters: Number(draft.chapters),
                introduction: draft.introduction,
                about: draft.about,
                historicalBackground: draft.historicalBackground,
                keyThemes: draft.keyThemes.split(',').map((item) => item.trim()).filter(Boolean),
                importantVerses: draft.importantVerses.split(',').map((item) => item.trim()).filter(Boolean),
                coverImage: draft.coverImage || book.coverImage,
                chaptersData: buildChapterData(draft.bookName.en, draft.bookName.ta, Number(draft.chapters), draft.coverImage || book.coverImage, book.chaptersData)
            }
        }))
        resetDraft()
    }

    return (
        <div className="space-y-8">
            <section className="rounded-[2rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-6 shadow-[0_0_60px_rgba(179,125,40,0.16)] sm:p-8">
                <div className="flex items-center gap-3 text-[#f0c66d]">
                    <ShieldCheck size={20} />
                    <h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2c8]">{language === 'en' ? 'Admin dashboard' : 'நிர்வாக டாஷ்போர்டு'}</h1>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.3rem] border border-[#7f5128]/40 bg-[#140f09]/90 p-4"><p className="text-sm text-[#d2b36b]">{language === 'en' ? 'Books' : 'புத்தகங்கள்'}</p><p className="mt-2 text-3xl text-[#fff4d0]">{stats.total}</p></div>
                    <div className="rounded-[1.3rem] border border-[#7f5128]/40 bg-[#140f09]/90 p-4"><p className="text-sm text-[#d2b36b]">{language === 'en' ? 'Old Testament' : 'பழைய ஏற்பாடு'}</p><p className="mt-2 text-3xl text-[#fff4d0]">{stats.old}</p></div>
                    <div className="rounded-[1.3rem] border border-[#7f5128]/40 bg-[#140f09]/90 p-4"><p className="text-sm text-[#d2b36b]">{language === 'en' ? 'New Testament' : 'புதிய ஏற்பாடு'}</p><p className="mt-2 text-3xl text-[#fff4d0]">{stats.new}</p></div>
                </div>
            </section>

            <section className="grid gap-8 xl:grid-cols-[1fr_0.7fr]">
                <div className="rounded-[1.7rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6">
                    <div className="mb-4 flex items-center justify-between gap-3 text-[#f0c66d]">
                        <div className="flex items-center gap-3"><PlusCircle size={18} /><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{editingBookId ? (language === 'en' ? 'Edit a Bible book' : 'பைபிள் புத்தகத்தை திருத்து') : (language === 'en' ? 'Create a Bible book' : 'பைபிள் புத்தகத்தை உருவாக்கு')}</h2></div>
                        {editingBookId ? <button onClick={resetDraft} className="rounded-full border border-[#d6a84f]/40 px-3 py-2 text-sm text-[#f0c66d]">{language === 'en' ? 'Cancel' : 'ரத்து செய்'}</button> : null}
                    </div>
                    <form onSubmit={editingBookId ? handleUpdate : handleCreate} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'English name' : 'ஆங்கிலப் பெயர்'}<input value={draft.bookName.en} onChange={(e) => setDraft({ ...draft, bookName: { ...draft.bookName, en: e.target.value } })} className="mt-2 w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Tamil name' : 'தமிழ் பெயர்'}<input value={draft.bookName.ta} onChange={(e) => setDraft({ ...draft, bookName: { ...draft.bookName, ta: e.target.value } })} className="mt-2 w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Testament' : 'ஏற்பாடு'}<select value={draft.testament} onChange={(e) => setDraft({ ...draft, testament: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]"><option>Old Testament</option><option>New Testament</option></select></label>
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Author' : 'ஆசிரியர்'}<input value={draft.author.en} onChange={(e) => setDraft({ ...draft, author: { ...draft.author, en: e.target.value } })} className="mt-2 w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Date written' : 'எழுதப்பட்ட தேதி'}<input value={draft.dateWritten} onChange={(e) => setDraft({ ...draft, dateWritten: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Location' : 'இடம்'}<input value={draft.locationWritten} onChange={(e) => setDraft({ ...draft, locationWritten: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        </div>
                        <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Chapters' : 'அதிகாரங்கள்'}<input type="number" min="1" value={draft.chapters} onChange={(e) => setDraft({ ...draft, chapters: Number(e.target.value) })} className="mt-2 w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Introduction (English)' : 'அறிமுகம் (ஆங்கிலம்)'}<textarea value={draft.introduction.en} onChange={(e) => setDraft({ ...draft, introduction: { ...draft.introduction, en: e.target.value } })} className="mt-2 min-h-[90px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Introduction (Tamil)' : 'அறிமுகம் (தமிழ்)'}<textarea value={draft.introduction.ta} onChange={(e) => setDraft({ ...draft, introduction: { ...draft.introduction, ta: e.target.value } })} className="mt-2 min-h-[90px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'About the book (English)' : 'புத்தகம் பற்றி (ஆங்கிலம்)'}<textarea value={draft.about.en} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, en: e.target.value } })} className="mt-2 min-h-[90px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'About the book (Tamil)' : 'புத்தகம் பற்றி (தமிழ்)'}<textarea value={draft.about.ta} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, ta: e.target.value } })} className="mt-2 min-h-[90px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Historical background (English)' : 'வரலாற்றுப் பின்னணி (ஆங்கிலம்)'}<textarea value={draft.historicalBackground.en} onChange={(e) => setDraft({ ...draft, historicalBackground: { ...draft.historicalBackground, en: e.target.value } })} className="mt-2 min-h-[90px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Historical background (Tamil)' : 'வரலாற்றுப் பின்னணி (தமிழ்)'}<textarea value={draft.historicalBackground.ta} onChange={(e) => setDraft({ ...draft, historicalBackground: { ...draft.historicalBackground, ta: e.target.value } })} className="mt-2 min-h-[90px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Themes (comma separated)' : 'கருப்பொருள்கள் (கமா பிரிக்கப்பட்டது)'}<textarea value={draft.keyThemes} onChange={(e) => setDraft({ ...draft, keyThemes: e.target.value })} className="mt-2 min-h-[70px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                            <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Key verses (comma separated)' : 'முக்கிய வசனங்கள் (கமா பிரிக்கப்பட்டது)'}<textarea value={draft.importantVerses} onChange={(e) => setDraft({ ...draft, importantVerses: e.target.value })} className="mt-2 min-h-[70px] w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" /></label>
                        </div>
                        <label className="block text-sm text-[#e1c98f]">{language === 'en' ? 'Cover image upload' : 'கவர் படம் பதிவேற்று'}
                            <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-dashed border-[#a06a2b] bg-[#120c07] p-4">
                                <div className="flex items-center gap-2 text-[#f0c66d]"><ImagePlus size={16} /> <span>{language === 'en' ? 'Choose a new image for this book' : 'இந்த புத்தகத்திற்கான புதிய படத்தை தேர்ந்தெடுக்கவும்'}</span></div>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-[#f2d79f]" />
                                {uploadMessage ? <p className="text-sm text-[#ffd899]">{uploadMessage}</p> : null}
                                {draft.coverImage ? <img src={draft.coverImage} alt="Preview" className="h-28 w-full rounded-xl object-cover" /> : null}
                            </div>
                        </label>
                        <button type="submit" className="inline-flex items-center gap-2 rounded-full border border-[#f0c66d] bg-[#b07c22] px-4 py-3 font-semibold text-[#fff7df]"> <Upload size={16} /> {editingBookId ? (language === 'en' ? 'Update book' : 'புத்தகத்தைப் புதுப்பி') : (language === 'en' ? 'Save book' : 'புத்தகத்தைச் சேமி')} </button>
                    </form>
                </div>

                <div className="rounded-[1.7rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6">
                    <div className="mb-4 flex items-center gap-3 text-[#f0c66d]"><Edit3 size={18} /><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{language === 'en' ? 'Manage content' : 'உள்ளடக்கத்தை நிர்வகி'}</h2></div>
                    <div className="space-y-3">
                        {books.map((book) => (
                            <div key={book.id} className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-[#6c4320]/50 bg-[#1b1209] px-4 py-3">
                                <div className="min-w-0">
                                    <p className="font-[Times_New_Roman,serif] text-lg text-[#ffeec5]">{book.bookName[language]}</p>
                                    <p className="text-sm text-[#cead69]">{book.testament}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(book)} className="rounded-full border border-[#d6a84f]/40 p-2 text-[#f0c66d]"><Edit3 size={15} /></button>
                                    <button onClick={() => setBooks((currentBooks) => currentBooks.filter((entry) => entry.id !== book.id))} className="rounded-full border border-[#d6a84f]/40 p-2 text-[#f0c66d]"><Trash2 size={15} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminDashboard
