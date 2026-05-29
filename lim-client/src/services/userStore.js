import usersSeed from '../data/users.json?raw'

export const roles = ['admin', 'editor', 'viewer']
export const genders = ['male', 'female', 'other']

const USERS_KEY = 'cafe-atlas-users'
const CURRENT_USER_KEY = 'cafe-atlas-current-user'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Request failed.')
  }

  return data
}

export const normalizeUser = (user, index = 0) => ({
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

export const getSeedUsers = () => {
  try {
    return JSON.parse(usersSeed).map(normalizeUser)
  } catch {
    return []
  }
}

export const getUsers = () => {
  if (typeof window === 'undefined') {
    return getSeedUsers()
  }

  try {
    const savedUsers = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? 'null')

    if (Array.isArray(savedUsers)) {
      return savedUsers.map(normalizeUser)
    }
  } catch {
    window.localStorage.removeItem(USERS_KEY)
  }

  const seededUsers = getSeedUsers()
  window.localStorage.setItem(USERS_KEY, JSON.stringify(seededUsers))
  return seededUsers
}

export const getUsersAsync = async () => {
  try {
    const users = await requestJson('/api/users')
    if (Array.isArray(users) && users.length) {
      return saveUsers(users)
    }
  } catch {
    return getUsers()
  }

  return getUsers()
}

export const saveUsers = (users) => {
  const normalizedUsers = users.map(normalizeUser)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(normalizedUsers))
  }

  return normalizedUsers
}

export const getCurrentUser = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const user = JSON.parse(window.localStorage.getItem(CURRENT_USER_KEY) ?? 'null')
    return user ? normalizeUser(user) : null
  } catch {
    window.localStorage.removeItem(CURRENT_USER_KEY)
    return null
  }
}

export const setCurrentUser = (user) => {
  if (typeof window === 'undefined') {
    return null
  }

  if (!user) {
    window.localStorage.removeItem(CURRENT_USER_KEY)
    return null
  }

  const normalizedUser = normalizeUser(user)
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalizedUser))
  return normalizedUser
}

export const addUser = (user) => {
  const users = getUsers()
  const nextUser = normalizeUser({
    ...user,
    id: users.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
  })

  saveUsers([...users, nextUser])
  return nextUser
}

export const addUserAsync = async (user) => {
  const nextUser = await requestJson('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  })
  saveUsers([...getUsers().filter((item) => item.id !== nextUser.id), nextUser])
  return normalizeUser(nextUser)
}

export const updateUser = (id, updates) => {
  const users = getUsers()
  const nextUsers = users.map((user) => (user.id === id ? normalizeUser({ ...user, ...updates, id }) : user))
  saveUsers(nextUsers)
  return nextUsers.find((user) => user.id === id) ?? null
}

export const updateUserAsync = async (id, updates) => {
  const nextUser = await requestJson(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
  const users = getUsers()
  saveUsers(users.map((user) => (user.id === id ? nextUser : user)))
  return normalizeUser(nextUser)
}

export const authenticateUser = ({ emailOrUsername, password }) => {
  const credential = String(emailOrUsername ?? '').trim().toLowerCase()
  const user = getUsers().find((item) => item.email === credential || item.username === credential)

  if (!user || user.password !== String(password ?? '')) {
    return { user: null, error: 'Invalid email, username, or password.' }
  }

  if (!user.isActive) {
    return { user: null, error: 'This account is inactive. Please contact an administrator.' }
  }

  if (user.role === 'viewer') {
    return { user: null, error: 'Viewers are not allowed to log in.' }
  }

  return { user: setCurrentUser(user), error: '' }
}

export const authenticateUserAsync = async ({ emailOrUsername, password }) => {
  try {
    const result = await requestJson('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ emailOrUsername, password }),
    })

    return { user: setCurrentUser(result.user), error: result.error ?? '' }
  } catch (error) {
    return { user: null, error: error.message || 'Invalid email, username, or password.' }
  }
}
