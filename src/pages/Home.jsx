import { motion } from 'framer-motion'
import { ArrowRight, BookMarked, Compass, Sparkles, Star, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { initialBooks } from '../data/expandedBooks'

const content = {
    en: {
        title: 'A premium Bible timeline experience',
        subtitle: 'Journey through the grand narrative of Scripture with elegant storytelling, rich context, and a timeless golden design.',
        cta: 'Explore the books',
        featured: 'Featured books',
        timeline: 'Chronological insight',
        overview: 'Discover creation, covenant, exile, gospel, and mission through a curated timeline built for study and reflection.'
    },
    ta: {
        title: 'உயர்தர பைபிள் காலவரிசை அனுபவம்',
        subtitle: 'சிறந்த கதையாடல், செழுமையான சூழல் மற்றும் காலமறியா தங்க வடிவமைப்புடன் வேதவாக்கியங்களின் மகத்தான கதையை அனுபவிக்கவும்.',
        cta: 'புத்தகங்களை ஆராயுங்கள்',
        featured: 'சிறப்பு புத்தகங்கள்',
        timeline: 'காலவரிசைக் கண்ணோட்டம்',
        overview: 'ஆராய்ச்சி மற்றும் சிந்தனைக்காக, படைப்பு, உடன்படிக்கை, நாடோடிப் பயணம், சுவிசேஷம் மற்றும் பணியை ஒரு தொகுக்கப்பட்ட காலவரிசையில் கண்டறியுங்கள்.'
    }
}

function Home({ language }) {
    const copy = content[language]
    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[2rem] border border-[#b27b35]/40 bg-[#140f0a]/90 p-8 shadow-[0_0_80px_rgba(196,132,35,0.2)] sm:p-10 lg:p-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,194,72,0.16),_transparent_55%)]" />
                <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6a84f]/40 bg-[#24130a]/90 px-3 py-2 text-sm text-[#f2d489]">
                            <Sparkles size={15} />
                            {copy.timeline}
                        </div>
                        <h1 className="mb-4 max-w-2xl font-[Times_New_Roman,serif] text-4xl font-bold leading-tight text-[#fff2c3] sm:text-5xl">
                            {copy.title}
                        </h1>
                        <p className="mb-6 max-w-2xl text-lg text-[#e7d4a8]">{copy.subtitle}</p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/books" className="inline-flex items-center gap-2 rounded-full border border-[#f0c66d] bg-[#b07c22] px-5 py-3 font-semibold text-[#fff7df] transition hover:scale-[1.02]">
                                {copy.cta} <ArrowRight size={16} />
                            </Link>
                            <Link to="/timeline" className="rounded-full border border-[#7a4f20]/60 bg-[#19110b] px-5 py-3 font-semibold text-[#e4c68f] transition hover:border-[#e3b04b]">
                                {copy.overview}
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="rounded-[1.5rem] border border-[#9f6d2b]/40 bg-[linear-gradient(145deg,rgba(37,22,10,0.95),rgba(16,10,5,0.9))] p-5 shadow-[inset_0_0_40px_rgba(255,195,96,0.18)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.35em] text-[#e7c476]">{copy.featured}</p>
                                <h2 className="mt-2 font-[Times_New_Roman,serif] text-2xl text-[#fff7e0]">Genesis • Matthew</h2>
                            </div>
                            <div className="rounded-full border border-[#d6a84f]/40 p-3 text-[#f3d28b]">
                                <BookMarked size={20} />
                            </div>
                        </div>
                        <div className="mt-5 space-y-3">
                            {initialBooks.slice(0, 3).map((book) => (
                                <div key={book.id} className="flex items-center justify-between rounded-2xl border border-[#7a4f20]/50 bg-[#120c07]/60 px-4 py-3">
                                    <div>
                                        <p className="font-[Times_New_Roman,serif] text-lg text-[#fff1c2]">{book.bookName[language]}</p>
                                        <p className="text-sm text-[#d5b97b]">{book.testament}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#f7d86b]">
                                        <Star size={14} />
                                        <span className="text-sm">{book.chapters} chapters</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                {[
                    { title: { en: 'Chronological Journey', ta: 'காலவரிசை பயணம்' }, text: { en: 'Follow the Bible’s story from creation to the early church in one seamless flow.', ta: 'சிருஷ்டியிலிருந்து ஆரம்பகால திருச்சபை வரை ஒரே தொடர்ச்சியான ஓட்டத்தில் வேதத்தின் கதையைப் பின்பற்றுங்கள்.' }, icon: Compass },
                    { title: { en: 'Study Ready', ta: 'படிப்புக்குத் தயாரானது' }, text: { en: 'Every book includes introductions, background, authorship, and chapter insights.', ta: 'ஒவ்வொரு புத்தகமும் அறிமுகங்கள், பின்னணி, ஆசிரியர் விவரம் மற்றும் அதிகாரக் குறிப்புகளுடன் உள்ளது.' }, icon: TrendingUp },
                    { title: { en: 'Elegant Design', ta: 'சிறந்த வடிவமைப்பு' }, text: { en: 'A cinematic golden theme makes each page feel like an ancient manuscript illuminated by light.', ta: 'ஒவ்வொரு பக்கமும் பழமையான கையெழுத்துப் பிரதியைக் கொண்டிருப்பது போல தங்க நிறத்தில் ஒளிர்கிறது.' }, icon: Sparkles }
                ].map((item, index) => (
                    <motion.article key={item.title.en} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[1.5rem] border border-[#7f5128]/40 bg-[#140f0a]/80 p-6 shadow-[0_0_30px_rgba(173,117,36,0.16)]">
                        <item.icon className="mb-4 text-[#f0c66d]" size={24} />
                        <h3 className="mb-2 font-[Times_New_Roman,serif] text-xl text-[#fff5d3]">{item.title[language]}</h3>
                        <p className="text-[#d7c28b]">{item.text[language]}</p>
                    </motion.article>
                ))}
            </section>
        </div>
    )
}

export default Home
