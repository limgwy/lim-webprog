function Logo() {
  return (
    <>
      <div
        className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-gradient-to-br from-[#FDE7D9] via-[#fff8f5] to-[#F5C2E7] text-[var(--text)] shadow-sm"
        aria-hidden="true"
      >
        <span className="absolute h-6 w-6 rounded-full border border-[#e6c5c9]/80" />
        <span className="absolute left-[8px] top-[8px] h-3.5 w-6 rotate-[-35deg] rounded-full bg-[#f2d7cb]/85" />
        <span className="absolute right-[8px] bottom-[8px] h-3.5 w-6 rotate-[35deg] rounded-full bg-[#efc7dd]/85" />
        <span className="relative text-sm font-black uppercase tracking-[0.22em]">CA</span>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-black uppercase tracking-[0.28em] text-[var(--text)]">Cafe Atlas</span>
        <span className="text-xs text-[var(--muted)]">Atmospheres, moods, and neighborhood notes</span>
      </div>
    </>
  )
}

export default Logo
