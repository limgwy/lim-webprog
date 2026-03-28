import Button from '../components/Button'
import { articles } from '../data/articles'

const readingNotes = [
  'Each article card keeps the screenshot wireframe structure: image area, title, summary, and action button.',
  'The uploaded images now replace placeholder blocks so the page looks finished while still following the original layout.',
  'Expanded writeups explain why each publication is useful for a flower-focused design theme and content direction.',
]

const ArticlePage = () => {
  const [featuredArticle, ...otherArticles] = articles

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <section className="border-y-2 border-stone-900 bg-[#f8f2e8] px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Articles
            </p>
            <h1 className="mt-2 max-w-xl text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
              A simple article section upgraded with real photography, links, and fuller descriptions.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-stone-600">
              The page follows the screenshot wireframe by opening with a clear introduction and a
              single supporting visual. Under that, the article cards repeat in a clean grid so the
              content is easy to browse and the structure stays consistent.
            </p>
            <Button className="mt-6" to={featuredArticle.url} variant="primary">
              Open Featured Source
            </Button>
          </div>

          <div className="overflow-hidden rounded-3xl border-2 border-stone-900 bg-stone-100">
            <img
              alt={`${featuredArticle.title} featured visual`}
              className="aspect-[4/3] w-full object-cover object-center"
              src={featuredArticle.image}
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-stone-900 bg-[#f5eee2] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">Wireframe-based article cards</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[featuredArticle, ...otherArticles].map((article) => (
            <article className="rounded-3xl border-2 border-stone-900 bg-stone-100 p-4" key={article.title}>
              <div className="overflow-hidden rounded-[1.5rem] border-2 border-stone-300 bg-[#e8dfd0]">
                <img
                  alt={`${article.title} article image`}
                  className="aspect-[4/3] w-full object-cover object-center"
                  src={article.image}
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                {article.source}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-stone-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{article.summary}</p>
              <Button className="mt-4" to={article.url} variant="primary">
                Read More
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-stone-900 bg-[#f8f2e8] px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Reading Notes
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">How the enhancement was applied</h2>

            <div className="mt-6 space-y-4">
              {readingNotes.map((note) => (
                <article className="rounded-3xl border-2 border-stone-900 bg-stone-100 p-5" key={note}>
                  <p className="text-sm leading-6 text-stone-600">{note}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-stone-900 bg-stone-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Image Panel
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {articles.map((article) => (
                <div
                  className="overflow-hidden rounded-[1.25rem] border-2 border-stone-300 bg-[#e8dfd0]"
                  key={article.title}
                >
                  <img
                    alt={`${article.title} panel`}
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

export default ArticlePage
