import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button';
import appleIcon from '../../assets/appleid_button.png';
import googleIcon from '../../assets/web_neutral_sq_na.svg';
import { addUserAsync, genders, getUsersAsync } from '../../services/userStore'

const inputClasses =
  'mt-1.5 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName =
  'min-h-8 w-full rounded-xl px-3 py-1.5 text-[9px] font-medium tracking-[0.08em]';

const providerButtonClassName =
  'min-h-8 w-full justify-center gap-2 rounded-xl px-3 py-1.5 text-[11px] font-medium normal-case tracking-normal';

const initialForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
}

const SignUpPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    const email = form.email.trim().toLowerCase()
    const username = form.username.trim().toLowerCase()
    const users = await getUsersAsync()

    if (Object.values(form).some((value) => !String(value).trim())) {
      setError('Please complete all fields.')
      setIsSubmitting(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    if (!/^\d+$/.test(form.age.trim())) {
      setError('Age must be a number only.')
      setIsSubmitting(false)
      return
    }

    if (!/^\d{11}$/.test(form.contactNumber.trim())) {
      setError('Contact number must be exactly 11 digits.')
      setIsSubmitting(false)
      return
    }

    if (username.includes(' ')) {
      setError('Username must not contain spaces.')
      setIsSubmitting(false)
      return
    }

    if (form.password.trim().length < 8) {
      setError('Password must be at least 8 characters.')
      setIsSubmitting(false)
      return
    }

    if (users.some((user) => user.email === email)) {
      setError('Email address already exists.')
      setIsSubmitting(false)
      return
    }

    if (users.some((user) => user.username === username)) {
      setError('Username already exists.')
      setIsSubmitting(false)
      return
    }

    try {
      await addUserAsync({
        ...form,
        email,
        username,
        role: 'editor',
        isActive: true,
      })
    } catch (requestError) {
      setError(requestError.message || 'Unable to create account.')
      setIsSubmitting(false)
      return
    }

    navigate('/auth/signin')
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
        Sign Up
      </h1>
      <p className="mt-2 text-sm leading-5 text-zinc-600">
        Create your Cafe Atlas editor account. The record will appear in the dashboard Users page.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700" htmlFor="first-name">
              First Name
            </label>
            <input
              autoComplete="given-name"
              className={inputClasses}
              id="first-name"
              name="firstName"
              onChange={handleChange}
              placeholder="First name"
              type="text"
              value={form.firstName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700" htmlFor="last-name">
              Last Name
            </label>
            <input   
              autoComplete="family-name"
              className={inputClasses}
              id="last-name"
              name="lastName"
              onChange={handleChange}
              placeholder="Last name"
              type="text"
              value={form.lastName}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700" htmlFor="signup-age">
              Age
            </label>
            <input
              className={inputClasses}
              id="signup-age"
              name="age"
              onChange={handleChange}
              placeholder="21"
              type="text"
              value={form.age}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700" htmlFor="signup-gender">
              Gender
            </label>
            <select className={inputClasses} id="signup-gender" name="gender" onChange={handleChange} value={form.gender}>
              <option value="">Select gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700" htmlFor="signup-email">
            Email
          </label>
          <input
            autoComplete="email"
            className={inputClasses}
            id="signup-email"
            name="email"
            onChange={handleChange}
            placeholder="gwen@example.com"
            type="email"
            value={form.email}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700" htmlFor="signup-contact">
              Contact Number
            </label>
            <input
              autoComplete="tel"
              className={inputClasses}
              id="signup-contact"
              name="contactNumber"
              onChange={handleChange}
              placeholder="09171234567"
              type="text"
              value={form.contactNumber}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700" htmlFor="signup-username">
              Username
            </label>
            <input
              autoComplete="username"
              className={inputClasses}
              id="signup-username"
              name="username"
              onChange={handleChange}
              placeholder="gweneditor"
              type="text"
              value={form.username}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700" htmlFor="signup-password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className={inputClasses}
            id="signup-password"
            name="password"
            onChange={handleChange}
            placeholder="Create a password"
            type="password"
            value={form.password}
          />
          <p className="mt-1.5 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700" htmlFor="signup-address">
            Address
          </label>
          <input
            autoComplete="street-address"
            className={inputClasses}
            id="signup-address"
            name="address"
            onChange={handleChange}
            placeholder="Makati City"
            type="text"
            value={form.address}
          />
        </div>

        <Button className={actionButtonClassName} disabled={isSubmitting} type="submit" variant="primary">
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        <p className="pt-1 text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <Link className="font-semibold text-zinc-900 transition hover:text-zinc-600" to="/auth/signin">
            Log In
          </Link>
        </p>

        <div className="flex items-center gap-3 pt-1 text-xs text-zinc-400">
          <span className="h-px flex-1 bg-zinc-200" />
          <span>Or</span>
          <span className="h-px flex-1 bg-zinc-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button className={providerButtonClassName} type="button" variant="secondary">
            <img alt="" aria-hidden="true" className="h-4 w-4 shrink-0 object-contain" src={googleIcon} />
            <span>Sign Up with Google</span>
          </Button>
          <Button className={providerButtonClassName} type="button" variant="secondary">
            <img alt="" aria-hidden="true" className="h-4 w-4 shrink-0 object-contain" src={appleIcon} />
            <span>Sign Up with Apple</span>
          </Button>
        </div>
      </form>

      
    </>
  );
};

export default SignUpPage;
