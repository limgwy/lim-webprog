import coffeeIllustration from '../assets/coffee.svg'
import Button from '../components/Button'

const NotFoundPage = () => {
  return (
    <div className="relative mx-auto flex min-h-[72vh] w-full max-w-5xl items-center justify-center px-4 py-12 sm:px-6">
      <div aria-hidden="true" className="page-glow" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.48),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(253,231,217,0.82),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(245,194,231,0.7),transparent_24%)]"
      />

      <section className="relative w-full text-center">
        <div className="pointer-events-none absolute inset-x-0 top-14 text-center font-editorial text-[7rem] leading-none text-white/45 sm:text-[9rem]">
          404
        </div>

        <div className="relative mx-auto mt-10 h-64 w-64 sm:h-72 sm:w-72">
          <div className="absolute inset-x-8 bottom-2 h-10 rounded-full bg-black/10 blur-2xl" />
          <img
            alt="Coffee sticker illustration"
            className="relative z-10 h-full w-full rotate-[-7deg] object-contain drop-shadow-[0_24px_45px_rgba(17,17,17,0.12)]"
            src={coffeeIllustration}
          />
          <span className="ui-shadow-card absolute -left-4 top-5 z-20 rotate-[-10deg] rounded-full bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text)] backdrop-blur-sm">
            Wrong Turn
          </span>
          <span className="ui-shadow-card absolute -right-6 bottom-10 z-20 rotate-[8deg] rounded-full bg-[#111111] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            Cafe Closed
          </span>
        </div>

        <h1 className="font-editorial relative z-10 mx-auto mt-8 max-w-3xl text-5xl font-semibold leading-[0.92] text-[var(--text)] sm:text-6xl lg:text-[4.7rem]">
          This page is not on the menu tonight.
        </h1>
      

        <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            Go Home
          </Button>
          <Button to="/articles">Browse Archive</Button>
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage
