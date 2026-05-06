import { Box, Stack, Typography } from '@mui/material'
import { BarChart, LineChart } from '@mui/x-charts'
import {
  decliningTrafficPages,
  interactionBreakdown,
  overviewSnapshot,
  promoteNowContent,
  searchLandingPages,
  seoOpportunities,
  topKeywords,
  topPerformingCafes,
  trafficOverview,
  trafficTimeline,
  trendingCafes,
  underperformingPosts,
} from './dashboardInsights'

const panelSx = {
  border: '1px solid var(--border)',
  borderRadius: '1.5rem',
  backgroundColor: 'rgba(255,255,255,0.9)',
  boxShadow: 'var(--shadow-panel-soft)',
}

const sectionCardSx = {
  border: '1px solid var(--border)',
  borderRadius: '1rem',
  backgroundColor: 'rgba(253,231,217,0.3)',
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

const summaryCards = [
  ['Best Performer', overviewSnapshot.bestPerformer.title],
  ['Search Visits', compactNumber.format(trafficOverview.searchVisits)],
  ['Open Opportunities', `${overviewSnapshot.opportunityCount}`],
]

const chartSx = {
  '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
    stroke: 'rgba(17,17,17,0.12)',
  },
  '& .MuiChartsAxis-tickLabel, & .MuiChartsLegend-label': {
    fill: '#6b7280',
    color: '#6b7280',
    fontSize: 11,
  },
  '& .MuiMarkElement-root': {
    stroke: '#ffffff',
    strokeWidth: 2,
  },
}

function ReportsPage() {
  return (
    <Stack spacing={3}>
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
        {summaryCards.map(([label, value]) => (
          <Box key={label} sx={{ ...panelSx, px: 2.4, py: 2.2, backgroundColor: 'rgba(255,255,255,0.82)' }}>
            <Typography sx={eyebrowSx}>{label}</Typography>
            <Typography sx={{ mt: 1, fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)' }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ ...panelSx, px: { xs: 3, md: 4 }, py: { xs: 3, md: 3.5 } }}>
        <Typography sx={eyebrowSx}>Top & Trending Cafes</Typography>
        <Typography sx={{ mt: 1, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
          Best-performing and fastest-growing posts
        </Typography>

        <Stack direction={{ xs: 'column', xl: 'row' }} spacing={3} sx={{ mt: 2.5 }}>
          <Stack spacing={1.4} sx={{ flex: 1 }}>
            {topPerformingCafes.map((cafe, index) => (
              <Box key={cafe.name} sx={{ ...sectionCardSx, px: 2, py: 1.8 }}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Box>
                    <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>#{index + 1} performer</Typography>
                    <Typography sx={{ mt: 0.45, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text)' }}>
                      {cafe.title}
                    </Typography>
                    <Typography sx={{ mt: 0.45, fontSize: '0.8rem', color: 'var(--muted)' }}>
                      {compactNumber.format(cafe.engagement)} engagements / {percent(cafe.growthRate)} growth
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                    {compactNumber.format(cafe.views)}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>

          <Box sx={{ flex: 1 }}>
            <BarChart
              xAxis={[
                {
                  data: trendingCafes.map((cafe) => cafe.title),
                  scaleType: 'band',
                  tickLabelStyle: { angle: -22, textAnchor: 'end' },
                },
              ]}
              series={[
                {
                  data: trendingCafes.map((cafe) => Number(cafe.growthRate.toFixed(1))),
                  label: 'Growth %',
                  color: '#111111',
                },
              ]}
              height={320}
              borderRadius={8}
              margin={{ top: 20, bottom: 100, left: 40, right: 20 }}
              sx={chartSx}
            />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ ...panelSx, px: { xs: 3, md: 4 }, py: { xs: 3, md: 3.5 } }}>
        <Typography sx={eyebrowSx}>Traffic & Engagement Overview</Typography>
        <Typography sx={{ mt: 1, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
          How visitors are behaving on cafe content
        </Typography>

        <Box
          sx={{
            mt: 2.5,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(5, minmax(0, 1fr))',
            },
          }}
        >
          {[
            ['Total Visits', compactNumber.format(trafficOverview.totalVisits)],
            ['Avg Time', minutes(trafficOverview.averageTimeOnPage)],
            ['Bounce Rate', percent(trafficOverview.bounceRate)],
            ['Scroll Depth', percent(trafficOverview.scrollDepth)],
            ['Interactions', compactNumber.format(trafficOverview.totalInteractions)],
          ].map(([label, value]) => (
            <Box key={label} sx={{ ...sectionCardSx, px: 2, py: 1.8 }}>
              <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>{label}</Typography>
              <Typography sx={{ mt: 0.65, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack direction={{ xs: 'column', xl: 'row' }} spacing={3} sx={{ mt: 2.5 }}>
          <Box sx={{ flex: 1.15 }}>
            <LineChart
              xAxis={[{ data: trafficTimeline.map((point) => point.label), scaleType: 'point' }]}
              series={[
                {
                  data: trafficTimeline.map((point) => point.visits),
                  label: 'Visits',
                  color: '#111111',
                  area: true,
                },
                {
                  data: trafficTimeline.map((point) => point.searchVisits),
                  label: 'Search Visits',
                  color: '#c58c7b',
                },
              ]}
              height={300}
              margin={{ top: 20, bottom: 60, left: 40, right: 20 }}
              sx={chartSx}
            />
          </Box>

          <Box sx={{ flex: 0.85 }}>
            <BarChart
              xAxis={[
                {
                  data: interactionBreakdown.map((item) => item.label),
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: interactionBreakdown.map((item) => item.value),
                  label: 'Interactions',
                    color: '#f0c4cf',
                },
              ]}
              height={300}
              borderRadius={8}
              margin={{ top: 20, bottom: 60, left: 40, right: 20 }}
              sx={chartSx}
            />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ ...panelSx, px: { xs: 3, md: 4 }, py: { xs: 3, md: 3.5 } }}>
        <Typography sx={eyebrowSx}>Search & SEO Insights</Typography>
        <Typography sx={{ mt: 1, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
          Search demand, top landing pages, and click gaps
        </Typography>

        <Stack direction={{ xs: 'column', xl: 'row' }} spacing={3} sx={{ mt: 2.5 }}>
          <Box sx={{ flex: 0.95 }}>
            <BarChart
              xAxis={[
                {
                  data: topKeywords.map((item) => item.keyword),
                  scaleType: 'band',
                  tickLabelStyle: { angle: -24, textAnchor: 'end' },
                },
              ]}
              series={[
                {
                  data: topKeywords.map((item) => item.visits),
                  label: 'Search Visits',
                  color: '#111111',
                },
              ]}
              height={300}
              borderRadius={8}
              margin={{ top: 20, bottom: 110, left: 40, right: 20 }}
              sx={chartSx}
            />
          </Box>

          <Stack spacing={2} sx={{ flex: 1.05 }}>
            <Box sx={{ ...sectionCardSx, px: 2, py: 1.8 }}>
              <Typography sx={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Top search page</Typography>
              <Typography sx={{ mt: 0.5, fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                {searchLandingPages[0].title}
              </Typography>
              <Typography sx={{ mt: 0.45, fontSize: '0.8rem', color: 'var(--muted)' }}>
                {compactNumber.format(searchLandingPages[0].visits)} visits / {percent(searchLandingPages[0].ctr)} CTR
              </Typography>
            </Box>

            <Stack spacing={1.2}>
              {seoOpportunities.map((item) => (
                <Box key={item.title} sx={{ borderRadius: '1rem', border: '1px solid var(--border)', bgcolor: 'rgba(255,255,255,0.66)', px: 2, py: 1.5 }}>
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 0.45, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {compactNumber.format(item.impressions)} impressions / {percent(item.ctr)} CTR
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ ...panelSx, px: { xs: 3, md: 4 }, py: { xs: 3, md: 3.5 } }}>
        <Typography sx={eyebrowSx}>Content Opportunities</Typography>
        <Typography sx={{ mt: 1, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
          Underperforming, declining, and promotable content
        </Typography>

        <Box
          sx={{
            mt: 2.5,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              xl: 'repeat(3, minmax(0, 1fr))',
            },
          }}
        >
          <Box sx={{ ...sectionCardSx, px: 2, py: 1.8 }}>
            <Typography sx={eyebrowSx}>Underperforming</Typography>
            <Stack spacing={1.2} sx={{ mt: 1.8 }}>
              {underperformingPosts.map((item) => (
                <Box key={item.title}>
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 0.4, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {compactNumber.format(item.views)} visits / {percent(item.bounceRate)} bounce
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ ...sectionCardSx, px: 2, py: 1.8 }}>
            <Typography sx={eyebrowSx}>Declining Traffic</Typography>
            <Stack spacing={1.2} sx={{ mt: 1.8 }}>
              {decliningTrafficPages.map((item) => (
                <Box key={item.title}>
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 0.4, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {percent(item.growthRate)} vs previous cycle
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ ...sectionCardSx, px: 2, py: 1.8 }}>
            <Typography sx={eyebrowSx}>Promote Now</Typography>
            <Stack spacing={1.2} sx={{ mt: 1.8 }}>
              {promoteNowContent.map((item) => (
                <Box key={item.title}>
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 0.4, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {percent(item.engagementRate)} engagement / {compactNumber.format(item.impressions)} impressions
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Stack>
  )
}

export default ReportsPage
