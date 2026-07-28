import { initialBooks } from '../data/expandedBooks'

const ESV_API_URL = 'https://api.esv.org/v3/passage/text/'
const BIBLE_API_URL = 'https://bible-api.com'

export async function lookupPassage(reference, language = 'en') {
  const token = import.meta.env.VITE_ESV_API_TOKEN
  const cleanedReference = reference.trim()

  if (language === 'ta') {
    const refRegex = /^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/
    const match = cleanedReference.match(refRegex)
    if (match) {
      const bookName = match[1].trim()
      const chapter = parseInt(match[2], 10)
      const startVerse = parseInt(match[3], 10)
      const endVerse = match[4] ? parseInt(match[4], 10) : startVerse

      const bookIndex = initialBooks.findIndex(
        (b) =>
          b.bookName.en.toLowerCase() === bookName.toLowerCase() ||
          b.bookName.ta === bookName
      )

      if (bookIndex !== -1) {
        const bookId = bookIndex + 1
        const response = await fetch(`https://bolls.life/get-text/TAMOVR/${bookId}/${chapter}/`)
        if (response.ok) {
          const verses = await response.json()
          const matchedVerses = verses.filter((v) => v.verse >= startVerse && v.verse <= endVerse)
          if (matchedVerses.length > 0) {
            const bookNameTa = initialBooks[bookIndex].bookName.ta
            const refString = `${bookNameTa} ${chapter}:${startVerse}${
              endVerse !== startVerse ? '-' + endVerse : ''
            }`
            const textString = matchedVerses.map((v) => `${v.verse} ${v.text}`).join('\n')
            return {
              reference: refString,
              text: textString
            }
          }
        }
      }
    }
  }

  if (token && language !== 'ta') {
    const params = new URLSearchParams({
      q: cleanedReference,
      'include-headings': 'false',
      'include-footnotes': 'false',
      'include-verse-numbers': 'true'
    })

    const response = await fetch(`${ESV_API_URL}?${params.toString()}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      const passage = data?.passages?.[0]

      if (passage) {
        return {
          reference: data?.reference || cleanedReference,
          text: passage.replace(/\s+/g, ' ').trim()
        }
      }
    }
  }

  const fallbackResponse = await fetch(`${BIBLE_API_URL}/${encodeURIComponent(cleanedReference)}`)
  if (!fallbackResponse.ok) {
    throw new Error('lookup-failed')
  }

  const fallbackData = await fallbackResponse.json()
  const fallbackText = fallbackData?.text || fallbackData?.verses?.[0]?.text || 'No passage found.'

  return {
    reference: fallbackData?.reference || cleanedReference,
    text: fallbackText.replace(/\n/g, ' ').trim()
  }
}

export async function readChapter(book, chapter, language = 'en') {
  if (language === 'ta') {
    const bookIndex = initialBooks.findIndex(
      (b) =>
        b.bookName.en.toLowerCase() === book.toLowerCase() ||
        b.bookName.ta === book
    )
    if (bookIndex !== -1) {
      const bookId = bookIndex + 1
      const response = await fetch(`https://bolls.life/get-text/TAMOVR/${bookId}/${chapter}/`)
      if (response.ok) {
        const verses = await response.json()
        const bookNameTa = initialBooks[bookIndex].bookName.ta
        return {
          reference: `${bookNameTa} ${chapter}`,
          text: verses
            .map((verse) => `${verse.verse} ${verse.text}`)
            .join('\n')
            .trim()
        }
      }
    }
  }

  const query = `${book.trim()} ${chapter.trim()}`
  const response = await fetch(`${BIBLE_API_URL}/${encodeURIComponent(query)}?translation=kjv`)

  if (!response.ok) {
    throw new Error('chapter-load-failed')
  }

  const data = await response.json()
  const verses = data?.verses || []

  return {
    reference: data?.reference || query,
    text: verses
      .map((verse) => `${verse.verse} ${verse.text}`)
      .join('\n')
      .trim()
  }
}
