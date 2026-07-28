import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const SESSION_KEY = 'bible-admin-session'

const getInitialAdminState = () => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) === 'true'
}

export function AuthProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(getInitialAdminState)

    const login = (email, password) => {
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

        if (!adminEmail || !adminPassword) {
            return { ok: false, error: 'missing-config' }
        }

        if (email === adminEmail && password === adminPassword) {
            sessionStorage.setItem(SESSION_KEY, 'true')
            setIsAdmin(true)
            return { ok: true }
        }

        return { ok: false, error: 'invalid-credentials' }
    }

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY)
        setIsAdmin(false)
    }

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
