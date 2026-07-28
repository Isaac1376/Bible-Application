import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLogin({ language }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault()
        const result = login(email.trim(), password)

        if (result.ok) {
            navigate('/admin')
            return
        }

        if (result.error === 'missing-config') {
            setError(
                language === 'en'
                    ? 'Admin login is not configured. Set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD in your .env file.'
                    : 'நிர்வாக உள்நுழைவு கட்டமைக்கப்படவில்லை. உங்கள் .env கோப்பில் VITE_ADMIN_EMAIL மற்றும் VITE_ADMIN_PASSWORD-ஐ அமைக்கவும்.'
            )
            return
        }

        setError(
            language === 'en'
                ? 'Invalid credentials. Please try again.'
                : 'தவறான சான்றுகள். தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
        )
    }

    return (
        <div className="flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg rounded-[2rem] border border-[#8a5b2c]/40 bg-[#180e08]/90 p-8 shadow-[0_0_70px_rgba(179,125,40,0.16)]">
                <div className="mb-6 flex items-center gap-3 text-[#f3d28b]">
                    <ShieldCheck size={24} />
                    <h1 className="font-[Times_New_Roman,serif] text-3xl text-[#fff2c8]">{language === 'en' ? 'Admin access' : 'நிர்வாக அணுகல்'}</h1>
                </div>
                <div className="mb-5 rounded-2xl border border-[#8d5623]/40 bg-[#140f09]/80 p-4 text-sm text-[#f2d79f]">
                    <p className="font-semibold">{language === 'en' ? 'Private admin access' : 'தனிப்பட்ட நிர்வாக அணுகல்'}</p>
                    <p className="mt-2">{language === 'en' ? 'Use your private credentials to continue.' : 'தொடர உங்கள் தனிப்பட்ட சான்றுகளைப் பயன்படுத்தவும்.'}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm text-[#e2c37e]"><Mail size={15} /> {language === 'en' ? 'Email' : 'மின்னஞ்சல்'}</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df] outline-none ring-0" placeholder="admin@bible.com" />
                    </label>
                    <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm text-[#e2c37e]"><Lock size={15} /> {language === 'en' ? 'Password' : 'கடவுச்சொல்'}</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-[#7f5128]/50 bg-[#120c07] px-4 py-3 text-[#fff7df] outline-none ring-0" placeholder="••••••••" />
                    </label>
                    {error ? <p className="text-sm text-[#ffb785]">{error}</p> : null}
                    <button type="submit" className="w-full rounded-full border border-[#f0c66d] bg-[#b07c22] px-4 py-3 font-semibold text-[#fff7df] transition hover:scale-[1.01]">{language === 'en' ? 'Sign in' : 'உள்நுழைக'}</button>
                </form>
            </motion.div>
        </div>
    )
}

export default AdminLogin
