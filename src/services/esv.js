const ESV_API_URL = 'https://api.esv.org/v3/passage/text/'

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

  const fallbackResponse = await fetch(`https://bible-api.com/${encodeURIComponent(cleanedReference)}`)
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
