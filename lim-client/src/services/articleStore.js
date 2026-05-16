import seedArticles from '../assets/article-content'

const ARTICLES_KEY = 'cafe-atlas-articles'

const seedImages = seedArticles.reduce((images, article) => {
  images[article.name] = article.image
  return images
}, {})

export const articleImageOptions = seedArticles.map((article) => ({
  value: article.name,
  label: article.name
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' '),
}))

export const categories = [...new Set(seedArticles.map((article) => article.category))]

const slugify = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const normalizeArticle = (article, index = 0) => {
  const name = slugify(article.name || article.title) || `article-${index + 1}`

  return {
    id: Number(article.id) || index + 1,
    name,
    title: String(article.title ?? '').trim(),
    author: String(article.author ?? '').trim(),
    date: String(article.date ?? '').trim(),
    category: String(article.category ?? categories[0] ?? 'Cafe').trim(),
    summary: String(article.summary ?? '').trim(),
    imageKey: String(article.imageKey ?? seedArticles.find((item) => item.name === name)?.name ?? seedArticles[0]?.name ?? '').trim(),
    content: Array.isArray(article.content)
      ? article.content.map((item) => String(item).trim()).filter(Boolean)
      : String(article.content ?? '')
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
    isPublished: typeof article.isPublished === 'boolean' ? article.isPublished : true,
  }
}

export const hydrateArticle = (article) => ({
  ...article,
  image: seedImages[article.imageKey] ?? seedImages[article.name] ?? seedArticles[0]?.image,
})

export const getSeedArticles = () =>
  seedArticles.map((article, index) =>
    normalizeArticle({
      ...article,
      id: index + 1,
      imageKey: article.name,
      isPublished: true,
    })
  )

export const getArticles = () => {
  if (typeof window === 'undefined') {
    return getSeedArticles()
  }

  try {
    const savedArticles = JSON.parse(window.localStorage.getItem(ARTICLES_KEY) ?? 'null')

    if (Array.isArray(savedArticles)) {
      return savedArticles.map(normalizeArticle)
    }
  } catch {
    window.localStorage.removeItem(ARTICLES_KEY)
  }

  const seededArticles = getSeedArticles()
  window.localStorage.setItem(ARTICLES_KEY, JSON.stringify(seededArticles))
  return seededArticles
}

export const saveArticles = (articles) => {
  const normalizedArticles = articles.map(normalizeArticle)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(ARTICLES_KEY, JSON.stringify(normalizedArticles))
  }

  return normalizedArticles
}

export const getPublishedArticles = () => getArticles().filter((article) => article.isPublished).map(hydrateArticle)
