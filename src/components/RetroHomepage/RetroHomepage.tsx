import { useState } from 'react'
import { person } from '../../config/person'
import { useLanguage } from '../../contexts/LanguageContext'
import { toggleRetro } from '../../utils/retro'
import { type Project, projects } from '../Projects/projectsData'
import { skillsData } from '../Skills/skillsData'
import styles from './RetroHomepage.module.scss'
import RetroProjectModal from './RetroProjectModal/RetroProjectModal'

const visitorDigits = ['0', '0', '0', '0', '0', '1']

// The retro easter egg: a 90s GeoCities-style homepage built from the same content
const RetroHomepage = () => {
  const { t, language } = useLanguage()
  const [selected, setSelected] = useState<Project | null>(null)
  const year = new Date().getFullYear()

  const step = (delta: number) => {
    if (!selected) return
    const i = projects.findIndex((p) => p.id === selected.id)
    setSelected(projects[(i + delta + projects.length) % projects.length])
  }

  return (
    <div className={styles.page}>
      <div className={styles.marquee}>
        <span>{t.retro.marquee}</span>
      </div>

      <main className={styles.column}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{t.retro.title}</h1>
          <button
            type="button"
            className={styles.egg}
            onClick={toggleRetro}
            aria-label={t.retro.clickMe.replace('← ', '')}
          >
            <svg viewBox="0 0 100 128" aria-hidden="true">
              <path
                d="M50 4C22 4 6 48 6 76c0 28 20 48 44 48s44-20 44-48C94 48 78 4 50 4Z"
                fill="#d6402f"
                stroke="#fff"
                strokeWidth="4"
              />
              <rect x="8" y="44" width="84" height="12" fill="#f5b83d" />
              <rect x="8" y="84" width="84" height="12" fill="#f5b83d" />
              <path
                d="M8 70l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8"
                fill="none"
                stroke="#fff6e5"
                strokeWidth="4"
              />
              <circle cx="34" cy="26" r="5" fill="#fff" />
              <circle cx="52" cy="20" r="5" fill="#fff" />
              <circle cx="68" cy="28" r="5" fill="#fff" />
            </svg>
          </button>
          <span className={styles.clickMe} aria-hidden="true">
            {t.retro.clickMe}
          </span>
        </div>

        <p className={styles.subtitle}>~*~ {t.hero.headline} ~*~</p>

        <div className={styles.construction}>
          <span>{t.retro.underConstruction}</span>
        </div>

        <p className={styles.counter}>
          <span>{t.retro.visitor}</span>
          <span className={styles.digits}>
            {visitorDigits.map((digit, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative digits
              <span key={i}>{digit}</span>
            ))}
          </span>
          <em>{t.retro.justYou}</em>
        </p>

        <hr className={styles.rainbow} />

        <div className={styles.table}>
          <nav className={styles.nav} aria-label={t.retro.navigation}>
            <b>{t.retro.navigation}</b>
            <a href="#gc-about">★ {t.retro.aboutMe}</a>
            <a href="#gc-projects">★ {t.retro.myProjects}</a>
            <a href="#gc-skills">★ {t.retro.skills}</a>
            <a href="#gc-guestbook">★ {t.retro.guestbook}</a>
            <a href={`mailto:${person.email}`}>★ {t.retro.emailMe}</a>
            <div className={styles.nowPlaying}>
              {t.retro.nowPlaying}
              <br />
              64_bit_adventure.mid
            </div>
          </nav>

          <div className={styles.content}>
            <section id="gc-about" className={styles.block}>
              <h2>{t.retro.aboutMe}</h2>
              <p>{t.retro.aboutText}</p>
              <ul className={styles.stats}>
                {t.hero.achievements.map((a) => (
                  <li key={a.text}>{a.text.toUpperCase()}</li>
                ))}
              </ul>
            </section>

            <section id="gc-projects" className={styles.block}>
              <h2>{t.retro.myProjects}</h2>
              <ul className={styles.projects}>
                {projects.map((project, i) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      className={styles.projectLink}
                      onClick={() => setSelected(project)}
                    >
                      {project.name}
                    </button>
                    {i === 0 && <span className={styles.new}>NEW!</span>}
                    {' — '}
                    {project.highlight
                      ? `${project.highlight.tag[language]}, ${project.highlight.metrics[0].value} ${project.highlight.metrics[0].label[language]}`
                      : project.shortDescription[language]}
                  </li>
                ))}
              </ul>
              <p className={styles.hint}>{t.retro.clickProject}</p>
            </section>

            <section id="gc-skills" className={styles.block}>
              <h2>{t.retro.skills}</h2>
              <p>{skillsData.flatMap((c) => c.skills).join(' · ')}</p>
              <p>{t.courses.list.join(' · ')}</p>
              <p>{t.languages.list.map((l) => `${l.name} ${l.level}`).join(' · ')}</p>
            </section>

            <section id="gc-guestbook" className={`${styles.block} ${styles.guestbook}`}>
              <h2>{t.retro.guestbook}</h2>
              <p>{t.contact.subtitle}</p>
              <a href={`mailto:${person.email}`} className={styles.email}>
                {person.email}
              </a>
              <span>
                {t.retro.orCall} <a href="tel:+48514230618">+48 514 230 618</a>
              </span>
            </section>
          </div>
        </div>

        <ul className={styles.badges} aria-label="Badges">
          <li className={styles.badgeReact}>
            MADE WITH
            <br />
            <b>REACT</b>
          </li>
          <li className={styles.badgeFlutter}>
            POWERED BY
            <br />
            <b>FLUTTER</b>
          </li>
          <li className={styles.badgeBest}>
            BEST VIEWED
            <br />
            800×600
          </li>
          <li className={styles.badgeAi}>
            NO AI WAS
            <br />
            HARMED
          </li>
          <li className={styles.badgeNl}>
            {person.initials.join('')}
            <br />
            <b>EST. 2021</b>
          </li>
        </ul>

        <p className={styles.footer}>
          {t.retro.bestViewed}
          <br />© {year} {person.name}
        </p>
      </main>

      {selected && (
        <RetroProjectModal
          project={selected}
          isOpen
          onClose={() => setSelected(null)}
          onNext={() => step(1)}
          onPrevious={() => step(-1)}
        />
      )}
    </div>
  )
}

export default RetroHomepage
