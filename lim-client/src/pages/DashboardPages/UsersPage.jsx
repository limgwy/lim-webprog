import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import { Avatar, Box, Chip, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const panelSx = {
  border: '1px solid var(--border)',
  borderRadius: '2rem',
  backgroundColor: 'var(--surface)',
  boxShadow: 'var(--shadow-panel-soft)',
}

const eyebrowSx = {
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
}

const roleStyles = {
  Admin: { bgcolor: '#111111', color: '#ffffff' },
  Curator: { bgcolor: '#fde7d9', color: '#111111' },
  Writer: { bgcolor: '#f5c2e7', color: '#111111' },
  Scout: { bgcolor: '#efe9df', color: '#111111' },
}

const statusStyles = {
  Active: { bgcolor: 'rgba(17,17,17,0.08)', color: '#111111' },
  Invited: { bgcolor: 'rgba(253,231,217,0.95)', color: '#111111' },
  Reviewing: { bgcolor: 'rgba(245,194,231,0.45)', color: '#111111' },
}

const userRows = [
  {
    id: 1,
    name: 'Mikaela Torres',
    email: 'mikaela@cafeatlas.studio',
    role: 'Admin',
    focus: 'Makati',
    specialty: 'Quiet cafe',
    status: 'Active',
    lastActive: '8 mins ago',
  },
  {
    id: 2,
    name: 'Lucas Villanueva',
    email: 'lucas@cafeatlas.studio',
    role: 'Curator',
    focus: 'BGC',
    specialty: 'Social cafe',
    status: 'Active',
    lastActive: '25 mins ago',
  },
  {
    id: 3,
    name: 'Nadine Cruz',
    email: 'nadine@cafeatlas.studio',
    role: 'Writer',
    focus: 'Intramuros',
    specialty: 'Date cafe',
    status: 'Reviewing',
    lastActive: '1 hr ago',
  },
  {
    id: 4,
    name: 'Paolo Reyes',
    email: 'paolo@cafeatlas.studio',
    role: 'Scout',
    focus: 'Antipolo',
    specialty: 'Scenic cafe',
    status: 'Active',
    lastActive: '2 hrs ago',
  },
  {
    id: 5,
    name: 'Janelle Santos',
    email: 'janelle@cafeatlas.studio',
    role: 'Curator',
    focus: 'Taft',
    specialty: 'Work cafe',
    status: 'Invited',
    lastActive: 'Pending',
  },
  {
    id: 6,
    name: 'Tristan Gomez',
    email: 'tristan@cafeatlas.studio',
    role: 'Writer',
    focus: 'Sampaloc',
    specialty: 'Study-friendly cafe',
    status: 'Active',
    lastActive: 'Today',
  },
]

const summaryCards = [
  {
    label: 'Active Members',
    value: `${userRows.filter((user) => user.status === 'Active').length}`,
    detail: 'Currently updating archive entries and notes.',
    icon: PeopleOutlineOutlinedIcon,
  },
  {
    label: 'Pending Invites',
    value: `${userRows.filter((user) => user.status === 'Invited').length}`,
    detail: 'Writers and curators still waiting for access.',
    icon: PersonAddAltOutlinedIcon,
  },
  {
    label: 'Verified Roles',
    value: `${new Set(userRows.map((user) => user.role)).size}`,
    detail: 'Distinct role types used in the dashboard.',
    icon: VerifiedOutlinedIcon,
  },
]

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

const columns = [
  {
    field: 'name',
    headerName: 'Member',
    flex: 1.5,
    minWidth: 240,
    sortable: false,
    renderCell: ({ row }) => (
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, py: 1 }}>
        <Avatar
          sx={{
            height: 42,
            width: 42,
            bgcolor: '#111111',
            color: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 700,
          }}
        >
          {getInitials(row.name)}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
            {row.name}
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
            {row.email}
          </Typography>
        </Box>
      </Stack>
    ),
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 0.8,
    minWidth: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value}
        size="small"
        sx={{
          ...roleStyles[value],
          borderRadius: '999px',
          fontWeight: 700,
          border: '1px solid rgba(17,17,17,0.08)',
        }}
      />
    ),
  },
  {
    field: 'focus',
    headerName: 'Focus Area',
    flex: 0.8,
    minWidth: 130,
  },
  {
    field: 'specialty',
    headerName: 'Specialty',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value}
        size="small"
        sx={{
          ...statusStyles[value],
          borderRadius: '999px',
          fontWeight: 700,
          border: '1px solid rgba(17,17,17,0.08)',
        }}
      />
    ),
  },
  {
    field: 'lastActive',
    headerName: 'Last Active',
    flex: 0.8,
    minWidth: 120,
  },
]

function UsersPage() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          ...panelSx,
          overflow: 'hidden',
          position: 'relative',
          px: { xs: 3, md: 4 },
          py: { xs: 3, md: 4 },
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.86) 46%, rgba(253,231,217,0.82) 100%)',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at top right, rgba(245,194,231,0.26), transparent 24%), radial-gradient(circle at bottom left, rgba(253,231,217,0.7), transparent 32%)',
          }}
        />

        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, minmax(0, 1fr))',
              },
            }}
          >
            {summaryCards.map((card) => (
              <Box
                key={card.label}
                sx={{
                  border: '1px solid var(--border)',
                  borderRadius: '1.6rem',
                  bgcolor: 'rgba(255,255,255,0.72)',
                  px: 2.5,
                  py: 2.5,
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Box>
                    <Typography sx={eyebrowSx}>{card.label}</Typography>
                    <Typography sx={{ mt: 1.2, fontSize: '1.9rem', fontWeight: 800, color: 'var(--text)' }}>
                      {card.value}
                    </Typography>
                    <Typography sx={{ mt: 1, fontSize: '0.84rem', color: 'var(--muted)' }}>
                      {card.detail}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 42,
                      width: 42,
                      borderRadius: '1rem',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'rgba(253,231,217,0.8)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                  >
                    <card.icon fontSize="small" />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ ...panelSx, px: { xs: 2, md: 3 }, py: { xs: 3, md: 3.5 } }}>
        <Typography sx={{ ...eyebrowSx, px: { xs: 1, md: 1.5 } }}>Directory</Typography>
        <Typography className="font-editorial" sx={{ mt: 1, px: { xs: 1, md: 1.5 }, fontSize: '2rem', lineHeight: 1, color: 'var(--text)' }}>
          User list and access details
        </Typography>

        <Box sx={{ mt: 2.5, height: 520, width: '100%' }}>
          <DataGrid
            rows={userRows}
            columns={columns}
            disableColumnMenu
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            rowHeight={72}
            sx={{
              border: 'none',
              '--DataGrid-overlayHeight': '300px',
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'rgba(245,245,243,0.9)',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: '0.7rem',
                fontWeight: '800 !important',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid rgba(17,17,17,0.06)',
                backgroundColor: 'transparent',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(253,231,217,0.24)',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
                color: 'var(--text)',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid var(--border)',
                backgroundColor: 'rgba(255,255,255,0.88)',
              },
            }}
          />
        </Box>
      </Box>
    </Stack>
  )
}

export default UsersPage
