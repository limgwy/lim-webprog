import Button from '../components/Button'
import { articles } from '../data/articles'

const HomePage = () => {
  const [heroArticle, ...featureCards] = articles

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <section className="border-y-2 border-stone-900 bg-[#f8f2e8] px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Home Section
            </p>
            <h1 className="mt-2 max-w-xl text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
              A flower-themed wireframe brought to life with real images and fuller content.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-stone-600">
              This homepage now follows the original screenshot structure: a simple hero, a
              supporting image panel, and grouped content cards. The enhancements add a designed
              navigation bar, richer writeups, and floral imagery without losing the clean layout.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
              <Button to="/articles">View Articles</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-stone-400 bg-stone-100 p-6">
            <div className="overflow-hidden rounded-[2rem] border-2 border-stone-900 bg-[#e8dfd0]">
              <img
                alt={`${heroArticle.title} garden preview`}
                className="aspect-[4/3] w-full object-cover object-center"
                src={heroArticle.image}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-stone-900 bg-[#f8f2e8] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">
            Article previews using your uploaded pictures
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((article) => (
            <article className="rounded-3xl border-2 border-stone-900 bg-stone-100 p-4" key={article.title}>
              <div className="overflow-hidden rounded-[1.5rem] border-2 border-stone-300 bg-[#e8dfd0]">
                <img
                  alt={`${article.title} preview`}
                  className="aspect-[4/3] w-full object-cover object-center"
                  src={article.image}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{article.summary}</p>
              <Button className="mt-4" to={article.url} variant="primary">
                View More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
