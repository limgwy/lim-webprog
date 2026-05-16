import { Link } from 'react-router-dom'

const variantClasses = {
  primary:
    'ui-shadow-button-dark border-[#111111] bg-[#111111] !text-white hover:-translate-y-0.5 hover:bg-[#2a2a2a] hover:!text-white',
  secondary:
    'ui-shadow-button-light border-[#d6d3d1] bg-white !text-[#111111] hover:-translate-y-0.5 hover:border-[#cfc8bf] hover:bg-white hover:!text-[#111111]',
}

const Button = ({ children, to, type = 'button', variant = 'secondary', className = '', ...props }) => {
  const classes = [
    'inline-flex min-h-10 items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold tracking-[0.01em] transition duration-300 ease-out',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim()

  if (to && /^https?:\/\//.test(to)) {
    return (
      <a className={classes} href={to} rel="noreferrer" target="_blank" {...props}>
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
