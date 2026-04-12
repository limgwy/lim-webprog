import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import appleIcon from '../../assets/appleid_button.png';
import googleIcon from '../../assets/web_neutral_sq_na.svg';

const inputClasses =
  'mt-1.5 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName =
  'min-h-8 w-full rounded-xl px-3 py-1.5 text-[9px] font-medium tracking-[0.08em]';

const providerButtonClassName =
  'min-h-8 w-full justify-center gap-2 rounded-xl px-3 py-1.5 text-[11px] font-medium normal-case tracking-normal';

const SignInPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
        Log In
      </h1>
      <p className="mt-2 text-sm leading-5 text-zinc-600">
        Access your account and pick up right where you left off.
      </p>

      <form className="mt-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700" htmlFor="signin-email">
            Email Address
          </label>
          <input
            autoComplete="email"
            className={inputClasses}
            id="signin-email"
            placeholder="gwen@example.com"
            type="email"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700" htmlFor="signin-password">
            Password
          </label>
          <input
            autoComplete="current-password"
            className={inputClasses}
            id="signin-password"
            placeholder="Enter your password"
            type="password"
          />
          <p className="mt-1.5 text-xs leading-5 text-zinc-500">
            It must be a combination of at least 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="font-medium text-zinc-700 transition hover:text-zinc-900" type="button">
            Forgot Password?
          </button>
        </div>

        <Button className={actionButtonClassName} type="submit" variant="primary">
          Log In
        </Button>

        <p className="pt-1 text-center text-sm text-zinc-600">
          Have an account?{' '}
          <Link className="font-semibold text-zinc-900 transition hover:text-zinc-600" to="/auth/signup">
            Sign up
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
            <span>Login with Google</span>
          </Button>
          <Button className={providerButtonClassName} type="button" variant="secondary">
            <img alt="" aria-hidden="true" className="h-4 w-4 shrink-0 object-contain" src={appleIcon} />
            <span>Login with Apple</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignInPage;
