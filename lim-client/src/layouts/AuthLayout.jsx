import { Outlet } from "react-router-dom";

const authGradient =
  "bg-[linear-gradient(180deg,_#fed9c9_0%,_#fbcbd1_44%,_#f2b5df_100%)]";

const AuthLayout = () => {
  return (
    <section
      className={`grid min-h-screen w-full text-zinc-900 lg:grid-cols-[1.05fr_0.95fr] ${authGradient}`}
    >
      <div className="relative min-h-[18rem] overflow-hidden p-8 sm:p-10 lg:min-h-screen lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_rgba(255,255,255,0.72),_transparent_22%),radial-gradient(circle_at_48%_38%,_rgba(255,255,255,0.24),_transparent_28%),radial-gradient(circle_at_78%_16%,_rgba(255,255,255,0.42),_transparent_18%),radial-gradient(circle_at_32%_75%,_rgba(255,255,255,0.18),_transparent_24%)]" />
        <div className="relative flex h-full flex-col justify-end rounded-[1.75rem] border border-white/40 bg-white/10 p-6 text-zinc-900/90 backdrop-blur-[2px] sm:p-8">
          <p className="text-base font-medium uppercase tracking-[0.24em] text-zinc-700/75">
            Welcome
          </p>
          <h2 className="mt-4 max-w-sm text-4xl font-semibold leading-tight sm:text-5xl">
            Find the cafe that fits your mood.{" "}
          </h2>
          <p className="mt-4 max-w-sm text-base leading-6 text-zinc-800/70">
           Discover spots by atmosphere, neighborhood, and feeling.
          </p>
        </div>
      </div>

      <main className="flex items-center bg-white/92 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default AuthLayout;
