import { useEffect, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { trackEvent } from '../../utils/analytics'
import { toggleRetro } from '../../utils/retro'
import ProofChip from '../ProofChip/ProofChip'
import styles from './HeroSection.module.scss'
import TopBar from './TopBar/TopBar'

const HeroSection = () => {
  const { t } = useLanguage()
  const [isGlitching, setIsGlitching] = useState(true)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const runGlitchCycle = () => {
      // Animation duration (slowed down significantly)
      const glitchDuration = 3000
      // Random wait between 1s and 3s
      const randomWait = Math.random() * 2000 + 3000

      setIsGlitching(true)

      timeoutId = setTimeout(() => {
        setIsGlitching(false)
        timeoutId = setTimeout(runGlitchCycle, randomWait)
      }, glitchDuration)
    }

    const initialTimeout = setTimeout(runGlitchCycle, 1000)
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(initialTimeout)
    }
  }, [])

  const handleScheduleCall = () => {
    // Check if it's mobile (touch device)
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isMobile) {
      // On mobile, make a phone call
      window.location.href = 'tel:+48514230618'
    } else {
      // On desktop, scroll to contact section
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const getButtonText = () => {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    return isMobile ? t.hero.callMe : t.hero.scheduleCall
  }

  return (
    <section id="hero" className={styles.heroSection}>
      <TopBar />
      <div className={styles.content}>
        <div className={styles.monogram}>
          <button
            type="button"
            className={styles.egg}
            onClick={toggleRetro}
            aria-label="Easter egg"
          >
            <svg viewBox="0 0 100 128" aria-hidden="true">
              <defs>
                <clipPath id="egg-shape">
                  <path d="M50 4C22 4 6 48 6 76c0 28 20 48 44 48s44-20 44-48C94 48 78 4 50 4Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#egg-shape)">
                <rect width="100" height="128" fill="#d6402f" />
                <rect y="44" width="100" height="12" fill="#f5b83d" />
                <rect y="84" width="100" height="12" fill="#f5b83d" />
                <path
                  d="M0 70l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8"
                  fill="none"
                  stroke="#fff6e5"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <circle cx="30" cy="26" r="5" fill="#fff6e5" />
                <circle cx="50" cy="20" r="5" fill="#fff6e5" />
                <circle cx="70" cy="26" r="5" fill="#fff6e5" />
                <circle cx="35" cy="110" r="4" fill="#fff6e5" />
                <circle cx="65" cy="110" r="4" fill="#fff6e5" />
              </g>
            </svg>
          </button>
          <span className={styles.flap} aria-hidden="true">
            N
          </span>
          <span className={`${styles.flap} ${styles.flapAccent}`} aria-hidden="true">
            L
          </span>
        </div>
        <div className={styles.textContent}>
          <p className="eyebrow">{t.hero.headline} · React / Next.js / Flutter</p>
          <h1
            className={`${styles.name} ${isGlitching ? styles.glitching : ''}`}
            data-text={t.topBar.logoText}
            // the glitch layers repeat the name via CSS content; keep screen readers to one copy
            aria-label={t.topBar.logoText}
          >
            {t.topBar.logoText}
          </h1>
          <p className={styles.description}>{t.hero.description}</p>
          <div
            id="about-more"
            className={`${styles.moreWrap} ${showMore ? styles.moreOpen : ''}`}
            aria-hidden={!showMore}
          >
            <div className={styles.more}>
              {t.about.content.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 10)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={styles.moreToggle}
            onClick={() => setShowMore(!showMore)}
            aria-expanded={showMore}
            aria-controls="about-more"
          >
            {showMore ? t.hero.readLess : t.hero.readMore}
            <svg
              className={showMore ? styles.chevronOpen : ''}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul className={styles.achievements}>
            {t.hero.achievements.map((achievement) => (
              <li key={achievement.text.slice(0, 10)}>
                <ProofChip text={achievement.text} details={achievement.details} />
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => {
                trackEvent({
                  category: 'Hero',
                  action: 'click_cta',
                  label: 'schedule_call',
                })
                handleScheduleCall()
              }}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
