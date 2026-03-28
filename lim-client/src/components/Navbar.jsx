import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/articles', label: 'Articles' },
]

const linkClasses = ({ isActive }) =>
  [
    'rounded-full border-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition duration-200',
    isActive
      ? 'border-emerald-700 bg-emerald-700 text-white'
      : 'border-stone-300 bg-stone-50 text-stone-800 hover:border-stone-900 hover:bg-amber-50',
  ].join(' ')

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-stone-900 bg-[#fffaf2]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <NavLink className="flex items-center gap-3" to="/">
          <Logo />
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink className={linkClasses} end={item.to === '/'} key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
