import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3, PlayCircle, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBooks } from '../context/BooksContext'
import { getBookCoverImage } from '../data/imageMap'

const tamil = (text) => {
  if (!text || !text.includes('à')) return text
  try { return new TextDecoder().decode(Uint8Array.from(text, (char) => char.charCodeAt(0))) } catch { return text }
}
const videoUrl = (book, lang) => {
  const query = lang === 'ta'
    ? `${book.bookName.ta} பைபிள் அறிமுகம்`
    : `${book.bookName.en} Bible story overview`
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

function Books({ language }) {
  const { books } = useBooks()
  const [search, setSearch] = useState('')
  const isTamil = language === 'ta'
  const text = (value) => isTamil ? tamil(value) : value
  const query = search.trim().toLowerCase()
  const filteredBooks = !query ? books : books.filter((book) => `${book.bookName.en} ${text(book.bookName.ta)} ${book.keyThemes.join(' ')}`.toLowerCase().includes(query))
  return <div className="space-y-6 sm:space-y-8">
    <section className="rounded-[1.75rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-6 shadow-[0_0_60px_rgba(179,125,40,0.16)] sm:rounded-[2rem] sm:p-8"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#e2b76a]">{isTamil ? 'வேதாகமப் புத்தகங்கள்' : 'Bible books'}</p><h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff1c7] sm:text-4xl">{isTamil ? 'ஒவ்வொரு புத்தகத்தின் கதையையும் நோக்கத்தையும் அறியுங்கள்' : 'Discover the story and purpose of every book'}</h1><p className="mt-3 max-w-2xl leading-7 text-[#dac8a2]">{isTamil ? 'சுருக்கமான அறிமுகம், முக்கிய வசனம், கருப்பொருள்கள் மற்றும் கதை விளக்கக் காணொளியுடன் வாசிப்பைத் தொடங்குங்கள்.' : 'Start with a concise introduction, key verse, themes, and a story-video link for each book.'}</p></div><label className="flex items-center gap-2 rounded-full border border-[#d6a84f]/40 bg-[#120c07] px-4 py-3 text-[#f0c66d]"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={isTamil ? 'புத்தகத்தைத் தேடுங்கள்' : 'Search books'} className="w-full bg-transparent text-sm text-[#fff2c8] outline-none placeholder:text-[#c1a36d] sm:w-56" /></label></div></section>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filteredBooks.map((book, index) => <motion.article key={book.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: Math.min(index * 0.025, 0.25) }} whileHover={{ y: -5 }} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#8d5722]/40 bg-[#140f09]/90 shadow-[0_0_40px_rgba(179,121,36,0.16)]"><img src={getBookCoverImage(book.bookName.en)} alt="" loading="lazy" decoding="async" className="h-36 w-full object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /><div className="flex flex-1 flex-col p-5"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full border border-[#d6a84f]/40 bg-[#24130a] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#f0c66d]">{book.testament}</span><span className="flex items-center gap-1 text-xs text-[#d8bf86]"><Clock3 size={13} />{book.chapters} {isTamil ? 'அதி.' : 'ch.'}</span></div><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff4d1]">{text(book.bookName[language])}</h2><p className="mt-2 text-sm leading-6 text-[#d6c09b]">{text(book.about[language])}</p><p className="mt-4 rounded-xl border border-[#6c4320]/50 bg-[#1b1209] p-3 text-sm italic leading-6 text-[#f5deb1]">“{book.importantVerses[0]}”</p><div className="mt-4 flex flex-wrap gap-2">{book.keyThemes.slice(0, 3).map((theme) => <span key={theme} className="rounded-full border border-[#6c4320]/50 bg-[#1d120b] px-2.5 py-1 text-xs text-[#f5deb1]">{theme}</span>)}</div><div className="mt-auto flex flex-wrap gap-x-4 gap-y-3 pt-5"><Link to={`/books/${book.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffd36b] hover:text-[#fff3c4]">{isTamil ? 'விவரங்கள்' : 'Study details'} <ArrowRight size={15} /></Link><a href={videoUrl(book, language)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f0c66d] hover:text-[#fff3c4]"><PlayCircle size={16} />{isTamil ? 'கதை காணொளி' : 'Story video'}</a></div></div></motion.article>)}</div>
  </div>
}
export default Books