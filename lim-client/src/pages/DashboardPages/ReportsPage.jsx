import { useRef, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { BarChart, LineChart, PieChart } from '@mui/x-charts'
import {
  interactionBreakdown,
  overviewSnapshot,
  searchLandingPages,
  seoOpportunities,
  topKeywords,
  topPerformingCafes,
  trafficOverview,
  trafficTimeline,
  trendingCafes,
  underperformingPosts,
} from './dashboardInsights'

const COLORS = {
  primary: '#c58c7b',
  secondary: '#f0c4cf',
  tertiary: '#e9d8b8',
  surface: '#ffffff',
  bg: 'transparent',
  text: 'var(--text)',
  muted: 'var(--muted)',
  border: 'var(--border)',
}

const compactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const percent = (value) => `${value.toFixed(1)}%`
const minutes = (value) => `${value.toFixed(1)} min`

const summaryCards = [
  {
    label: 'Top Cafe',
    value: overviewSnapshot.bestPerformer.title,
    detail: `${compactNumber.format(overviewSnapshot.bestPerformer.views)} views this cycle`,
    accent: COLORS.primary,
  },
  {
    label: 'Search Visits',
    value: compactNumber.format(trafficOverview.searchVisits),
    detail: `${topKeywords[0].keyword} is the strongest search phrase`,
    accent: COLORS.secondary,
  },
  {
    label: 'SEO Fixes',
    value: `${seoOpportunities.length}`,
    detail: 'Pages with strong impressions but weak clicks',
    accent: COLORS.tertiary,
  },
]

const interactionMix = interactionBreakdown.map((item, index) => ({
  id: index,
  value: item.value,
  label: item.label,
  color: item.color,
}))

const searchLandingShare = searchLandingPages.slice(0, 4).map((item, index) => ({
  id: index,
  value: item.visits,
  label: item.title,
  color: [COLORS.primary, '#111111', COLORS.secondary, COLORS.tertiary][index],
}))

const chartModes = [
  {
    key: 'growth',
    label: 'Trending',
    title: 'Top & Trending Cafes',
    helper: 'Fastest current growth based on recent cafe post momentum.',
    categories: trendingCafes.map((item) => item.title),
    values: trendingCafes.map((item) => Number(item.growthRate.toFixed(1))),
    valueLabel: 'Growth %',
    color: '#111111',
  },
  {
    key: 'search',
    label: 'SEO',
    title: 'Search Opportunity Pages',
    helper: 'High-impression cafe pages that still need stronger click-through.',
    categories: seoOpportunities.map((item) => item.title),
    values: seoOpportunities.map((item) => Math.round(item.impressions / 100) / 10),
    valueLabel: 'Impressions (k)',
    color: COLORS.primary,
  },
  {
    key: 'content',
    label: 'Content',
    title: 'Posts Needing Attention',
    helper: 'Underperforming pages that need better hooks or structure.',
    categories: underperformingPosts.map((item) => item.title),
    values: underperformingPosts.map((item) => Number(item.bounceRate.toFixed(1))),
    valueLabel: 'Bounce %',
    color: COLORS.secondary,
  },
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
  const printRef = useRef(null)
  const [generatedAt, setGeneratedAt] = useState(() => new Date())
  
  const activeChartMode = chartModes[0] 

  const handleGenerate = () => {
    setGeneratedAt(new Date())
  }

  const handlePrint = () => {
    const printContent = printRef.current

    if (!printContent) {
      return
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900')

    if (!printWindow) {
      return
    }

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('')

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date())

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Cafe Atlas Reports</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 14mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff8f5;
              color: #111111;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .report-shell {
              padding: 28px;
            }

            .report-header {
              margin-bottom: 24px;
              padding: 24px;
              border: 1px solid #e7e5e4;
              border-radius: 20px;
              background: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(253,231,217,0.92) 58%, rgba(245,194,231,0.72) 100%);
            }

            .report-header h1 {
              margin: 0 0 8px;
              font-size: 28px;
              font-weight: 700;
            }

            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #5f6b7a;
              line-height: 1.6;
            }

            .report-header p + p {
              margin-top: 6px;
            }

            .report-content {
              display: flex;
              flex-direction: column;
              gap: 24px;
            }

            .report-content .MuiStack-root,
            .report-content .MuiBox-root {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .report-content svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Cafe Atlas Reports Summary</h1>
              <p>Analytics overview for cafe performance, traffic behavior, search visibility, and content opportunities.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  const modernCard = (accentColor) => ({
    bgcolor: 'rgba(255,255,255,0.9)',
    borderRadius: '28px',
    boxShadow: 'var(--shadow-panel-soft)',
    padding: { xs: 3, md: 4 },
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    display: 'flex',
    flex: 1,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      backgroundColor: accentColor,
    },
  })

  const generatedLabel = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(generatedAt)

  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 120px)',
        bgcolor: COLORS.bg,
        py: 1,
      }}
      direction="column"
      spacing={3}
    >
      {/* Header Actions Area */}
      <Stack
        direction={{ xs: 'column', xl: 'row' }}
        alignItems={{ xs: 'flex-start', xl: 'center' }}
        spacing={3}
        sx={{ width: '100%' }}
      >
        <Box sx={{ width: { xl: '70%' } }}>
          <Typography className="font-editorial" sx={{ fontSize: { xs: '2.5rem', md: '3.3rem' }, lineHeight: 0.94, color: COLORS.text }}>
            Reports
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ width: { xl: '30%' } }}>
          <Button
            variant="contained"
            onClick={handleGenerate}
            sx={{
              bgcolor: COLORS.primary,
              borderRadius: '999px',
              px: 3,
              py: 1.25,
              fontWeight: 800,
              boxShadow: '0 10px 24px rgba(197,140,123,0.28)',
              textTransform: 'none',
              '&:hover': { bgcolor: '#b47b6a' },
            }}
          >
            Generate
          </Button>
          <Button
            onClick={handlePrint}
            sx={{
              color: COLORS.primary,
              border: `1px solid ${COLORS.primary}`,
              borderRadius: '999px',
              px: 3,
              py: 1.25,
              fontWeight: 800,
              textTransform: 'none',
              bgcolor: 'rgba(255,255,255,0.82)',
              '&:hover': {
                boxShadow: '0 10px 24px rgba(197,140,123,0.22)',
                bgcolor: '#fffaf8',
              },
            }}
          >
            Export PDF
          </Button>
        </Stack>
      </Stack>

      {/* Wrapping all report content in printRef for a complete document export */}
      <Stack spacing={3} ref={printRef}>
        
        {/* Top Summary Cards */}
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
                borderRadius: '1.8rem',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.84) 48%, rgba(253,231,217,0.62) 100%)',
                px: 2.6,
                py: 2.4,
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  insetInlineStart: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  backgroundColor: card.accent,
                },
              }}
            >
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.muted }}>
                {card.label}
              </Typography>
              <Typography sx={{ mt: 1, fontSize: '1.18rem', fontWeight: 800, color: COLORS.text }}>
                {card.value}
              </Typography>
              <Typography sx={{ mt: 0.9, fontSize: '0.84rem', lineHeight: 1.7, color: COLORS.muted }}>
                {card.detail}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Charts & Graphs Layout */}
        <Stack
          sx={{
            flex: 1,
            width: '100%',
          }}
          direction={{ xs: 'column', xl: 'row' }}
          spacing={3}
        >
          <Stack sx={{ width: { xl: '70%' }, minHeight: { xl: 640 } }} spacing={3}>
            <Stack sx={modernCard(COLORS.primary)}>
              <Box sx={{ mb: 2 }}>
                <Typography className="font-editorial" sx={{ fontSize: '2rem', lineHeight: 1, color: COLORS.text }}>
                  Traffic & engagement trend
                </Typography>
                <Typography sx={{ mt: 1, fontSize: '0.9rem', color: COLORS.muted }}>
                  Generated {generatedLabel}. Track visits, search traffic, and reading momentum across the latest reporting cycle.
                </Typography>
              </Box>
              <LineChart
                height={280}
                xAxis={[{ data: trafficTimeline.map((point) => point.label), scaleType: 'point' }]}
                series={[
                  {
                    data: trafficTimeline.map((point) => point.visits),
                    color: '#111111',
                    area: true,
                    label: 'Visits',
                  },
                  {
                    data: trafficTimeline.map((point) => point.searchVisits),
                    color: COLORS.primary,
                    label: 'Search visits',
                  },
                ]}
                margin={{ top: 24, bottom: 56, left: 44, right: 20 }}
                sx={chartSx}
              />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ minHeight: { md: 320 } }} spacing={3}>
              <Stack sx={{ ...modernCard('#111111'), width: '100%' }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: COLORS.text, mb: 0.5 }}>
                  Interaction mix
                </Typography>
                <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.7, color: COLORS.muted, mb: 2.5 }}>
                  Likes, comments, shares, and archive actions across your cafe coverage.
                </Typography>
                <PieChart
                  height={220}
                  series={[
                    {
                      data: interactionMix,
                      innerRadius: 56,
                      paddingAngle: 4,
                      cornerRadius: 8,
                    },
                  ]}
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  sx={chartSx}
                />
              </Stack>

              <Stack sx={{ ...modernCard(COLORS.secondary), width: '100%' }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: COLORS.text, mb: 0.5 }}>
                  Search landing share
                </Typography>
                <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.7, color: COLORS.muted, mb: 2.5 }}>
                  Which cafe pages are earning the strongest search entry volume right now.
                </Typography>
                <PieChart
                  height={220}
                  series={[
                    {
                      data: searchLandingShare,
                      innerRadius: 56,
                      paddingAngle: 4,
                      cornerRadius: 8,
                    },
                  ]}
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  sx={chartSx}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ ...modernCard(COLORS.tertiary), width: { xl: '30%' }, minHeight: { xl: 640 } }}>
            <Box sx={{ mb: 3.2 }}>
              <Typography className="font-editorial" sx={{ fontSize: '2rem', lineHeight: 1, color: COLORS.text }}>
                {activeChartMode.title}
              </Typography>
              <Typography sx={{ mt: 1, fontSize: '0.84rem', lineHeight: 1.7, color: COLORS.muted }}>
                {activeChartMode.helper}
              </Typography>
            </Box>

            <BarChart
              height={360}
              xAxis={[
                {
                  data: activeChartMode.categories,
                  scaleType: 'band',
                  tickLabelStyle: { angle: -24, textAnchor: 'end' },
                },
              ]}
              series={[
                {
                  data: activeChartMode.values,
                  label: activeChartMode.valueLabel,
                  color: activeChartMode.color,
                },
              ]}
              borderRadius={10}
              margin={{ top: 20, bottom: 112, left: 40, right: 10 }}
              sx={chartSx}
            />

            <Stack spacing={1.4} sx={{ mt: 1.5 }}>
              {topPerformingCafes.slice(0, 2).map((item, index) => (
                <Box
                  key={item.title}
                  sx={{
                    borderRadius: '1.2rem',
                    border: '1px solid var(--border)',
                    bgcolor: 'rgba(255,255,255,0.72)',
                    px: 2,
                    py: 1.8,
                  }}
                >
                  <Typography sx={{ fontSize: '0.72rem', color: COLORS.muted }}>Top performer #{index + 1}</Typography>
                  <Typography sx={{ mt: 0.55, fontSize: '0.96rem', fontWeight: 700, color: COLORS.text }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 0.4, fontSize: '0.8rem', lineHeight: 1.65, color: COLORS.muted }}>
                    {compactNumber.format(item.views)} views, {percent(item.growthRate)} growth, {compactNumber.format(item.engagement)} engagements
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Footer Notes included in Print Context */}
        <Box
          sx={{
            border: '1px solid var(--border)',
            borderRadius: '1.8rem',
            backgroundColor: 'rgba(255,255,255,0.82)',
            px: { xs: 2.4, md: 3 },
            py: { xs: 2.2, md: 2.4 },
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.muted }}>
            Quick Notes
          </Typography>
          <Typography sx={{ mt: 1, fontSize: '0.9rem', lineHeight: 1.75, color: COLORS.muted }}>
            Average time on page is {minutes(trafficOverview.averageTimeOnPage)}, overall bounce rate is {percent(trafficOverview.bounceRate)}, and the strongest search entry page is {searchLandingPages[0].title}. Use the export button when you are ready to save this report as PDF from the browser print dialog.
          </Typography>
        </Box>

      </Stack>
    </Stack>
  )
}

export default ReportsPage