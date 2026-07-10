import { motion } from 'framer-motion'
import { BookOpen, ShieldCheck, Sparkles } from 'lucide-react'

function About({ language }) {
    const copy = {
        en: {
            title: 'About this project',
            intro: 'This experience is designed to make the Bible feel accessible, beautifully organized, and deeply reflective.',
            body: 'The interface combines premium visual storytelling with a practical study structure, giving readers a thoughtful way to explore each book, its history, and its themes.',
            features: ['Bilingual storytelling', 'Chronological timeline', 'Elegant book details', 'Admin-ready content management']
        },
        ta: {
            title: 'இந்தத் திட்டம் பற்றி',
            intro: 'வேதாகமத்தை எளிதாகவும், அழகாகவும், ஆழமாகவும் சிந்திக்கத் தூண்டும் வகையில் அமைக்க இந்த அனுபவம் வடிவமைக்கப்பட்டுள்ளது.',
            body: 'இந்த இடைமுகம் பிரீமியம் காட்சி கதையாடல் மற்றும் நடைமுறை ஆய்வு அமைப்பை இணைத்து, ஒவ்வொரு புத்தகத்தையும் அதன் வரலாறு மற்றும் கருப்பொருள்களையும் ஆராய்வதற்கான சிந்தனைமிக்க வழியை அளிக்கிறது.',
            features: ['இருமொழி கதையாடல்', 'காலவரிசை', 'அழகான புத்தக விவரங்கள்', 'நிர்வாகத்திற்குத் தயாரான உள்ளடக்க மேலாண்மை']
        }
    }

    const content = copy[language]

    return (
        <div className="space-y-8">
            <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-8 shadow-[0_0_60px_rgba(179,125,40,0.16)]">
                <div className="mb-4 flex items-center gap-3 text-[#f0c66d]"><BookOpen size={20} /><h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2c8]">{content.title}</h1></div>
                <p className="max-w-3xl text-lg leading-8 text-[#d8c39b]">{content.intro}</p>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d8c39b]">{content.body}</p>
            </motion.section>

            <div className="grid gap-6 md:grid-cols-2">
                {content.features.map((feature, index) => (
                    <motion.article key={feature} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[1.5rem] border border-[#7f5128]/40 bg-[#140f09]/90 p-6 shadow-[0_0_32px_rgba(173,117,36,0.14)]">
                        <div className="mb-4 flex items-center gap-3 text-[#f3d28b]"><Sparkles size={18} /><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#ffeec5]">{feature}</h2></div>
                        <p className="leading-8 text-[#d8c39b]">{language === 'en' ? 'Crafted with premium visual design and a thoughtful study-first structure.' : 'உயர்தர காட்சி வடிவமைப்பு மற்றும் ஆய்வு-முதல் அமைப்பு கொண்டு உருவாக்கப்பட்டுள்ளது.'}</p>
                    </motion.article>
                ))}
            </div>
        </div>
    )
}

export default About
