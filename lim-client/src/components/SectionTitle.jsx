function SectionTitle({ intro, title }) {
  return (
    <div className="section-head">
      <h2 className="section-title">{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  )
}

export default SectionTitle
