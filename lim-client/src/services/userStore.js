import usersSeed from '../data/users.json?raw'

export const roles = ['admin', 'editor', 'viewer']
export const genders = ['male', 'female', 'other']

const USERS_KEY = 'cafe-atlas-users'
const CURRENT_USER_KEY = 'cafe-atlas-current-user'

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

export const updateUser = (id, updates) => {
  const users = getUsers()
  const nextUsers = users.map((user) => (user.id === id ? normalizeUser({ ...user, ...updates, id }) : user))
  saveUsers(nextUsers)
  return nextUsers.find((user) => user.id === id) ?? null
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
