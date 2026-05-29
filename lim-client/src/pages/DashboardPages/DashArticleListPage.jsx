import { useEffect, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
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
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import { articleImageOptions, categories, getArticles, getArticlesAsync, saveArticleAsync } from '../../services/articleStore'

const COLORS = {
  primary: '#c58c7b',
  success: '#9bb045',
  info: '#7d91d1',
  warning: '#ca6f32',
  bg: 'transparent',
  text: 'var(--text)',
  muted: 'var(--muted)',
  border: 'var(--border)',
}

const blankForm = {
  name: '',
  title: '',
  author: '',
  date: '',
  category: categories[0] ?? 'Cafe',
  summary: '',
  imageKey: articleImageOptions[0]?.value ?? '',
  content: '',
  isPublished: true,
}

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '')

const slugify = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    backgroundColor: 'rgba(255,255,255,0.82)',
    '& fieldset': { borderColor: 'var(--border)' },
    '&:hover fieldset': { borderColor: COLORS.primary },
    '&.Mui-focused fieldset': { borderColor: COLORS.primary },
  },
  '& .MuiInputLabel-root': { color: 'var(--muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: COLORS.primary },
}

const filterDesign = {
  height: '44px',
  borderRadius: '14px',
  backgroundColor: 'rgba(255,255,255,0.82)',
  '& fieldset': { border: '1px solid var(--border)' },
  '&:hover fieldset': { borderColor: `${COLORS.primary} !important` },
  '&.Mui-focused fieldset': { borderColor: `${COLORS.primary} !important` },
}

const labelDesign = {
  color: 'var(--muted)',
  fontSize: '0.9rem',
  '&.Mui-focused': { color: COLORS.primary },
}

const summaryCardSx = {
  border: '1px solid var(--border)',
  borderRadius: '1.5rem',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.86) 48%, rgba(253,231,217,0.66) 100%)',
  boxShadow: 'var(--shadow-card)',
}

const DashArticleListPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [articles, setArticles] = useState(() => getArticles())
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ category: 'all', status: 'all' })
  const [modal, setModal] = useState({ open: false, id: null })
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [requestError, setRequestError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let isMounted = true

    getArticlesAsync().then((nextArticles) => {
      if (isMounted) {
        setArticles(nextArticles)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null })
    setForm(
      article
        ? {
            ...blankForm,
            ...article,
            content: article.content.join('\n'),
          }
        : { ...blankForm }
    )
    setErrors({})
    setRequestError('')
  }

  const closeModal = () => {
    setModal({ open: false, id: null })
    setForm({ ...blankForm })
    setErrors({})
  }

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !modal.id ? { name: slugify(value) } : {}),
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}
    const slug = slugify(form.name || form.title)

    ;[
      ['title', 'Title'],
      ['name', 'Slug'],
      ['author', 'Location and mood'],
      ['date', 'Rating and status'],
      ['category', 'Category'],
      ['summary', 'Summary'],
      ['imageKey', 'Cover image'],
      ['content', 'Article notes'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`
      }
    })

    if (!nextErrors.name && !slug) {
      nextErrors.name = 'Use letters or numbers in the slug.'
    }

    if (!nextErrors.name && articles.some((article) => article.id !== modal.id && article.name === slug)) {
      nextErrors.name = 'Article slug already exists.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    const nextArticle = {
      title: form.title.trim(),
      name: slugify(form.name || form.title),
      author: form.author.trim(),
      date: form.date.trim(),
      category: form.category.trim(),
      summary: form.summary.trim(),
      imageKey: form.imageKey,
      content: form.content
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      isPublished: form.isPublished,
    }

    try {
      setIsSaving(true)
      const savedArticle = await saveArticleAsync(modal.id ? { ...nextArticle, id: modal.id } : nextArticle)
      setArticles((prev) =>
        modal.id
          ? prev.map((article) => (article.id === modal.id ? savedArticle : article))
          : [...prev.filter((article) => article.id !== savedArticle.id), savedArticle]
      )
    } catch (error) {
      setRequestError(error.message || 'Unable to save article.')
      setIsSaving(false)
      return
    }

    setIsSaving(false)
    closeModal()
  }

  const togglePublished = async (id) => {
    const article = articles.find((item) => item.id === id)

    if (!article) {
      return
    }

    const savedArticle = await saveArticleAsync({ ...article, isPublished: !article.isPublished })
    setArticles((prev) => prev.map((item) => (item.id === id ? savedArticle : item)))
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

  const filteredRows = articles.filter((article) => {
    const searchedDetail = searchQuery.toLowerCase()
    const matchedSearch =
      article.title.toLowerCase().includes(searchedDetail) ||
      article.author.toLowerCase().includes(searchedDetail) ||
      article.category.toLowerCase().includes(searchedDetail) ||
      article.name.toLowerCase().includes(searchedDetail)
    const matchedCategory = filters.category === 'all' || article.category === filters.category
    const status = article.isPublished ? 'published' : 'draft'
    const matchedStatus = filters.status === 'all' || status === filters.status

    return matchedSearch && matchedCategory && matchedStatus
  })

  const summaryCards = [
    {
      label: 'Published',
      value: articles.filter((article) => article.isPublished).length,
      detail: 'Articles currently available on the public ArticleListPage.',
    },
    {
      label: 'Drafts',
      value: articles.filter((article) => !article.isPublished).length,
      detail: 'Hidden records still editable from the dashboard.',
    },
    {
      label: 'Visible Results',
      value: filteredRows.length,
      detail: 'Articles matching your search and dropdown filters.',
    },
  ]

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', flex: 1.2, minWidth: 240 },
    { field: 'name', headerName: 'Slug', minWidth: 160 },
    { field: 'category', headerName: 'Category', minWidth: 150 },
    { field: 'author', headerName: 'Location / Mood', flex: 1, minWidth: 220 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isPublished ? 'Published' : 'Draft'}
          sx={{
            bgcolor: row.isPublished ? 'rgba(155,176,69,0.16)' : 'rgba(17,17,17,0.06)',
            color: row.isPublished ? COLORS.success : COLORS.muted,
            fontWeight: 800,
            borderRadius: '999px',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 240,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={() => openModal(row)}
            sx={{
              color: COLORS.info,
              borderColor: COLORS.info,
              borderRadius: '999px',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { borderColor: COLORS.info, bgcolor: 'rgba(125,145,209,0.08)' },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => togglePublished(row.id)}
            sx={{
              bgcolor: row.isPublished ? COLORS.warning : COLORS.success,
              borderRadius: '999px',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { bgcolor: row.isPublished ? '#b5612a' : '#8aa13b' },
            }}
          >
            {row.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
        </Stack>
      ),
    },
  ]

  const handleFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: '80vh', width: '100%' }}>
      <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: COLORS.muted }}>
          Cafe Atlas Admin
        </Typography>
        <Typography className="font-editorial" sx={{ fontSize: { xs: '2.5rem', md: '3.2rem' }, lineHeight: 0.94, color: COLORS.text }}>
          Articles
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', width: { xs: '100%', xl: 'auto' } }}>
          <TextField
            id="articles-search-bar"
            variant="outlined"
            placeholder="Search article..."
            size="small"
            sx={{ minWidth: { xs: '100%', sm: 260 }, ...textFieldSx }}
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

          <FormControl sx={{ minWidth: 164 }} size="small">
            <InputLabel id="article-category-label" sx={labelDesign}>
              Category
            </InputLabel>
            <Select labelId="article-category-label" label="Category" sx={filterDesign} name="category" value={filters.category} onChange={handleFilterChange}>
              <MenuItem value="all">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 142 }} size="small">
            <InputLabel id="article-status-label" sx={labelDesign}>
              Status
            </InputLabel>
            <Select labelId="article-status-label" label="Status" sx={filterDesign} name="status" value={filters.status} onChange={handleFilterChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
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
            height: '44px',
            fontWeight: 800,
            textTransform: 'none',
            boxShadow: '0 10px 24px rgba(197,140,123,0.28)',
            '&:hover': { bgcolor: '#b47b6a' },
          }}
        >
          Add Article
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, mb: 4 }}>
        {summaryCards.map((card) => (
          <Box key={card.label} sx={{ ...summaryCardSx, px: 2.6, py: 2.4 }}>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.muted }}>
              {card.label}
            </Typography>
            <Typography sx={{ mt: 1, fontSize: '1.85rem', fontWeight: 800, color: COLORS.text }}>{card.value}</Typography>
            <Typography sx={{ mt: 0.9, fontSize: '0.84rem', lineHeight: 1.7, color: COLORS.muted }}>{card.detail}</Typography>
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
        {articles.length ? (
          <Box sx={{ height: 540, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
              localeText={{ noRowsLabel: 'No articles match your search or filters.' }}
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
                '& .MuiDataGrid-row': { borderBottom: '1px solid rgba(17,17,17,0.06)' },
                '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(253,231,217,0.22)' },
                '& .MuiDataGrid-cell': { borderBottom: 'none', color: 'var(--text)' },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid var(--border)',
                  backgroundColor: 'rgba(255,255,255,0.84)',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info" sx={{ borderRadius: '18px' }}>
            No articles found. Use Add Article to create your first dashboard article.
          </Alert>
        )}
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md" PaperProps={{ sx: { borderRadius: '28px', p: 1, border: '1px solid var(--border)', background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(253,231,217,0.82) 100%)' } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle className="font-editorial" sx={{ fontWeight: 700, fontSize: '2rem', color: COLORS.text }}>
            {modal.id ? 'Edit Article' : 'Add Article'}
          </DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, borderTop: 'none', borderBottom: 'none' }}>
            {requestError ? (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '18px' }}>
                {requestError}
              </Alert>
            ) : null}
            <Stack spacing={3} sx={{ pt: 2 }}>
              <TextField {...fieldProps('title', 'Title')} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('name', 'Slug')} />
                <TextField {...fieldProps('category', 'Category', { select: true })}>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('author', 'Location and Mood')} />
                <TextField {...fieldProps('date', 'Rating and Status')} />
              </Stack>
              <TextField {...fieldProps('summary', 'Summary', { multiline: true, rows: 3 })} />
              <TextField {...fieldProps('imageKey', 'Cover Image', { select: true })}>
                {articleImageOptions.map((image) => (
                  <MenuItem key={image.value} value={image.value}>
                    {labelize(image.label)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField {...fieldProps('content', 'Atmosphere Notes', { multiline: true, rows: 5 })} />
              <FormControlLabel
                control={<Switch name="isPublished" checked={form.isPublished} onChange={handleChange} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: COLORS.success }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: COLORS.success } }} />}
                label={form.isPublished ? 'Article status: Published' : 'Article status: Draft'}
                sx={{ color: COLORS.text }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 4, py: 3 }}>
            <Button onClick={closeModal} sx={{ color: COLORS.muted, fontWeight: 700, textTransform: 'none' }}>
              Cancel
            </Button>
            <Button disabled={isSaving} type="submit" variant="contained" sx={{ bgcolor: COLORS.primary, borderRadius: '999px', px: 4, fontWeight: 800, textTransform: 'none', boxShadow: '0 10px 24px rgba(197,140,123,0.28)', '&:hover': { bgcolor: '#b47b6a' } }}>
              {isSaving ? 'Saving...' : modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

export default DashArticleListPage
