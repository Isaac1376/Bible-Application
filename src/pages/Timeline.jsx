import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, CalendarDays, ChevronDown, UserRound } from 'lucide-react'
import { useBooks } from '../context/BooksContext'

const tamil = (text) => {
  if (!text || !text.includes('à')) return text
  try { return new TextDecoder().decode(Uint8Array.from(text, (char) => char.charCodeAt(0))) } catch { return text }
}

function Timeline({ language }) {
  const { books: allBooks } = useBooks()
  const [testament, setTestament] = useState('All')
  const isTamil = language === 'ta'
  const books = useMemo(() => testament === 'All' ? allBooks : allBooks.filter((book) => book.testament === testament), [allBooks, testament])
  const text = (value) => isTamil ? tamil(value) : value

  return <div className="space-y-6 sm:space-y-8">
    <section className="rounded-[1.75rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-6 shadow-[0_0_60px_rgba(179,125,40,0.16)] sm:rounded-[2rem] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-3 text-[#f0c66d]"><CalendarDays size={21} /><h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2c8] sm:text-4xl">{isTamil ? 'ஆதியாகமம் முதல் வெளிப்படுத்தல் வரை' : 'Genesis to Revelation'}</h1></div><p className="mt-3 max-w-3xl leading-7 text-[#dac8a2]">{isTamil ? 'ஒவ்வொரு புத்தகத்தின் காலப்பகுதி, ஆசிரியர், அறிமுகம், பயன்பாடு மற்றும் வேதாகமத்தில் அதன் முக்கியத்துவத்தை ஆராயுங்கள்.' : 'Explore the time period, author, introduction, practical value, and biblical importance of every book.'}</p></div><label className="relative block shrink-0"><span className="sr-only">Filter testament</span><select value={testament} onChange={(event) => setTestament(event.target.value)} className="appearance-none rounded-full border border-[#d6a84f]/50 bg-[#120c07] py-3 pl-4 pr-10 text-sm text-[#fff2c8] outline-none"><option value="All">{isTamil ? 'அனைத்து ஏற்பாடுகள்' : 'All testaments'}</option><option value="Old Testament">{isTamil ? 'பழைய ஏற்பாடு' : 'Old Testament'}</option><option value="New Testament">{isTamil ? 'புதிய ஏற்பாடு' : 'New Testament'}</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-[#f0c66d]" size={16} /></label></div>
    </section>
    <div className="relative space-y-5 border-l-2 border-[#8a5b2c]/60 pl-5 sm:pl-7">
      {books.map((book, index) => <motion.article key={book.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(index * 0.025, 0.35) }} className="relative overflow-hidden rounded-[1.4rem] border border-[#85511e]/40 bg-[#140f09]/90 p-5 shadow-[0_0_32px_rgba(173,117,36,0.14)] sm:p-6"><div className="absolute -left-[1.32rem] top-7 h-4 w-4 rounded-full border-4 border-[#14110c] bg-[#f1c566]" /><div className="mb-4 flex flex-wrap items-center gap-2"><span className="rounded-full border border-[#d6a84f]/40 bg-[#24130a] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f0c66d]">{book.testament}</span><span className="text-sm text-[#e0c081]">{book.dateWritten}</span></div><div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]"><div><h2 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2cb]">{text(book.bookName[language])}</h2><p className="mt-3 flex items-center gap-2 text-sm text-[#e9cc87]"><UserRound size={15} />{isTamil ? 'ஆசிரியர்: ' : 'Author: '}{text(book.author[language])}</p><p className="mt-2 text-sm text-[#d2b36b]">{isTamil ? 'காலப்பகுதி: ' : 'Time period: '}{book.dateWritten}</p><p className="mt-4 text-sm leading-7 text-[#d8c39b]">{text(book.introduction[language])}</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-[#6c4320]/50 bg-[#1b1209] p-4"><p className="mb-2 flex items-center gap-2 font-semibold text-[#ffe5ae]"><BookOpen size={15} />{isTamil ? 'இந்தப் புத்தகம் எதற்கு?' : 'Why read this book?'}</p><p className="text-sm leading-7 text-[#d8c39b]">{text(book.about[language])}</p></div><div className="rounded-2xl border border-[#6c4320]/50 bg-[#1b1209] p-4"><p className="mb-2 font-semibold text-[#ffe5ae]">{isTamil ? 'வேதாகமத்தில் முக்கியத்துவம்' : 'Importance in the Bible'}</p><p className="text-sm leading-7 text-[#d8c39b]">{text(book.historicalBackground[language])}</p></div></div></div></motion.article>)}
    </div>
  </div>
}

export default Timeline