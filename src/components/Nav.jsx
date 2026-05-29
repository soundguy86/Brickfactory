import { NAV } from '../data/content'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="brand" aria-label="BandStage Pro, Startseite">
          <span className="brand__mark">
            Band<b>Stage</b> Pro
          </span>
          <span className="brand__loc">Regensburg</span>
        </a>
        <div className="nav__links">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#coaching" className="btn btn--solid">
            Buchen
          </a>
        </div>
      </div>
    </nav>
  )
}
