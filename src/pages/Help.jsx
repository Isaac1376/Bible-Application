import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Compass, HelpCircle, Languages, ShieldCheck, Sparkles, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { lookupPassage } from '../services/esv'

const copy = {
    en: {
        title: 'Help Center',
        intro: 'Everything you need to explore the Bible Timeline Explorer with confidence, whether you are reading, studying, or managing content.',
        sections: [
            {
                title: 'How to explore books',
                text: 'Open the Books page to browse each Bible book, read introductions, and open a detailed study view for deeper context.',
                icon: BookOpen,
                action: 'Browse books'
            },
            {
                title: 'Follow the timeline',
                text: 'Use the Timeline page to move through Scripture in chronological order and see how the major books connect.',
                icon: Compass,
                action: 'Open timeline'
            },
            {
                title: 'Switch languages',
                text: 'Use the language toggle at the top of the page to move between English and Tamil instantly.',
                icon: Languages,
                action: 'Change language'
            }
        ],
        adminTitle: 'Admin guide',
        adminText: 'Use the admin login to create, edit, or remove Bible book entries in the dashboard. The demo login is ready for testing.',
        adminCta: 'Open admin',
        faqs: [
            {
                question: 'What does the app include?',
                answer: 'It includes a premium home experience, a books library, detailed book pages, a chronological timeline, an about page, and an admin dashboard.'
            },
            {
                question: 'Can I use the app in Tamil?',
                answer: 'Yes. The language switch lets you move between English and Tamil throughout the site.'
            },
            {
                question: 'How do I access admin features?',
                answer: 'Visit the Admin section and sign in with the demo credentials shown on the login page.'
            }
        ]
    },
    ta: {
        title: 'உதவி மையம்',
        intro: 'பைபிள் காலவரிசை ஆராய்ச்சியை நீங்கள் நம்பிக்கையுடன் பயன்படுத்துவதற்குத் தேவையான அனைத்தையும் இந்தப் பக்கம் வழங்குகிறது.',
        sections: [
            {
                title: 'புத்தகங்களை எவ்வாறு ஆராய்வது',
                text: 'புத்தகங்கள் பக்கத்தில் திறந்து ஒவ்வொரு பைபிள் புத்தகத்தையும் ஆராய்ந்து, அறிமுகங்களையும் ஆழமான விவரங்களையும் படிக்கலாம்.',
                icon: BookOpen,
                action: 'புத்தகங்களைப் பார்க்க'
            },
            {
                title: 'காலவரிசையைப் பின்பற்றுங்கள்',
                text: 'காலவரிசை பக்கத்தில் சென்று வேதத்தின் முக்கிய புத்தகங்களை காலவரிசைப்படி இணைத்துப் பார்க்கலாம்.',
                icon: Compass,
                action: 'காலவரிசையைத் திற'
            },
            {
                title: 'மொழியை மாற்றவும்',
                text: 'மேலே உள்ள மொழி பொத்தானைப் பயன்படுத்தி ஆங்கிலத்திலிருந்து தமிழ் வரை உடனடியாக மாற்றலாம்.',
                icon: Languages,
                action: 'மொழியை மாற்று'
            }
        ],
        adminTitle: 'நிர்வாக வழிகாட்டி',
        adminText: 'நிர்வாக உள்நுழைவைப் பயன்படுத்தி புத்தகங்களை உருவாக்க, மாற்ற அல்லது நீக்கலாம். டெமோ உள்நுழைவு தயார் நிலையில் உள்ளது.',
        adminCta: 'நிர்வாகத்தைத் திற',
        faqs: [
            {
                question: 'இந்தப் பயன்பாடு என்னென்ன உள்ளடக்கங்களை வழங்குகிறது?',
                answer: 'இது பிரீமியம் முகப்புப் பக்கம், புத்தகத் தொகுப்பு, விரிவான புத்தகப் பக்கங்கள், காலவரிசை, பற்றி பக்கம் மற்றும் நிர்வாக டாஷ்போர்டு ஆகியவற்றைக் கொண்டுள்ளது.'
            },
            {
                question: 'தமிழிலும் பயன்படுத்த முடியுமா?',
                answer: 'ஆம். மொழி மாற்றும் பொத்தான் மூலம் ஆங்கிலத்திலிருந்து தமிழுக்கும் உடனடியாக மாறலாம்.'
            },
            {
                question: 'நிர்வாக அம்சங்களை எப்படிச் செல்வது?',
                answer: 'நிர்வாகப் பகுதியை திறந்து, உள்நுழைவு பக்கத்தில் காட்டப்படும் டெமோ விவரங்களுடன் உள்நுழையுங்கள்.'
            }
        ]
    }
}

function Help({ language }) {
    const content = copy[language]
    const [verseQuery, setVerseQuery] = useState('John 3:16')
    const [verseResult, setVerseResult] = useState({
        reference: 'John 3:16',
        text: 'Use the lookup to search a verse, passage, or reference with the ESV-style Bible API flow.'
    })
    const [loading, setLoading] = useState(false)

    const handleVerseLookup = async () => {
        if (!verseQuery.trim()) return
        setLoading(true)
        try {
            const result = await lookupPassage(verseQuery)
            setVerseResult(result)
        } catch {
            setVerseResult({
                reference: verseQuery.trim(),
                text: language === 'en' ? 'The lookup could not be completed right now. Please try another reference.' : 'இந்த வாசகத் தேடல் இப்போது முடிக்கப்படவில்லை. மற்ற குறிப்பு முயற்சிக்கவும்.'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-[#9b6a2a]/40 bg-[#180e08]/90 p-8 shadow-[0_0_70px_rgba(179,125,40,0.16)] sm:p-10">
                <div className="mb-4 flex items-center gap-3 text-[#f0c66d]">
                    <HelpCircle size={22} />
                    <h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2c8] sm:text-4xl">{content.title}</h1>
                </div>
                <p className="max-w-3xl text-lg leading-8 text-[#d8c39b]">{content.intro}</p>
            </motion.section>

            <section className="grid gap-6 lg:grid-cols-3">
                {content.sections.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[1.5rem] border border-[#7f5128]/40 bg-[#140f09]/90 p-6 shadow-[0_0_32px_rgba(173,117,36,0.14)]">
                            <div className="mb-4 flex items-center gap-3 text-[#f3d28b]"><Icon size={18} /><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#ffeec5]">{item.title}</h2></div>
                            <p className="mb-5 leading-8 text-[#d8c39b]">{item.text}</p>
                            <Link to={item.title === 'How to explore books' || item.title === 'புத்தகங்களை எவ்வாறு ஆராய்வது' ? '/books' : item.title === 'Follow the timeline' || item.title === 'காலவரிசையைப் பின்பற்றுங்கள்' ? '/timeline' : '/'} className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffd36b] hover:text-[#fff3c4]">
                                {item.action} <Sparkles size={15} />
                            </Link>
                        </motion.article>
                    )
                })}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                    <div className="mb-4 flex items-center gap-3 text-[#f0c66d]"><Search size={18} /><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{language === 'en' ? 'Verse lookup' : 'வசனத் தேடல்'}</h2></div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input value={verseQuery} onChange={(e) => setVerseQuery(e.target.value)} className="flex-1 rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df]" placeholder={language === 'en' ? 'Try John 3:16 or Genesis 1:1' : 'John 3:16 அல்லது Genesis 1:1 முயற்சிக்கவும்'} />
                        <button onClick={handleVerseLookup} className="rounded-full border border-[#f0c66d] bg-[#b07c22] px-4 py-3 font-semibold text-[#fff7df]">{loading ? (language === 'en' ? 'Loading...' : 'ஏற்றப்படுகிறது...') : (language === 'en' ? 'Lookup' : 'தேடு')}</button>
                    </div>
                    <div className="mt-4 rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4 text-sm leading-7 text-[#d8c39b]">
                        <p className="mb-2 font-semibold uppercase tracking-[0.2em] text-[#f0c66d]">{verseResult.reference}</p>
                        <p className="whitespace-pre-wrap">{verseResult.text}</p>
                    </div>
                </motion.article>

                <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                    <div className="mb-4 flex items-center gap-3 text-[#f0c66d]"><Sparkles size={18} /><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{language === 'en' ? 'Bible image resources' : 'பைபிள் படம் வளங்கள்'}</h2></div>
                    <div className="space-y-4 text-sm leading-7 text-[#d8c39b]">
                        <div className="rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4">
                            <p className="font-semibold text-[#ffe5ae]">{language === 'en' ? 'AI tools to try' : 'சோதிக்க வேண்டிய AI கருவிகள்'}</p>
                            <p className="mt-2">DALL·E, Stable Diffusion, Midjourney</p>
                        </div>
                        <div className="rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4">
                            <p className="font-semibold text-[#ffe5ae]">{language === 'en' ? 'Suggested timeline prompts' : 'காலவரிசை கருப்பொருள் தூண்டுதல்கள்'}</p>
                            <p className="mt-2">Creation scene • Noah’s Ark • Abraham journey • Moses crossing Red Sea • Jesus ministry</p>
                        </div>
                        <div className="rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4">
                            <p className="font-semibold text-[#ffe5ae]">{language === 'en' ? 'Tip' : 'உதவிக்குறிப்பு'}</p>
                            <p className="mt-2">{language === 'en' ? 'Use these prompts with your preferred image generator to build richer visuals for the timeline.' : 'காலவரிசைக்கு அதிகமான காட்சிகளை உருவாக்க உங்கள் விருப்பமான படம் உருவாக்கும் கருவியில் இவற்றைப் பயன்படுத்தவும்.'}</p>
                        </div>
                    </div>
                </motion.article>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                    <div className="mb-4 flex items-center gap-3 text-[#f0c66d]"><ShieldCheck size={18} /><h2 className="font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">{content.adminTitle}</h2></div>
                    <p className="leading-8 text-[#d8c39b]">{content.adminText}</p>
                    <Link to="/admin/login" className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#f0c66d] bg-[#b07c22] px-4 py-3 font-semibold text-[#fff7df] transition hover:scale-[1.01]">
                        {content.adminCta} <Sparkles size={16} />
                    </Link>
                </motion.article>

                <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[1.6rem] border border-[#8d5623]/40 bg-[#140f09]/90 p-6 shadow-[0_0_40px_rgba(173,117,36,0.14)]">
                    <h2 className="mb-4 font-[Times_New_Roman,serif] text-2xl text-[#fff2c8]">FAQ</h2>
                    <div className="space-y-4">
                        {content.faqs.map((faq) => (
                            <div key={faq.question} className="rounded-[1.1rem] border border-[#6c4320]/50 bg-[#1b1209] p-4">
                                <p className="font-semibold text-[#ffe5ae]">{faq.question}</p>
                                <p className="mt-2 text-sm leading-7 text-[#d8c39b]">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </motion.article>
            </section>
        </div>
    )
}

export default Help
