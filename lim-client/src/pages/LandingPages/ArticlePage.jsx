import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { getPublishedArticles } from '../../services/articleStore'
import NotFoundPage from '../NotFoundPage'

const ArticlePage = () => {
  const { name } = useParams()
  const articles = getPublishedArticles()
  const article = articles.find((item) => item.name === name)

  if (!article) {
    return <NotFoundPage />
  }

  const { title, author, date, category, summary, image, content } = article

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-6">
      <div aria-hidden="true" className="page-glow" />

      <section className="ui-shadow-panel relative rounded-[2.4rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-8 sm:px-7 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">{category}</p>
        <h1 className="font-editorial mt-3 max-w-4xl text-5xl font-semibold leading-[0.92] text-[var(--text)] sm:text-6xl lg:text-[4.6rem]">
          {title}
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{author} / {date}</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">{summary}</p>
        <div className="ui-shadow-card mt-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
          <img alt={`${title} visual`} className="aspect-[4/3] w-full object-cover" src={image} />
        </div>
      </section>

      <section className="ui-shadow-panel-soft rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-7 sm:px-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">Atmosphere Notes</p>
        <div className="mt-4 space-y-4 text-[15px] leading-7 text-[var(--muted)]">
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/articles" variant="primary">
            Back to List
          </Button>
          <Button to="/">Home</Button>
        </div>
      </section>
    </div>
  )
}

export default ArticlePage
