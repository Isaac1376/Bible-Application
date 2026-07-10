const ESV_API_URL = 'https://api.esv.org/v3/passage/text/'
const BIBLE_API_URL = 'https://bible-api.com'

export async function lookupPassage(reference) {
  const token = import.meta.env.VITE_ESV_API_TOKEN
  const cleanedReference = reference.trim()

  if (token) {
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

export async function readChapter(book, chapter) {
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
