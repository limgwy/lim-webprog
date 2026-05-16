import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { alpha, styled, useTheme } from '@mui/material/styles'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { getCurrentUser, setCurrentUser } from '../services/userStore'

const drawerWidth = 232

const dashboardNavItems = [
  { label: 'Overview', title: 'Overview', to: '/dashboard', icon: DashboardOutlinedIcon },
  { label: 'Reports', title: 'Reports', to: '/dashboard/reports', icon: AssessmentOutlinedIcon },
  { label: 'Articles', title: 'Articles', to: '/dashboard/articles', icon: ArticleOutlinedIcon },
  { label: 'Users', title: 'Users', to: '/dashboard/users', icon: PeopleOutlineOutlinedIcon, adminOnly: true },
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  padding: theme.spacing(1.2, 1.5),
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'rgba(255,255,255,0.84)',
  color: 'var(--text)',
  borderBottom: '1px solid var(--border)',
  backdropFilter: 'blur(16px)',
  boxShadow: 'none',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRight: '1px solid var(--border)',
    backdropFilter: 'blur(18px)',
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.4),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--muted)',
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '999px',
  backgroundColor: alpha(theme.palette.common.black, 0.03),
  border: '1px solid var(--border)',
  width: '100%',
  maxWidth: 280,
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'var(--text)',
  fontSize: '0.9rem',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1.3, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    '&::placeholder': {
      color: '#6b7280',
      opacity: 1,
    },
  },
}))

const eyebrowSx = {
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
}

const getPageTitle = (pathname) => dashboardNavItems.find(({ to }) => to === pathname)?.title ?? 'Dashboard'

const BrandMark = ({ open }) => (
  <Box
    component={Link}
    to="/"
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: open ? 'flex-start' : 'center',
      gap: open ? 1.2 : 0,
      minWidth: 0,
      textDecoration: 'none',
      color: 'var(--text)',
    }}
  >
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        height: 36,
        width: 36,
        borderRadius: '999px',
        border: '1px solid var(--border)',
        background: 'linear-gradient(135deg, #fde7d9, #fff8f5 48%, #f5c2e7)',
        color: 'var(--text)',
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.14em' }}>CA</Typography>
    </Box>

    {open && (
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.84rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Cafe Atlas
        </Typography>
        <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Admin</Typography>
      </Box>
    )}
  </Box>
)

function DashLayout() {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const visibleNavItems = dashboardNavItems.filter((item) => !item.adminOnly || currentUser?.role === 'admin')
  const pageTitle = getPageTitle(location.pathname)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  const handleReturnHome = () => navigate('/')
  const handleSignOut = () => {
    setCurrentUser(null)
    navigate('/auth/signin')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(180deg, #fed9c9 0%, #fbcbd1 44%, #f2b5df 100%)',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at top left, rgba(255,255,255,0.48), transparent 22%), radial-gradient(circle at bottom right, rgba(255,255,255,0.28), transparent 24%)',
        }}
      />

      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ minHeight: { xs: 72, md: 76 }, gap: 2 }}>
          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              color: 'var(--text)',
              border: '1px solid var(--border)',
              bgcolor: 'rgba(255,255,255,0.8)',
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography sx={eyebrowSx}>Cafe Atlas Admin</Typography>
            <Typography noWrap sx={{ mt: 0.35, fontSize: { xs: '1.35rem', md: '1.65rem' }, fontWeight: 700, color: 'var(--text)' }}>
              {pageTitle}
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', lg: 'block' }, width: '100%', maxWidth: 280 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon fontSize="small" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search dashboard" />
            </Search>
          </Box>

          <Button
            variant="outlined"
            onClick={handleReturnHome}
            sx={{
              borderRadius: '999px',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              px: 2,
              py: 0.9,
              fontWeight: 600,
              textTransform: 'none',
              bgcolor: 'rgba(255,255,255,0.82)',
            }}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            onClick={handleSignOut}
            sx={{
              borderRadius: '999px',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              px: 2,
              py: 0.9,
              fontWeight: 600,
              textTransform: 'none',
              bgcolor: 'rgba(255,255,255,0.82)',
            }}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <BrandMark open={open} />
          {open && (
            <IconButton onClick={handleDrawerClose} sx={{ color: 'var(--text)' }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </DrawerHeader>

        <Divider sx={{ borderColor: 'rgba(17,17,17,0.08)' }} />

        <List sx={{ px: 1.25, pt: 1.25 }}>
          {visibleNavItems.map((item) => (
            <ListItem key={item.to} disablePadding sx={{ display: 'block', mb: 0.75 }}>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                sx={{
                  minHeight: 50,
                  px: 1.6,
                  borderRadius: '1rem',
                  justifyContent: open ? 'initial' : 'center',
                  color: 'var(--muted)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.84)',
                    color: 'var(--text)',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255,255,255,0.92)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    '& .MuiListItemIcon-root': {
                      color: 'var(--text)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.6 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: open ? 1 : 0,
                    '& .MuiListItemText-primary': {
                      fontWeight: 600,
                      fontSize: '0.94rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, position: 'relative', px: { xs: 2, md: 3 }, pb: { xs: 3, md: 4 } }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashLayout
