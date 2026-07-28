import { createContext, useContext, useEffect, useState } from 'react'
import { initialBooks } from '../data/expandedBooks'

const BooksContext = createContext(null)
export const BOOKS_STORAGE_KEY = 'bible-admin-books'

const loadBooks = () => {
    if (typeof window === 'undefined') return initialBooks

    try {
        const saved = window.localStorage.getItem(BOOKS_STORAGE_KEY)
        return saved ? JSON.parse(saved) : initialBooks
    } catch {
        return initialBooks
    }
}

export function BooksProvider({ children }) {
    const [books, setBooks] = useState(loadBooks)

    useEffect(() => {
        window.localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books))
    }, [books])

    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key !== BOOKS_STORAGE_KEY) return
            setBooks(loadBooks())
        }

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    const resetBooks = () => setBooks(initialBooks)

    return (
        <BooksContext.Provider value={{ books, setBooks, resetBooks }}>
            {children}
        </BooksContext.Provider>
    )
}

export function useBooks() {
    const context = useContext(BooksContext)
    if (!context) {
        throw new Error('useBooks must be used within BooksProvider')
    }
    return context
}
