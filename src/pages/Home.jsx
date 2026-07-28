import { motion } from 'framer-motion'
import { ArrowRight, BookMarked, Compass, Heart, ScrollText, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBooks } from '../context/BooksContext'
import { weeklyMessage } from '../data/weeklyMessage'

const studyGuides = {
  en: [
    { title: 'The big story', text: 'Trace creation, fall, covenant, kingdom, exile, restoration, Christ, and the church as one connected story.', icon: Compass },
    { title: 'Read each book well', text: 'Discover each book’s setting, purpose, major themes, and key passages before you begin reading.', icon: ScrollText },
    { title: 'Reflect and respond', text: 'Use the timeline and book notes to slow down, pray, and consider how Scripture shapes faith and daily life.', icon: Heart }
  ],
  ta: [
    { title: 'பெரிய கதை', text: 'சிருஷ்டிப்பு, வீழ்ச்சி, உடன்படிக்கை, இராஜ்யம், சிறை, மீட்பு, கிறிஸ்து மற்றும் திருச்சபை ஆகியவற்றை ஒரே தொடர்கதையாகக் காணுங்கள்.', icon: Compass },
    { title: 'ஒவ்வொரு புத்தகத்தையும் நன்றாக வாசிக்க', text: 'வாசிப்பைத் தொடங்குவதற்கு முன் ஒவ்வொரு புத்தகத்தின் சூழல், நோக்கம், முக்கிய கருப்பொருள்கள் மற்றும் முக்கிய வசனங்களை அறியுங்கள்.', icon: ScrollText },
    { title: 'சிந்தித்து பதிலளிக்க', text: 'காலவரிசை மற்றும் புத்தகக் குறிப்புகளைப் பயன்படுத்தி வேகத்தைக் குறைத்து, ஜெபித்து, வேதாகமம் நம்பிக்கையையும் அன்றாட வாழ்வையும் எவ்வாறு வடிவமைக்கிறது என்பதைப் பாருங்கள்.', icon: Heart }
  ]
}

const verses = {
  en: [
    { reference: 'Genesis 1:1', text: 'The Bible opens with God as Creator and the source of all that is.' },
    { reference: 'John 1:14', text: 'The Gospel announces that the Word became flesh and dwelt among us.' },
    { reference: 'Revelation 21:5', text: 'Scripture ends with God’s promise to make all things new.' }
  ],
  ta: [
    { reference: 'ஆதியாகமம் 1:1', text: 'வேதாகமம், இறைவனை சிருஷ்டிகர் என்றும் எல்லாவற்றின் மூலமாகவும் அறிமுகப்படுத்துகிறது.' },
    { reference: 'யோவான் 1:14', text: 'சுவிசேஷம், வார்த்தை மாம்சமாகி நம்மிடையே வாசம் செய்தார் என்று அறிவிக்கிறது.' },
    { reference: 'வெளிப்படுத்தல் 21:5', text: 'வேதாகமம், இறைவன் எல்லாவற்றையும் புதிதாக்குவேன் என்ற வாக்குத்தத்தத்துடன் முடிகிறது.' }
  ]
}

function Home({ language }) {
  const { books } = useBooks()
  const isTamil = language === 'ta'
  const guides = studyGuides[language]
  const featuredVerses = verses[language]
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#b27b35]/40 bg-[#140f0a]/90 p-8 shadow-[0_0_80px_rgba(196,132,35,0.2)] sm:p-10 lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,194,72,0.16),_transparent_55%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6a84f]/40 bg-[#24130a]/90 px-3 py-2 text-sm text-[#f2d489]"><Sparkles size={15} />{isTamil ? 'வேதாகம வாசிப்பும் ஆய்வும்' : 'Scripture for reading and study'}</p>
            <h1 className="mb-4 max-w-2xl font-[Times_New_Roman,serif] text-4xl font-bold leading-tight text-[#fff2c3] sm:text-5xl">{isTamil ? 'வேதாகமத்தின் ஒரே தொடர்கதையை ஆராயுங்கள்' : 'Explore the Bible’s unfolding story'}</h1>
            <p className="mb-6 max-w-2xl text-lg text-[#e7d4a8]">{isTamil ? 'சிருஷ்டிப்பு மற்றும் உடன்படிக்கையிலிருந்து கிறிஸ்துவும் ஆரம்பத் திருச்சபையும் வரை வேதாகமப் புத்தகங்களை அவற்றின் வரலாற்றுப் பின்னணியில் வாசியுங்கள்.' : 'Read the books of Scripture in their historical setting—from creation and covenant to Christ and the early church.'}</p>
            <div className="flex flex-wrap gap-3"><Link to="/books" className="inline-flex items-center gap-2 rounded-full border border-[#f0c66d] bg-[#b07c22] px-5 py-3 font-semibold text-[#fff7df] transition hover:scale-[1.02]">{isTamil ? 'புத்தகங்களைப் பார்க்க' : 'Browse all books'} <ArrowRight size={16} /></Link><Link to="/timeline" className="rounded-full border border-[#7a4f20]/60 bg-[#19110b] px-5 py-3 font-semibold text-[#e4c68f] transition hover:border-[#e3b04b]">{isTamil ? 'காலவரிசையைப் பார்க்க' : 'View the timeline'}</Link></div>
          </motion.div>
          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="rounded-[1.5rem] border border-[#9f6d2b]/40 bg-[linear-gradient(145deg,rgba(37,22,10,0.95),rgba(16,10,5,0.9))] p-5 shadow-[inset_0_0_40px_rgba(255,195,96,0.18)]"><div className="flex items-center gap-3"><BookMarked className="text-[#f3d28b]" size={20} /><div><p className="text-sm uppercase tracking-[0.2em] text-[#e7c476]">{isTamil ? 'வாசிப்பைத் தொடங்குங்கள்' : 'Begin your journey'}</p><p className="text-sm text-[#d5b97b]">{books.length} {isTamil ? 'வேதாகமப் புத்தகங்கள்' : 'books of the Bible'}</p></div></div><div className="mt-5 space-y-3">{featuredVerses.map((verse) => <div key={verse.reference} className="rounded-2xl border border-[#7a4f20]/50 bg-[#120c07]/60 px-4 py-3"><p className="font-semibold text-[#f7d86b]">{verse.reference}</p><p className="mt-1 text-sm leading-6 text-[#e7d4a8]">{verse.text}</p></div>)}</div></motion.aside>
        </div>
      </section>
      <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[2rem] border border-[#b27b35]/40 bg-[#140f0a]/90 shadow-[0_0_55px_rgba(196,132,35,0.16)]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <img src={weeklyMessage.image} alt="Weekly church message" loading="lazy" decoding="async" className="h-72 w-full object-cover lg:h-full" />
          <div className="p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e7c476]">{weeklyMessage.dateLabel}</p><h2 className="mt-3 font-[Times_New_Roman,serif] text-3xl text-[#fff2c3] sm:text-4xl">{weeklyMessage.title}</h2><blockquote className="mt-5 border-l-2 border-[#e3b04b] pl-5"><p className="font-semibold text-[#f7d86b]">{weeklyMessage.verse}</p><p className="mt-2 text-lg leading-8 text-[#f1dfb6]">“{weeklyMessage.verseText}”</p></blockquote><p className="mt-6 leading-8 text-[#d7c28b]">{weeklyMessage.message}</p></div>
        </div>
      </motion.section>
      <section className="grid gap-6 lg:grid-cols-3">{guides.map((item, index) => <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[1.5rem] border border-[#7f5128]/40 bg-[#140f0a]/80 p-6 shadow-[0_0_30px_rgba(173,117,36,0.16)]"><item.icon className="mb-4 text-[#f0c66d]" size={24} /><h2 className="mb-2 font-[Times_New_Roman,serif] text-xl text-[#fff5d3]">{item.title}</h2><p className="text-[#d7c28b]">{item.text}</p></motion.article>)}</section>
    </div>
  )
}

export default Home