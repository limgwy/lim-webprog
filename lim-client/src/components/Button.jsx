import { Link } from 'react-router-dom'

const variantClasses = {
  primary: 'border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-600',
  secondary: 'border-stone-400 bg-white text-stone-900 hover:bg-stone-100',
}

const Button = ({ children, to, type = 'button', variant = 'secondary', className = '' }) => {
  const classes = [
    'inline-flex min-h-11 items-center justify-center rounded-full border-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition duration-200',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim()

  if (to && /^https?:\/\//.test(to)) {
    return (
      <a className={classes} href={to} rel="noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  )
}

export default Button
