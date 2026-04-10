import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-gradient-to-br from-[var(--bg)] via-white to-[var(--soft)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        <div className="ui-shadow-panel-soft grid gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Contact</p>
            <div className="mt-2 space-y-1 text-sm leading-6 text-stone-700">
              <p>hello@cafeatlas.studio</p>
              <p>+63 912 345 6789</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Status</p>
            <div className="mt-2 space-y-1 text-sm leading-6 text-stone-700">
              <p>Built for Lab Activity 3</p>
              <p>Footer / Article-content / NotFoundPage</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs uppercase tracking-[0.26em] text-stone-500">
          (c) {new Date().getFullYear()} Cafe Atlas
        </p>
      </div>
    </footer>
  )
}

export default Footer
