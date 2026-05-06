import { Box, Stack, Typography } from '@mui/material'
import {
  decliningTrafficPages,
  overviewSnapshot,
  seoOpportunities,
  topPerformingCafes,
  trafficOverview,
  trafficTimeline,
  underperformingPosts,
} from './dashboardInsights'

const panelSx = {
  border: '1px solid var(--border)',
  borderRadius: '1.5rem',
  backgroundColor: 'rgba(255,255,255,0.9)',
  boxShadow: 'var(--shadow-panel-soft)',
}

const eyebrowSx = {
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
}

const compactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const percent = (value) => `${value.toFixed(1)}%`
const minutes = (value) => `${value.toFixed(1)} min`
const weeklyTrafficPeak = Math.max(...trafficTimeline.map((item) => item.visits))

const summaryCards = [
  ['Total Visits', compactNumber.format(trafficOverview.totalVisits)],
  ['Search Visits', compactNumber.format(trafficOverview.searchVisits)],
  ['Engagement Rate', percent(trafficOverview.engagementRate)],
  ['Open Opportunities', `${overviewSnapshot.opportunityCount}`],
]

function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {summaryCards.map(([label, value]) => (
          <Box key={label} sx={{ ...panelSx, px: 2.4, py: 2.2, backgroundColor: 'rgba(255,255,255,0.82)' }}>
            <Typography sx={eyebrowSx}>{label}</Typography>
            <Typography sx={{ mt: 1, fontSize: '1.85rem', fontWeight: 800, color: 'var(--text)' }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            xl: 'repeat(2, minmax(0, 1fr))',
          },
        }}
      >
        <Box sx={{ ...panelSx, px: 3, py: 3 }}>
          <Typography sx={eyebrowSx}>Top & Trending Cafes</Typography>
          <Typography sx={{ mt: 1, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>
            Current leaders
          </Typography>

          <Stack spacing={1.4} sx={{ mt: 2.5 }}>
            {topPerformingCafes.slice(0, 3).map((item, index) => (
              <Box
                key={item.name}
                sx={{
                  borderRadius: '1rem',
                  border: '1px solid var(--border)',
                  bgcolor: 'rgba(253,231,217,0.34)',
                  px: 2,
                  py: 1.8,
                }}
              >
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Box>
                    <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>#{index + 1}</Typography>
                    <Typography sx={{ mt: 0.4, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text)' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontSize: '0.82rem', color: 'var(--muted)' }}>
                      {item.location} / {percent(item.growthRate)} growth
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                    {compactNumber.format(item.views)}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ ...panelSx, px: 3, py: 3 }}>
          <Typography sx={eyebrowSx}>Traffic & Engagement</Typography>
          <Typography sx={{ mt: 1, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>
            Attention quality
          </Typography>

          <Box
            sx={{
              mt: 2.5,
              display: 'grid',
              gap: 1.5,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
              },
            }}
          >
            {[
              ['Avg Time', minutes(trafficOverview.averageTimeOnPage)],
              ['Bounce Rate', percent(trafficOverview.bounceRate)],
              ['Scroll Depth', percent(trafficOverview.scrollDepth)],
              ['Interactions', compactNumber.format(trafficOverview.totalInteractions)],
            ].map(([label, value]) => (
              <Box key={label} sx={{ borderRadius: '1rem', border: '1px solid var(--border)', bgcolor: 'rgba(255,255,255,0.66)', px: 1.8, py: 1.6 }}>
                <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>{label}</Typography>
                <Typography sx={{ mt: 0.6, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 2.5 }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>Traffic pulse</Typography>
            <Stack direction="row" alignItems="end" spacing={1} sx={{ mt: 1.5, height: 110 }}>
              {trafficTimeline.map((point) => (
                <Box key={point.label} sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      height: `${(point.visits / weeklyTrafficPeak) * 100}%`,
                      minHeight: 22,
                      borderRadius: '999px 999px 0 0',
                      background: 'linear-gradient(180deg, #111111, #c58c7b)',
                    }}
                  />
                  <Typography sx={{ mt: 0.8, textAlign: 'center', fontSize: '0.7rem', color: 'var(--muted)' }}>
                    {point.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ ...panelSx, px: 3, py: 3 }}>
          <Typography sx={eyebrowSx}>Search & SEO Insights</Typography>
          <Typography sx={{ mt: 1, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>
            Search signals
          </Typography>

          <Box sx={{ mt: 2.5, borderRadius: '1rem', border: '1px solid var(--border)', bgcolor: 'rgba(253,231,217,0.34)', px: 2, py: 1.8 }}>
            <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Top keyword</Typography>
            <Typography sx={{ mt: 0.5, fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
              {overviewSnapshot.topKeyword.keyword}
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: '0.82rem', color: 'var(--muted)' }}>
              {compactNumber.format(overviewSnapshot.topKeyword.visits)} visits into {overviewSnapshot.topKeyword.page}
            </Typography>
          </Box>

          <Stack spacing={1.4} sx={{ mt: 2 }}>
            {seoOpportunities.slice(0, 3).map((item) => (
              <Box key={item.title} sx={{ borderRadius: '1rem', border: '1px solid var(--border)', bgcolor: 'rgba(255,255,255,0.66)', px: 2, py: 1.6 }}>
                <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                  {item.title}
                </Typography>
                <Typography sx={{ mt: 0.45, fontSize: '0.8rem', color: 'var(--muted)' }}>
                  {compactNumber.format(item.impressions)} impressions / {percent(item.ctr)} CTR
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ ...panelSx, px: 3, py: 3 }}>
          <Typography sx={eyebrowSx}>Content Opportunities</Typography>
          <Typography sx={{ mt: 1, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>
            Next actions
          </Typography>

          <Stack spacing={1.4} sx={{ mt: 2.5 }}>
            <Box sx={{ borderRadius: '1rem', border: '1px solid var(--border)', bgcolor: 'rgba(253,231,217,0.34)', px: 2, py: 1.8 }}>
              <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Biggest decline</Typography>
              <Typography sx={{ mt: 0.5, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text)' }}>
                {overviewSnapshot.biggestDecline.title}
              </Typography>
              <Typography sx={{ mt: 0.45, fontSize: '0.8rem', color: 'var(--muted)' }}>
                {percent(overviewSnapshot.biggestDecline.growthRate)} vs previous cycle
              </Typography>
            </Box>

            <Box sx={{ borderRadius: '1rem', border: '1px solid var(--border)', bgcolor: 'rgba(255,255,255,0.66)', px: 2, py: 1.6 }}>
              <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                {underperformingPosts[0].title}
              </Typography>
              <Typography sx={{ mt: 0.45, fontSize: '0.8rem', color: 'var(--muted)' }}>
                {compactNumber.format(underperformingPosts[0].views)} visits / {percent(underperformingPosts[0].bounceRate)} bounce
              </Typography>
            </Box>

            <Box sx={{ borderRadius: '1rem', border: '1px solid var(--border)', bgcolor: 'rgba(255,255,255,0.66)', px: 2, py: 1.6 }}>
              <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                {decliningTrafficPages[0].title}
              </Typography>
              <Typography sx={{ mt: 0.45, fontSize: '0.8rem', color: 'var(--muted)' }}>
                Refresh and recirculate this post soon
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export default DashboardPage
