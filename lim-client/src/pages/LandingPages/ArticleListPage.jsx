import ArticleList from '../../components/ArticleList'
import Button from '../../components/Button'
import { getPublishedArticles } from '../../services/articleStore'

const ArticleListPage = () => {
  const articles = getPublishedArticles()

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <div aria-hidden="true" className="page-glow" />

      <section className="ui-shadow-panel relative rounded-[2.4rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-8 sm:px-7 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Archive</p>
        <h1 className="font-editorial mt-3 max-w-4xl text-5xl font-semibold leading-[0.92] text-[var(--text)] sm:text-6xl lg:text-[4.6rem]">
          Browse cafes by mood, neighborhood, and soundtrack
        </h1>
        
        <div className="mt-5 flex flex-wrap gap-3">
          <Button to="/articles/ani-cafe" variant="primary">
            Open Ani Cafe
          </Button>
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="ui-shadow-glass relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/42 px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.32),rgba(255,255,255,0.12)_38%,rgba(255,255,255,0.04)_100%)]"
        />
        <div className="relative">
          {articles.length ? (
            <ArticleList articles={articles} />
          ) : (
            <p className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-medium text-[var(--muted)]">
              No published articles are available right now.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default ArticleListPage
