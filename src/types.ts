export type Language = 'en' | 'ta'

export type Testament = 'Old Testament' | 'New Testament'

export interface Chapter {
    chapterNumber: number
    title: {
        en: string
        ta: string
    }
    description: {
        en: string
        ta: string
    }
    explanation: {
        en: string
        ta: string
    }
    images: string[]
}

export interface Book {
    id: string
    bookName: {
        en: string
        ta: string
    }
    testament: Testament
    author: {
        en: string
        ta: string
    }
    dateWritten: string
    locationWritten: string
    chapters: number
    introduction: {
        en: string
        ta: string
    }
    about: {
        en: string
        ta: string
    }
    historicalBackground: {
        en: string
        ta: string
    }
    keyThemes: string[]
    importantVerses: string[]
    relatedBooks: string[]
    coverImage: string
    chaptersData: Chapter[]
}
