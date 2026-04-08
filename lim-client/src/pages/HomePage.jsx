import Button from '../components/Button'
import articles from '../assets/article-content'

const stats = [
  { label: 'Cafes', value: '11' },
  { label: 'Moods', value: '6' },
  { label: 'Neighborhoods', value: '8' },
  { label: 'Playlists', value: '11' },
]

const HomePage = () => {
  const [, ...featureCards] = articles

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <div aria-hidden="true" className="page-glow" />

      <section className="ui-shadow-panel relative rounded-[2.4rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-8 sm:px-7 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
          Cafe atmosphere archive
        </p>
        <h1 className="font-editorial mt-2 max-w-4xl text-5xl font-semibold leading-[0.9] text-[var(--text)] sm:text-6xl lg:text-[5rem]">
          A curated archive of cafes, atmosphere, and city mood.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
          Spaces for thinking, working, meeting, and disappearing. Browse by mood, interior, lighting, music, and the
          kind of person who lingers there.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/articles" variant="primary">
            Explore Cafes
          </Button>
          <Button to="/articles">Browse by Mood</Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              className="ui-shadow-card rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-center text-sm font-semibold tracking-[0.04em] text-[var(--muted)]"
              key={item.label}
            >
              <div className="text-2xl font-black text-[var(--text)]">{item.value}</div>
              <div className="text-[11px]">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ui-shadow-glass relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/42 px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.32),rgba(255,255,255,0.12)_38%,rgba(255,255,255,0.04)_100%)]"
        />
        <div className="relative mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Featured Sections
            </p>
            <h2 className="font-editorial mt-1 text-[2.5rem] font-semibold leading-[0.95] text-[var(--text)] sm:text-[3rem]">
              Pick a mood to enter
            </h2>
          </div>
          <span className="text-sm font-medium tracking-[0.04em] text-[var(--muted)] transition duration-300 ease-out hover:text-[var(--text)]">
            Props-powered
          </span>
        </div>

        <div className="relative grid gap-4 md:grid-cols-3">
          {featureCards.slice(0, 3).map((article) => (
            <article
              className="ui-shadow-card ui-shadow-card-lift flex h-full flex-col rounded-3xl border border-[var(--border)] bg-white p-4 transition hover:-translate-y-1"
              key={article.name}
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--soft)]">
                <img
                  alt={`${article.title} preview`}
                  className="aspect-[4/3] w-full object-cover object-center transition duration-300 hover:scale-[1.02]"
                  src={article.image}
                />
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                {article.category}
              </p>
              <h3 className="font-editorial mt-2 text-[1.8rem] font-semibold leading-[1.02] text-[var(--text)]">
                {article.title}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{article.summary}</p>
              <Button className="mt-auto self-start pt-4" to={`/articles/${article.name}`} variant="primary">
                View Cafe
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
