import Button from '../components/Button'

const NotFoundPage = () => {
  return (
    <div className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col justify-center gap-8 px-4 py-12 sm:px-6">
      <div aria-hidden="true" className="page-glow" />

      <div className="ui-shadow-panel relative rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">Not Found</p>
        <h1 className="font-editorial mt-4 text-5xl font-semibold leading-[0.92] text-[var(--text)] sm:text-6xl">
          Page closed for the night
        </h1>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          This route is not on the cafe map. The page still keeps the same visual language so it feels part of the archive.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            Go Home
          </Button>
          <Button to="/articles">Browse Archive</Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
