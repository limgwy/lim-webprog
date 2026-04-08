import natsuImg from './natsu.jpg'
import belfryImg from './belfry.jpg'
import harlanImg from './harlan.jpg'
import aniImg from './ani.jpg'
import bricksImg from './bricks.jpg'
import elsewhereImg from './elsewhere.jpg'
import sunniesImg from './sunnies.jpg'
import majikasaImg from './majikasa.jpg'
import masidaImg from './masida.jpg'
import ahonImg from './ahon.jpg'

export const articles = [
  {
    name: 'ani-cafe',
    title: 'Soft, homey, slightly hidden nook in Makati',
    author: 'Makati · Quirky, cozy, slightly hidden',
    date: 'Rating 4.1 · Open',
    category: 'Quiet cafe',
    summary:
      'A small escape tucked into the city, soft, homey, and a little off-center in the best way. Feels like a place people stumble into once, then keep to themselves.',
    image: aniImg,
    content: [
      'Soundtrack: indie folk, soft acoustic, low-volume playlists.',
      'Best for: solo mornings, quiet catch-ups, staying longer than planned.',
      'Atmosphere: lamp-lit corners, handwritten notes on the board, staff that lets you linger.',
    ],
  },
  {
    name: 'natsu',
    title: 'Intimate, tucked-away Legazpi secret for quiet socials',
    author: 'Legazpi Village · Intimate, tucked-away, quietly social',
    date: 'Rating 4.1 · Open',
    category: 'Date cafe',
    summary:
      'Feels like a secret you only tell people with good taste. Smaller, softer, and removed enough to make conversations feel personal.',
    image: natsuImg,
    content: [
      'Soundtrack: city pop, lo-fi jazz, rainy day playlists.',
      'Best for: first dates, quiet conversations, low-key meetups.',
      'Atmosphere: short bar, soft pendants, greenery by the windows.',
    ],
  },
  {
    name: 'elsewhere-cafe',
    title: 'Dreamy, detached, time-softening escape in Taft',
    author: 'Taft · Dreamy, detached, slightly surreal',
    date: 'Rating 4.3 · Open',
    category: 'Quiet cafe',
    summary:
      'Airy and just distant enough to let your thoughts stretch out. Time feels softer around the edges here.',
    image: elsewhereImg,
    content: [
      'Soundtrack: ambient electronic, lo-fi, soft experimental.',
      'Best for: journaling, thinking, disappearing for a while.',
      'Atmosphere: hazy daylight, pale woods, gentle AC hum.',
    ],
  },
  {
    name: 'majikasa-cafe',
    title: 'Playful, youthful, a little chaotic Makati hang',
    author: 'Makati · Playful, youthful, a little chaotic',
    date: 'Rating 3.9 · Open',
    category: 'Social cafe',
    summary:
      'Bright, expressive, full of movement, alive in a current, social way. Less about silence, more about color and energy.',
    image: majikasaImg,
    content: [
      'Soundtrack: upbeat pop, alt R&B, colorful playlists.',
      'Best for: casual meetups, group energy, spontaneous coffee runs.',
      'Atmosphere: posters, neon accents, seats that invite shuffling around.',
    ],
  },
  {
    name: 'bricks-and-brew',
    title: 'Grounded, study-friendly, low-pressure Sta. Mesa spot',
    author: 'Sta. Mesa · Grounded, study-friendly, low-pressure',
    date: 'Rating 4.4 · Open',
    category: 'Work cafe',
    summary:
      'Calm and practical: steady lighting, textured interiors, just enough atmosphere without trying too hard.',
    image: bricksImg,
    content: [
      'Soundtrack: instrumental beats, cafe jazz, study playlists.',
      'Best for: studying, long laptop sessions, low-distraction work.',
      'Atmosphere: power strips under tables, sturdy chairs, clear sightlines.',
    ],
  },
  {
    name: 'belfry-cafe',
    title: 'Historic warmth and quiet romance inside Intramuros',
    author: 'Intramuros · Historic, warm, quietly romantic',
    date: 'Rating 4.3 · Open',
    category: 'Date cafe',
    summary:
      'Warm walls, slower air, and a stillness that holds your attention. Makes even ordinary conversations feel more thoughtful.',
    image: belfryImg,
    content: [
      'Soundtrack: classical instrumentals, soft jazz, ambient piano.',
      'Best for: dates, reflective afternoons, slow conversations.',
      'Atmosphere: softened by age, candlelit corners, stone-and-wood details.',
    ],
  },
  {
    name: 'panco-cafe',
    title: 'Bright, polished, socially alive Legazpi brunch hub',
    author: 'Legazpi Village · Bright, polished, socially alive',
    date: 'Rating 4.8 · Open',
    category: 'Social cafe',
    summary:
      'Airy and composed, brunch people, work people, and date people overlap without friction.',
    image: sunniesImg,
    content: [
      'Soundtrack: bossa nova, acoustic soul, clean daytime playlists.',
      'Best for: day dates, brunch, being seen without trying.',
      'Atmosphere: big windows, white oak, polite buzz of conversation.',
    ],
  },
  {
    name: 'harlan-holden',
    title: 'Minimal, fast, city-focused BGC pause point',
    author: 'BGC · Minimal, fast, city-focused',
    date: 'Rating 4.4 · Open',
    category: 'Minimal cafe',
    summary:
      'Sharp lines and a rhythm built for movement. More pause-and-go than stay-all-day, polished and quietly cool.',
    image: harlanImg,
    content: [
      'Soundtrack: house instrumentals, soft electronic, modern ambient.',
      'Best for: quick resets, solo coffee, in-between hours.',
      'Atmosphere: standing ledges, clean espresso bar, seamless pickup flow.',
    ],
  },
  {
    name: 'sunnies-cafe',
    title: 'Warm, social, effortlessly aesthetic BGC daytime cafe',
    author: 'BGC · Warm, social, effortlessly aesthetic',
    date: 'Rating 4.1 · Open',
    category: 'Social cafe',
    summary:
      'Polished without losing softness. Bright enough for daytime, calm enough to linger, a cafe that makes one order last.',
    image: sunniesImg,
    content: [
      'Soundtrack: dreamy pop, alt R&B, weekend playlists.',
      'Best for: long lunches, dates, slow social afternoons.',
      'Atmosphere: soft booths, pale terrazzo, sunlight that photographs well.',
    ],
  },
  {
    name: 'masida-coffee',
    title: 'Youthful, casual, lively Sampaloc study energy',
    author: 'Sampaloc · Youthful, casual, a little chaotic',
    date: 'Rating 3.0 · Open',
    category: 'Work cafe',
    summary:
      'Student energy and slightly messy charm, people stay longer than planned and end up ordering again.',
    image: masidaImg,
    content: [
      'Soundtrack: indie OPM, alt-pop, late-night study spiral playlists.',
      'Best for: study sessions, barkada meetups, coffee that turns into dinner.',
      'Atmosphere: communal tables, scribbled flyers, open shelves of board games.',
    ],
  },
  {
    name: 'ahon-coffee',
    title: 'Open-air, reflective, slightly cinematic Antipolo perch',
    author: 'Antipolo · Open-air, reflective, slightly cinematic',
    date: 'Rating 4.4 · Open',
    category: 'Scenic cafe',
    summary:
      'Feels better because you went out of your way. Airier, slower, and more scenic, a place for long pauses.',
    image: ahonImg,
    content: [
      'Soundtrack: acoustic folk, ambient OPM, road-trip playlists with weather.',
      'Best for: sunrise coffee, reflective solo time, scenic conversations.',
      'Atmosphere: hillside breeze, wide horizon, sun-warmed wooden decks.',
    ],
  },
]

export default articles
