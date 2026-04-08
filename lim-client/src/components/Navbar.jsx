import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/articles', label: 'Archive' },
]

const linkClasses = ({ isActive }) =>
  [
    'group relative px-1 py-2 text-sm font-semibold tracking-[0.01em] transition duration-300 ease-out',
    isActive ? 'text-[var(--text)]' : 'text-[var(--muted)] hover:text-[var(--text)]',
  ].join(' ')

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-white/88 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <NavLink className="flex items-center gap-3" to="/">
          <Logo />
        </NavLink>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink className={linkClasses} end={item.to === '/'} key={item.to} to={item.to}>
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--text)] transition duration-300 ease-out',
                      isActive
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100',
                    ].join(' ')}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
