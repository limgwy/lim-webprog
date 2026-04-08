import Button from './Button'

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <article
          className="ui-shadow-card ui-shadow-card-lift group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-white p-4 transition duration-300 ease-out hover:-translate-y-[6px]"
          key={article.name}
        >
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--soft)]">
            <img
              alt={`${article.title} cover`}
              className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              src={article.image}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            <span className="rounded-xl bg-[var(--soft)] px-3 py-1 text-[var(--muted)]">{article.category}</span>
            <span className="text-[var(--muted)]">{article.date}</span>
          </div>

          <h3 className="font-editorial mt-3 text-[1.7rem] font-semibold leading-[1.02] text-[var(--text)]">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{article.summary}</p>

          <div className="mt-auto flex justify-end pt-4">
            <Button className="px-4 py-2" to={`/articles/${article.name}`}>
              View
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ArticleList
