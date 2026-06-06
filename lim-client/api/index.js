import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI ?? '')
let databasePromise

const roles = ['admin', 'editor', 'viewer']
const genders = ['male', 'female', 'other']
const seedUsers = [
  {
    id: 1,
    firstName: 'Mikaela',
    lastName: 'Torres',
    age: '24',
    gender: 'female',
    contactNumber: '09171234567',
    email: 'mikaela@cafeatlas.studio',
    role: 'admin',
    username: 'mikaelatorres',
    password: 'atlasadmin1',
    address: 'Makati City',
    isActive: true,
  },
  {
    id: 2,
    firstName: 'Lucas',
    lastName: 'Villanueva',
    age: '27',
    gender: 'male',
    contactNumber: '09181234567',
    email: 'lucas@cafeatlas.studio',
    role: 'editor',
    username: 'lucasvillanueva',
    password: 'coffeewords8',
    address: 'Bonifacio Global City',
    isActive: true,
  },
  {
    id: 3,
    firstName: 'Nadine',
    lastName: 'Cruz',
    age: '23',
    gender: 'female',
    contactNumber: '09191234567',
    email: 'nadine@cafeatlas.studio',
    role: 'editor',
    username: 'nadinecruz',
    password: 'quietnotes9',
    address: 'Intramuros, Manila',
    isActive: true,
  },
  {
    id: 7,
    firstName: 'Arielle',
    lastName: 'Lim',
    age: '29',
    gender: 'other',
    contactNumber: '09231234567',
    email: 'arielle@cafeatlas.studio',
    role: 'admin',
    username: 'ariellelim',
    password: 'publishplan8',
    address: 'Legazpi Village, Makati',
    isActive: true,
  },
]

const normalizeUser = (user, index = 0) => ({
  id: Number(user.id) || index + 1,
  firstName: String(user.firstName ?? '').trim(),
  lastName: String(user.lastName ?? '').trim(),
  age: String(user.age ?? '').trim(),
  gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
    ? String(user.gender ?? '').trim().toLowerCase()
    : '',
  contactNumber: String(user.contactNumber ?? '').trim(),
  email: String(user.email ?? '').trim().toLowerCase(),
  role: roles.includes(String(user.role ?? '').trim().toLowerCase())
    ? String(user.role ?? '').trim().toLowerCase()
    : 'editor',
  username: String(user.username ?? '').trim().toLowerCase(),
  password: String(user.password ?? ''),
  address: String(user.address ?? '').trim(),
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
})

const slugify = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const normalizeArticle = (article, index = 0) => {
  const name = slugify(article.name || article.title) || `article-${index + 1}`

  return {
    id: Number(article.id) || index + 1,
    name,
    title: String(article.title ?? '').trim(),
    author: String(article.author ?? '').trim(),
    date: String(article.date ?? '').trim(),
    category: String(article.category ?? 'Cafe').trim(),
    summary: String(article.summary ?? '').trim(),
    imageKey: String(article.imageKey ?? article.name ?? '').trim(),
    content: Array.isArray(article.content)
      ? article.content.map((item) => String(item).trim()).filter(Boolean)
      : String(article.content ?? '')
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
    isPublished: typeof article.isPublished === 'boolean' ? article.isPublished : true,
  }
}

const getDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured.')
  }

  databasePromise ??= client.connect().then(() => client.db(process.env.MONGODB_DB || 'cafe-atlas'))
  return databasePromise
}

const parseBody = async (req) =>
  new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })

const sendJson = (res, statusCode, data) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

const getNextId = async (collection) => {
  const latest = await collection.find().sort({ id: -1 }).limit(1).next()
  return Number(latest?.id || 0) + 1
}

const ensureUsersSeeded = async (users) => {
  if (await users.estimatedDocumentCount()) {
    return
  }

  await users.insertMany(seedUsers.map(normalizeUser))
}

const handleUsers = async (req, res, users) => {
  await ensureUsersSeeded(users)

  if (req.method === 'GET') {
    const records = await users.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
    sendJson(res, 200, records)
    return
  }

  if (req.method === 'POST') {
    const body = await parseBody(req)
    const user = normalizeUser({ ...body, id: await getNextId(users) })
    await users.insertOne(user)
    sendJson(res, 201, user)
    return
  }

  sendJson(res, 405, { error: 'Method not allowed.' })
}

const handleUserById = async (req, res, users, id) => {
  if (req.method !== 'PUT') {
    sendJson(res, 405, { error: 'Method not allowed.' })
    return
  }

  const body = await parseBody(req)
  const user = normalizeUser({ ...body, id })
  await users.updateOne({ id }, { $set: user }, { upsert: true })
  sendJson(res, 200, user)
}

const handleAuth = async (req, res, users) => {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed.' })
    return
  }

  await ensureUsersSeeded(users)
  const { emailOrUsername, password } = await parseBody(req)
  const credential = String(emailOrUsername ?? '').trim().toLowerCase()
  const user = await users.findOne(
    { $or: [{ email: credential }, { username: credential }] },
    { projection: { _id: 0 } }
  )

  if (!user || user.password !== String(password ?? '')) {
    sendJson(res, 401, { user: null, error: 'Invalid email, username, or password.' })
    return
  }

  if (!user.isActive) {
    sendJson(res, 403, { user: null, error: 'This account is inactive. Please contact an administrator.' })
    return
  }

  if (user.role === 'viewer') {
    sendJson(res, 403, { user: null, error: 'Viewers are not allowed to log in.' })
    return
  }

  sendJson(res, 200, { user, error: '' })
}

const handleArticles = async (req, res, articles) => {
  if (req.method === 'GET') {
    const records = await articles.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
    sendJson(res, 200, records)
    return
  }

  if (req.method === 'POST') {
    const body = await parseBody(req)
    const article = normalizeArticle({ ...body, id: await getNextId(articles) })
    await articles.insertOne(article)
    sendJson(res, 201, article)
    return
  }

  sendJson(res, 405, { error: 'Method not allowed.' })
}

const handleArticleById = async (req, res, articles, id) => {
  if (req.method !== 'PUT') {
    sendJson(res, 405, { error: 'Method not allowed.' })
    return
  }

  const body = await parseBody(req)
  const article = normalizeArticle({ ...body, id })
  await articles.updateOne({ id }, { $set: article }, { upsert: true })
  sendJson(res, 200, article)
}

export default async function handler(req, res) {
  try {
    const db = await getDatabase()
    const users = db.collection('users')
    const articles = db.collection('articles')
    const path = new URL(req.url, `https://${req.headers.host}`).pathname.replace(/^\/api\/?/, '')
    const segments = path.split('/').filter(Boolean)

    if (segments[0] === 'users' && segments.length === 1) {
      await handleUsers(req, res, users)
      return
    }

    if (segments[0] === 'users' && segments[1]) {
      await handleUserById(req, res, users, Number(segments[1]))
      return
    }

    if (segments[0] === 'auth') {
      await handleAuth(req, res, users)
      return
    }

    if (segments[0] === 'articles' && segments.length === 1) {
      await handleArticles(req, res, articles)
      return
    }

    if (segments[0] === 'articles' && segments[1]) {
      await handleArticleById(req, res, articles, Number(segments[1]))
      return
    }

    sendJson(res, 404, { error: 'API route not found.' })
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Unexpected server error.' })
  }
}
