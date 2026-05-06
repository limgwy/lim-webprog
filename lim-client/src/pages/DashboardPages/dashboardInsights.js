import articles from '../../assets/article-content'

const locationBySlug = {
  'ani-cafe': 'Makati',
  natsu: 'Legazpi Village',
  'elsewhere-cafe': 'Taft',
  'majikasa-cafe': 'Makati',
  'bricks-and-brew': 'Sta. Mesa',
  'belfry-cafe': 'Intramuros',
  'panco-cafe': 'Legazpi Village',
  'harlan-holden': 'BGC',
  'sunnies-cafe': 'BGC',
  'masida-coffee': 'Sampaloc',
  'ahon-coffee': 'Antipolo',
}

const metricsBySlug = {
  'ani-cafe': {
    views: 18240,
    previousViews: 15100,
    likes: 1240,
    comments: 182,
    shares: 96,
    actions: 1750,
    avgTimeOnPage: 4.6,
    bounceRate: 32,
    scrollDepth: 82,
    searchVisits: 5410,
    impressions: 28400,
    clicks: 1920,
    keyword: 'cozy cafe makati',
  },
  natsu: {
    views: 16580,
    previousViews: 14820,
    likes: 1194,
    comments: 168,
    shares: 104,
    actions: 1690,
    avgTimeOnPage: 4.8,
    bounceRate: 30,
    scrollDepth: 85,
    searchVisits: 4980,
    impressions: 24100,
    clicks: 1710,
    keyword: 'date cafe legazpi',
  },
  'elsewhere-cafe': {
    views: 12120,
    previousViews: 12950,
    likes: 910,
    comments: 121,
    shares: 74,
    actions: 1310,
    avgTimeOnPage: 4.1,
    bounceRate: 38,
    scrollDepth: 77,
    searchVisits: 3210,
    impressions: 22700,
    clicks: 910,
    keyword: 'quiet cafe taft',
  },
  'majikasa-cafe': {
    views: 11040,
    previousViews: 9800,
    likes: 1020,
    comments: 154,
    shares: 116,
    actions: 1480,
    avgTimeOnPage: 3.5,
    bounceRate: 45,
    scrollDepth: 68,
    searchVisits: 2560,
    impressions: 17500,
    clicks: 780,
    keyword: 'aesthetic cafe makati',
  },
  'bricks-and-brew': {
    views: 14620,
    previousViews: 13910,
    likes: 980,
    comments: 132,
    shares: 88,
    actions: 1630,
    avgTimeOnPage: 5.2,
    bounceRate: 28,
    scrollDepth: 88,
    searchVisits: 4670,
    impressions: 19800,
    clicks: 1440,
    keyword: 'study cafe sta mesa',
  },
  'belfry-cafe': {
    views: 15880,
    previousViews: 13240,
    likes: 1270,
    comments: 194,
    shares: 118,
    actions: 1780,
    avgTimeOnPage: 4.9,
    bounceRate: 29,
    scrollDepth: 84,
    searchVisits: 4230,
    impressions: 21500,
    clicks: 1605,
    keyword: 'romantic cafe intramuros',
  },
  'panco-cafe': {
    views: 9800,
    previousViews: 11210,
    likes: 740,
    comments: 92,
    shares: 53,
    actions: 980,
    avgTimeOnPage: 3.2,
    bounceRate: 47,
    scrollDepth: 63,
    searchVisits: 2890,
    impressions: 26800,
    clicks: 690,
    keyword: 'brunch cafe legazpi',
  },
  'harlan-holden': {
    views: 13110,
    previousViews: 12480,
    likes: 860,
    comments: 110,
    shares: 69,
    actions: 1180,
    avgTimeOnPage: 3.7,
    bounceRate: 41,
    scrollDepth: 71,
    searchVisits: 3740,
    impressions: 23100,
    clicks: 1140,
    keyword: 'coffee bgc quick stop',
  },
  'sunnies-cafe': {
    views: 17140,
    previousViews: 14980,
    likes: 1330,
    comments: 206,
    shares: 140,
    actions: 1880,
    avgTimeOnPage: 4.3,
    bounceRate: 33,
    scrollDepth: 79,
    searchVisits: 5260,
    impressions: 30100,
    clicks: 2010,
    keyword: 'social cafe bgc',
  },
  'masida-coffee': {
    views: 7420,
    previousViews: 9140,
    likes: 620,
    comments: 88,
    shares: 39,
    actions: 860,
    avgTimeOnPage: 2.8,
    bounceRate: 52,
    scrollDepth: 58,
    searchVisits: 1910,
    impressions: 16200,
    clicks: 430,
    keyword: 'study cafe sampaloc',
  },
  'ahon-coffee': {
    views: 14990,
    previousViews: 12540,
    likes: 1160,
    comments: 174,
    shares: 123,
    actions: 1710,
    avgTimeOnPage: 4.7,
    bounceRate: 31,
    scrollDepth: 86,
    searchVisits: 4120,
    impressions: 18900,
    clicks: 1550,
    keyword: 'scenic cafe antipolo',
  },
}

const titleize = (value = '') => value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
const average = (items, selector) => items.reduce((sum, item) => sum + selector(item), 0) / items.length
const weightedAverage = (items, selector, weightSelector) => {
  const totalWeight = items.reduce((sum, item) => sum + weightSelector(item), 0)
  return items.reduce((sum, item) => sum + selector(item) * weightSelector(item), 0) / totalWeight
}

export const cafeAnalytics = articles.map((article) => {
  const metrics = metricsBySlug[article.name]
  const engagement = metrics.likes + metrics.comments + metrics.shares
  const growthRate = ((metrics.views - metrics.previousViews) / metrics.previousViews) * 100
  const ctr = (metrics.clicks / metrics.impressions) * 100
  const engagementRate = (engagement / metrics.views) * 100
  const performanceScore = metrics.views * 0.42 + engagement * 16 + metrics.searchVisits * 1.6 + growthRate * 190
  const trendScore = growthRate * 10 + engagementRate * 22 + metrics.searchVisits / 180

  return {
    ...article,
    ...metrics,
    title: titleize(article.name),
    location: locationBySlug[article.name] ?? 'Unknown',
    engagement,
    growthRate,
    ctr,
    engagementRate,
    performanceScore,
    trendScore,
  }
})

export const topPerformingCafes = [...cafeAnalytics]
  .sort((left, right) => right.performanceScore - left.performanceScore)
  .slice(0, 4)

export const trendingCafes = [...cafeAnalytics]
  .sort((left, right) => right.trendScore - left.trendScore)
  .slice(0, 5)

export const trafficOverview = {
  totalVisits: cafeAnalytics.reduce((sum, item) => sum + item.views, 0),
  averageTimeOnPage: weightedAverage(cafeAnalytics, (item) => item.avgTimeOnPage, (item) => item.views),
  bounceRate: weightedAverage(cafeAnalytics, (item) => item.bounceRate, (item) => item.views),
  scrollDepth: weightedAverage(cafeAnalytics, (item) => item.scrollDepth, (item) => item.views),
  totalInteractions: cafeAnalytics.reduce((sum, item) => sum + item.actions, 0),
  engagementRate: average(cafeAnalytics, (item) => item.engagementRate),
  searchVisits: cafeAnalytics.reduce((sum, item) => sum + item.searchVisits, 0),
}

export const trafficTimeline = [
  { label: 'Mar 31', visits: 21400, engagedSessions: 12140, searchVisits: 6200, interactions: 2280 },
  { label: 'Apr 07', visits: 23650, engagedSessions: 13390, searchVisits: 6580, interactions: 2440 },
  { label: 'Apr 14', visits: 24810, engagedSessions: 14080, searchVisits: 6940, interactions: 2590 },
  { label: 'Apr 21', visits: 25740, engagedSessions: 14720, searchVisits: 7120, interactions: 2710 },
  { label: 'Apr 28', visits: 26790, engagedSessions: 15430, searchVisits: 7420, interactions: 2940 },
  { label: 'May 05', visits: 28550, engagedSessions: 16510, searchVisits: 8720, interactions: 3290 },
]

export const interactionBreakdown = [
  { label: 'Likes', value: cafeAnalytics.reduce((sum, item) => sum + item.likes, 0), color: '#111111' },
  { label: 'Comments', value: cafeAnalytics.reduce((sum, item) => sum + item.comments, 0), color: '#c58c7b' },
  { label: 'Shares', value: cafeAnalytics.reduce((sum, item) => sum + item.shares, 0), color: '#f0c4cf' },
  { label: 'Actions', value: cafeAnalytics.reduce((sum, item) => sum + item.actions, 0), color: '#e9d8b8' },
]

export const topKeywords = [...cafeAnalytics]
  .sort((left, right) => right.searchVisits - left.searchVisits)
  .slice(0, 6)
  .map((item) => ({
    keyword: item.keyword,
    visits: item.searchVisits,
    page: item.title,
    ctr: item.ctr,
  }))

export const searchLandingPages = [...cafeAnalytics]
  .sort((left, right) => right.searchVisits - left.searchVisits)
  .slice(0, 5)
  .map((item) => ({
    title: item.title,
    location: item.location,
    visits: item.searchVisits,
    ctr: item.ctr,
    avgTimeOnPage: item.avgTimeOnPage,
  }))

export const seoOpportunities = [...cafeAnalytics]
  .filter((item) => item.impressions >= 17000 && item.ctr < 4.5)
  .sort((left, right) => right.impressions - left.impressions)
  .slice(0, 4)
  .map((item) => ({
    title: item.title,
    impressions: item.impressions,
    ctr: item.ctr,
    keyword: item.keyword,
    action: 'Refresh headline and meta description',
  }))

export const underperformingPosts = [...cafeAnalytics]
  .sort((left, right) => {
    const leftScore = left.views * 0.002 + left.scrollDepth - left.bounceRate * 1.4 + left.avgTimeOnPage * 12
    const rightScore = right.views * 0.002 + right.scrollDepth - right.bounceRate * 1.4 + right.avgTimeOnPage * 12
    return leftScore - rightScore
  })
  .slice(0, 3)
  .map((item) => ({
    title: item.title,
    location: item.location,
    views: item.views,
    bounceRate: item.bounceRate,
    scrollDepth: item.scrollDepth,
    action: 'Rework the intro and improve internal linking',
  }))

export const decliningTrafficPages = [...cafeAnalytics]
  .filter((item) => item.growthRate < 0)
  .sort((left, right) => left.growthRate - right.growthRate)
  .map((item) => ({
    title: item.title,
    location: item.location,
    growthRate: item.growthRate,
    previousViews: item.previousViews,
    currentViews: item.views,
    action: 'Republish with a fresher angle and recirculate',
  }))

export const promoteNowContent = [...cafeAnalytics]
  .filter((item) => item.engagementRate >= 8 && item.impressions < 20000 && item.growthRate > 0)
  .sort((left, right) => right.engagementRate - left.engagementRate)
  .slice(0, 3)
  .map((item) => ({
    title: item.title,
    location: item.location,
    engagementRate: item.engagementRate,
    impressions: item.impressions,
    action: 'Feature on the archive home and push to social',
  }))

export const overviewSnapshot = {
  bestPerformer: topPerformingCafes[0],
  fastestTrend: trendingCafes[0],
  topKeyword: topKeywords[0],
  topSearchPage: searchLandingPages[0],
  biggestDecline: decliningTrafficPages[0],
  easiestWin: promoteNowContent[0],
  opportunityCount: seoOpportunities.length + underperformingPosts.length + decliningTrafficPages.length,
}
