import Button from '../components/Button'
import articles from '../assets/article-content'

const contentBlocks = [
  {
    title: 'Concept',
    text: 'Archive cafes by atmosphere: mood, interior, lighting, music, and crowd energy, so visitors can choose a place by feeling instead of only by menu.',
  },
  {
    title: 'Structure',
    text: 'Homepage to archive to cafe detail pages. Data lives in one file and flows through reusable list and detail components.',
  },
  {
    title: 'Use Cases',
    text: 'Find a quiet corner to write, a cinematic date spot, or a low-pressure work cafe without skimming latte scores.',
  },
]

const AboutPage = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <div aria-hidden="true" className="page-glow" />

      <section className="ui-shadow-panel relative rounded-[2.4rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-8 sm:px-7 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="ui-shadow-card rounded-3xl border border-[var(--border)] bg-[var(--soft)] p-6">
            <div className="grid w-full gap-4 sm:grid-cols-2">
              {articles.slice(0, 4).map((article) => (
                <div
                  className="ui-shadow-card overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-white"
                  key={article.name}
                >
                  <img
                    alt={`${article.title} about preview`}
                    className="aspect-[4/3] w-full object-cover object-center"
                    src={article.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              About the Archive
            </p>
            <h1 className="font-editorial max-w-2xl text-5xl font-semibold leading-[0.92] text-[var(--text)] sm:text-6xl lg:text-[4.6rem]">
              Why an atmosphere-first cafe index
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">
              Instead of scoring lattes, we document the feeling of a place: light temperature, soundtrack, crowd, and
              the kinds of conversations that fit. Components stay reusable and routes stay clean so new cafes or moods
              can drop in quickly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Archive</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-shadow-panel-soft rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">What we capture</p>
            <h2 className="font-editorial mt-2 text-[2.4rem] font-semibold leading-[0.96] text-[var(--text)] sm:text-[2.9rem]">
              Stacked, readable blocks
            </h2>

            <div className="mt-6 space-y-4">
              {contentBlocks.map((block) => (
                <article className="ui-shadow-card rounded-3xl border border-[var(--border)] bg-[var(--soft)] p-5" key={block.title}>
                  <h3 className="font-editorial text-[1.7rem] font-semibold leading-[1.02] text-[var(--text)]">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{block.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="ui-shadow-card rounded-3xl border border-[var(--border)] bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Gallery</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {articles.map((article) => (
                <div
                  className="ui-shadow-card overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--soft)]"
                  key={article.name}
                >
                  <img
                    alt={`${article.title} gallery tile`}
                    className="aspect-[4/3] w-full object-cover object-center"
                    src={article.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
