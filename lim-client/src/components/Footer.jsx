import { Link } from 'react-router-dom'
import Logo from './Logo'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
]

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-gradient-to-br from-[var(--bg)] via-white to-[var(--soft)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <div className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <Link
                className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text)] transition hover:bg-[var(--soft)]"
                key={link.to}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="ui-shadow-panel-soft grid gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6 md:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Lab Reminder</p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              Atmosphere-first archive: navigation shortcuts, soft gradient background, and readable contrast even in dim
              cafes.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Contact</p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              hello@cafeatlas.studio <br />
              +63 912 345 6789
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Status</p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              Built for Lab Activity 3 / Responsive / Component-driven / Atmosphere-focused.
            </p>
          </div>
        </div>

        <p className="text-center text-xs uppercase tracking-[0.26em] text-stone-500">
          (c) {new Date().getFullYear()} Lily Bloom Lab - Crafted with reusable components
        </p>
      </div>
    </footer>
  )
}

export default Footer
