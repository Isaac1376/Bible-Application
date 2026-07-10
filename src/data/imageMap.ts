const imageFiles = import.meta.glob('../images/*.{jpg,jpeg,png,svg}', { eager: true, as: 'url' })

const normalizeKey = (value: string) =>
    value
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '')

const fileMap = Object.fromEntries(
    Object.entries(imageFiles).map(([path, module]) => {
        const fileName = path.split('/').pop() || ''
        const key = normalizeKey(fileName.replace(/\.[^.]+$/, ''))
        const url = typeof module === 'string' ? module : (module?.default || module)
        return [key, url]
    })
)

const fallbackKeys: Record<string, string> = {
    numbers: 'numbers2',
    isaiah: 'isaias'
}

const remoteFallback = (bookName: string) =>
    `https://source.unsplash.com/featured/900x600/?${encodeURIComponent(bookName)}+bible`

export const getBookCoverImage = (bookName: string) => {
    const key = normalizeKey(bookName)
    return fileMap[key] || fileMap[fallbackKeys[key]] || remoteFallback(bookName)
}
