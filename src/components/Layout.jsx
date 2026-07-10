import { motion } from 'framer-motion'
import { BookOpen, Compass, HelpCircle, Home, Sparkles, TabletSmartphone } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
    { to: '/', label: { en: 'Home', ta: 'முகப்பு' }, icon: Home },
    { to: '/books', label: { en: 'Books', ta: 'புத்தகங்கள்' }, icon: BookOpen },
    { to: '/timeline', label: { en: 'Timeline', ta: 'காலவரிசை' }, icon: Compass },
    { to: '/help', label: { en: 'Help', ta: 'உதவி' }, icon: HelpCircle },
    { to: '/bible-app', label: { en: 'Bible App', ta: 'பைபிள் ஆப்' }, icon: TabletSmartphone },
    { to: '/about', label: { en: 'About', ta: 'பற்றி' }, icon: Sparkles }
]

function Layout({ language, onLanguageChange }) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,203,107,0.17),_transparent_40%),linear-gradient(135deg,_#090909,_#22140c)] text-[#f6e7c8]">
            <header className="sticky top-0 z-20 border-b border-[#8a5b2c]/40 bg-[#0f0b08]/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-[0.25em] text-[#f3d28b]">
                        <div className="rounded-full border border-[#d6a84f]/60 bg-[#24130a] p-2 shadow-[0_0_24px_rgba(226,169,55,0.2)]">
                            <BookOpen size={18} />
                        </div>
                        <span className="font-[Times_New_Roman,serif] text-base sm:text-xl">Bible Timeline Explorer</span>
                    </Link>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
                            className="rounded-full border border-[#d6a84f]/40 bg-[#1a120d] px-3 py-2 text-sm font-medium text-[#f7dfaf] transition hover:border-[#f0c66d] hover:text-[#fff2c3]"
                        >
                            {language === 'en' ? 'தமிழ்' : 'English'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
                <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${isActive ? 'border-[#f0c66d] bg-[#2a1a0f] text-[#ffedb8]' : 'border-[#6d4725]/40 bg-[#120d09]/70 text-[#d9c184] hover:border-[#d6a84f]/70 hover:text-[#fff2c3]'}`
                            }
                        >
                            <Icon size={16} />
                            {label[language]}
                        </NavLink>
                    ))}
                </nav>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Outlet />
                </motion.div>
            </main>
        </div>
    )
}

export default Layout
