function Logo() {
  return (
    <>
      <div
        className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-emerald-200 bg-gradient-to-br from-rose-100 via-[#fff8ef] to-emerald-100 text-emerald-950 shadow-sm"
        aria-hidden="true"
      >
        <span className="absolute h-6 w-6 rounded-full border border-emerald-300/70" />
        <span className="absolute left-[8px] top-[8px] h-3.5 w-6 rotate-[-35deg] rounded-full bg-emerald-300/75" />
        <span className="absolute right-[8px] bottom-[8px] h-3.5 w-6 rotate-[35deg] rounded-full bg-rose-200/85" />
        <span className="relative text-sm font-black uppercase tracking-[0.22em]">LB</span>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-black uppercase tracking-[0.28em] text-emerald-950">
          Lily Bloom
        </span>
        <span className="text-xs text-stone-600">Garden stories, floral notes, and article picks</span>
      </div>
    </>
  )
}

export default Logo
