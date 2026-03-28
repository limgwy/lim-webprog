import Button from '../components/Button'
import { articles } from '../data/articles'

const contentBlocks = [
  {
    title: 'Introduction Block',
    text: 'The about page opens with a grouped hero section that mirrors the screenshot wireframe while replacing placeholders with a real visual and a fuller introduction.',
  },
  {
    title: 'Experience Block',
    text: 'The page explains how the redesign keeps a clean classroom-style wireframe but improves it with actual floral imagery, topic-specific writing, and clearer page purpose.',
  },
  {
    title: 'Details Block',
    text: 'Supporting sections break the content into quick facts, design notes, and image references so the page stays readable and easy to expand later.',
  },
]

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <section className="border-y-2 border-stone-900 bg-[#f8f2e8] px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex min-h-72 items-center justify-center rounded-3xl border-2 border-dashed border-stone-400 bg-stone-100 p-6">
            <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
              {articles.slice(0, 4).map((article) => (
                <div
                  className="overflow-hidden rounded-[1.5rem] border-2 border-stone-900 bg-[#e8dfd0]"
                  key={article.title}
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
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
              A profile-style page that keeps the original wireframe and adds meaningful floral content.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-stone-600">
              This page now follows the same low-fidelity structure shown in the screenshots:
              grouped layout, simple supporting blocks, and easy-to-read spacing. The difference is
              that every section now has real content, real photos, and a clearer explanation of the
              site&apos;s flower-publication theme.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-stone-900 bg-[#f8f2e8] px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Section Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">Stacked wireframe blocks</h2>

            <div className="mt-6 space-y-4">
              {contentBlocks.map((block) => (
                <article className="rounded-3xl border-2 border-stone-900 bg-stone-100 p-5" key={block.title}>
                  <h3 className="text-lg font-semibold text-stone-900">{block.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{block.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-stone-900 bg-stone-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Visual Grid
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {articles.map((article) => (
                <div
                  className="overflow-hidden rounded-[1.25rem] border-2 border-stone-300 bg-[#e8dfd0]"
                  key={article.title}
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
