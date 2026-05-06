import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import usersSeed from '../../data/users.json?raw'

const COLORS = {
  primary: '#c58c7b',
  success: '#9bb045',
  info: '#7d91d1',
  warning: '#ca6f32',
  secondary: '#f0c4cf',
  bg: 'transparent',
  text: 'var(--text)',
  muted: 'var(--muted)',
  border: 'var(--border)',
}

const roles = ['admin', 'editor', 'viewer']
const genders = ['male', 'female', 'other']

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
}

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '')

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
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
      })),
      error: '',
    }
  } catch {
    return {
      users: [],
      error: 'Unable to read users from data/users.json.',
    }
  }
}

const seed = loadUsers()

const filterDesign = {
  height: '44px',
  borderRadius: '14px',
  backgroundColor: 'rgba(255,255,255,0.82)',
  display: 'flex',
  alignItems: 'center',

  '& fieldset': {
    border: '1px solid var(--border)',
    transition: 'all 200ms ease-in-out',
  },

  '&:hover fieldset': {
    borderColor: '#c58c7b !important',
  },

  '&.Mui-focused fieldset': {
    borderColor: '#c58c7b !important',
  },

  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingTop: '10px',
    paddingBottom: '10px',
  },

  '& .MuiSelect-icon': {
    color: 'var(--muted)',
  },
}
const labelDesign = {
  color: 'var(--muted)',
  fontSize: '0.9rem',
  '&.Mui-focused': {
    color: '#c58c7b',
  },
}

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    backgroundColor: 'rgba(255,255,255,0.82)',
    '& fieldset': {
      borderColor: 'var(--border)',
    },
    '&:hover fieldset': {
      borderColor: '#c58c7b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c58c7b',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--muted)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#c58c7b',
  },
}

const summaryCardSx = {
  border: '1px solid var(--border)',
  borderRadius: '1.5rem',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.86) 48%, rgba(253,231,217,0.66) 100%)',
  boxShadow: 'var(--shadow-card)',
}

const roleChipSx = {
  admin: { bgcolor: '#111111', color: '#ffffff' },
  editor: { bgcolor: '#fde7d9', color: '#111111' },
  viewer: { bgcolor: '#f0c4cf', color: '#111111' },
}

const UsersPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [users, setUsers] = useState(seed.users)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    role: 'all',
    gender: 'all',
    status: 'all',
  })
  const [modal, setModal] = useState({ open: false, id: null })
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const resetForm = () => {
    setForm({ ...blankForm })
    setErrors({})
  }

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null })
    setForm(user ? { ...blankForm, ...user } : { ...blankForm })
    setErrors({})
  }

  const closeModal = () => {
    setModal({ open: false, id: null })
    setShowPassword(false)
    resetForm()
  }

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}
    const email = form.email.trim().toLowerCase()
    const username = form.username.trim().toLowerCase()
    const password = form.password.trim()
    const contactNumber = form.contactNumber.trim()
    const age = form.age.trim()

    ;[
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`
      }
    })

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
      nextErrors.email = 'Email address already exists.'
    }

    if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
      nextErrors.username = 'Username already exists.'
    }

    if (!nextErrors.username && username.includes(' ')) {
      nextErrors.username = 'Username must not contain spaces.'
    }

    if (!nextErrors.password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.'
    }

    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number only.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    }

    setUsers((prev) =>
      modal.id
        ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
        : [
            ...prev,
            {
              id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
              ...nextUser,
            },
          ]
    )

    closeModal()
  }

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)))
  }

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    sx: textFieldSx,
    ...extra,
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={labelize(row.role)}
          sx={{
            ...roleChipSx[row.role],
            fontWeight: 800,
            borderRadius: '999px',
            border: '1px solid rgba(17,17,17,0.08)',
          }}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          sx={{
            bgcolor: row.isActive ? 'rgba(155,176,69,0.16)' : 'rgba(17,17,17,0.06)',
            color: row.isActive ? COLORS.success : COLORS.muted,
            fontWeight: 800,
            borderRadius: '999px',
          }}
          variant="filled"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
            sx={{
              color: COLORS.info,
              borderColor: COLORS.info,
              borderRadius: '999px',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                borderColor: COLORS.info,
                bgcolor: 'rgba(125,145,209,0.08)',
              },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(row.id)}
            sx={{
              bgcolor: row.isActive ? COLORS.warning : COLORS.success,
              borderRadius: '999px',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { bgcolor: row.isActive ? '#b5612a' : '#8aa13b' },
            }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ]

  const filteredRows = users.filter((user) => {
    const searchedDetail = searchQuery.toLowerCase()

    const matchedSearch =
      user.firstName.toLowerCase().includes(searchedDetail) ||
      user.lastName.toLowerCase().includes(searchedDetail) ||
      user.email.toLowerCase().includes(searchedDetail) ||
      user.username.toLowerCase().includes(searchedDetail)

    const matchedRole = filters.role === 'all' || user.role === filters.role
    const matchedGender = filters.gender === 'all' || user.gender === filters.gender
    const userStatus = user.isActive ? 'active' : 'inactive'
    const matchedStatus = filters.status === 'all' || userStatus === filters.status

    return matchedSearch && matchedRole && matchedGender && matchedStatus
  })

  const summaryCards = [
    {
      label: 'Active Users',
      value: users.filter((user) => user.isActive).length,
      detail: 'Members who can currently manage archive content.',
    },
    {
      label: 'Editors',
      value: users.filter((user) => user.role === 'editor').length,
      detail: 'Main contributors shaping cafe write-ups and edits.',
    },
    {
      label: 'Visible Results',
      value: filteredRows.length,
      detail: 'Users matching the current search and dropdown filters.',
    },
  ]

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: '80vh', width: '100%' }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 6, // Increased margin to lower the following filters
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: COLORS.muted }}>
          Cafe Atlas Admin
        </Typography>
        <Typography className="font-editorial" sx={{ fontSize: { xs: '2.5rem', md: '3.2rem' }, lineHeight: 0.94, color: COLORS.text }}>
          Users
        </Typography>
      </Box>

      {/* Filters and Actions Row - Positioned lower now */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end', // Aligns buttons and inputs to the bottom of this container
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', width: { xs: '100%', xl: 'auto' } }}>
          <TextField
            id="users-search-bar"
            variant="outlined"
            placeholder="Search user..."
            size="small"
            sx={{
              minWidth: { xs: '100%', sm: 240 },
              ...textFieldSx,
            }}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: COLORS.muted }} fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            sx={{
              minWidth: 132,
              '&:hover .MuiInputLabel-root': {
                color: '#c58c7b',
              },
            }}
            size="small"
          >
            <InputLabel id="role-input-label" sx={labelDesign}>
              Role
            </InputLabel>
            <Select
              labelId="role-input-label"
              label="Role"
              sx={filterDesign}
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              minWidth: 132,
              '&:hover .MuiInputLabel-root': {
                color: '#c58c7b',
              },
            }}
            size="small"
          >
            <InputLabel id="gender-input-label" sx={labelDesign}>
              Gender
            </InputLabel>
            <Select
              labelId="gender-input-label"
              label="Gender"
              sx={filterDesign}
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              minWidth: 132,
              '&:hover .MuiInputLabel-root': {
                color: '#c58c7b',
              },
            }}
            size="small"
          >
            <InputLabel id="status-input-label" sx={labelDesign}>
              Status
            </InputLabel>
            <Select
              labelId="status-input-label"
              label="Status"
              sx={filterDesign}
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{
            bgcolor: COLORS.primary,
            borderRadius: '999px',
            px: 3.6,
            height: '44px', // Matches the filter height for alignment
            fontWeight: 800,
            textTransform: 'none',
            boxShadow: '0 10px 24px rgba(197,140,123,0.28)',
            '&:hover': { bgcolor: '#b47b6a' },
          }}
        >
          Add User
        </Button>
      </Box>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: '18px' }}>
          {seed.error}
        </Alert>
      ) : null}

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, minmax(0, 1fr))',
          },
          mb: 4,
        }}
      >
        {summaryCards.map((card) => (
          <Box key={card.label} sx={{ ...summaryCardSx, px: 2.6, py: 2.4 }}>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.muted }}>
              {card.label}
            </Typography>
            <Typography sx={{ mt: 1, fontSize: '1.85rem', fontWeight: 800, color: COLORS.text }}>
              {card.value}
            </Typography>
            <Typography sx={{ mt: 0.9, fontSize: '0.84rem', lineHeight: 1.7, color: COLORS.muted }}>
              {card.detail}
            </Typography>
          </Box>
        ))}
      </Box>

      <Paper
        sx={{
          p: { xs: 2.2, md: 3 },
          borderRadius: '2rem',
          boxShadow: 'var(--shadow-panel-soft)',
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.9) 52%, rgba(253,231,217,0.4) 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #c58c7b, #f0c4cf)',
          },
        }}
      >
        {users.length ? (
          <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              localeText={{
                noRowsLabel: 'No users match your search or filters.',
              }}
              sx={{
                border: 'none',
                backgroundColor: 'transparent',
                '& .MuiDataGrid-columnHeaders': {
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: 'rgba(245,245,243,0.86)',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: '800 !important',
                  color: 'var(--text)',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                },
                '& .MuiDataGrid-columnSeparator': { display: 'none' },
                '& .MuiDataGrid-row': {
                  borderBottom: '1px solid rgba(17,17,17,0.06)',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'rgba(253,231,217,0.22)',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none',
                  color: 'var(--text)',
                },
                '& .MuiCheckbox-root': {
                  color: `${COLORS.primary} !important`,
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid var(--border)',
                  backgroundColor: 'rgba(255,255,255,0.84)',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info" sx={{ borderRadius: '18px' }}>
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '28px',
            p: 1,
            border: '1px solid var(--border)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(253,231,217,0.82) 100%)',
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle className="font-editorial" sx={{ fontWeight: 700, fontSize: '2rem', color: COLORS.text }}>
            {modal.id ? 'Edit User' : 'Add User'}
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              px: { xs: 2, sm: 3 },
              borderTop: 'none',
              borderBottom: 'none',
            }}
          >
            <Stack spacing={3} sx={{ pt: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(event) => event.preventDefault()}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                })}
              />
              <TextField
                {...fieldProps('address', 'Address', {
                  multiline: true,
                  rows: 3,
                })}
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: COLORS.success,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        bgcolor: COLORS.success,
                      },
                    }}
                  />
                }
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
                sx={{ color: COLORS.text }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 4, py: 3 }}>
            <Button onClick={closeModal} sx={{ color: COLORS.muted, fontWeight: 700, textTransform: 'none' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: COLORS.primary,
                borderRadius: '999px',
                px: 4,
                fontWeight: 800,
                textTransform: 'none',
                boxShadow: '0 10px 24px rgba(197,140,123,0.28)',
                '&:hover': { bgcolor: '#b47b6a' },
              }}
            >
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

export default UsersPage