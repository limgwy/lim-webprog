function PageHero({ children, description, eyebrow, image, imageAlt, title }) {
  return (
    <section className="hero">
      <div className="hero-panel">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-text">{description}</p>
        {children}
      </div>

      <div className="hero-visual">
        <img alt={imageAlt} src={image} />
      </div>
    </section>
  )
}

export default PageHero
