import { useCallback, useEffect, useState } from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useTheme } from '../../../contexts/ThemeContext'
import NavButton from './NavButton'
import styles from './TopBar.module.scss'

const GlobeIcon = () => (
  <svg
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
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

// key on the theme restarts the little spin each time it changes
const ThemeIcon = ({ theme }: { theme: string }) => (
  <svg
    key={theme}
    className={styles.themeIcon}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {theme === 'light' ? (
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    ) : (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    )}
  </svg>
)

const MOBILE_LINKS = [
  { href: '#hero', key: 'hero' },
  { href: '#projects', key: 'projects' },
  { href: '#skills', key: 'skills' },
  { href: '#contact', key: 'contact' },
] as const

const TopBar = () => {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const [contactOpen, setContactOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'pl' ? 'en' : 'pl')
  }

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // highlight the section the visitor is currently looking at
      const reached = MOBILE_LINKS.filter(
        ({ href }) => (document.querySelector(href)?.getBoundingClientRect().top ?? 1) <= 120
      )
      setActiveSection(reached[reached.length - 1]?.href ?? '#hero')
      setContactOpen(false)
    }
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const topbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - topbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu()
    }
  }

  // Prevent body scroll when menu is open and handle Escape key
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMenu()
        }
      }

      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }

    document.body.style.overflow = 'unset'
  }, [isMenuOpen, closeMenu])

  return (
    <>
      <header className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <NavButton
              href="#hero"
              text={
                // a miniature of the hero's split-flap monogram
                <>
                  <span className={styles.logoFlap}>N</span>
                  <span className={`${styles.logoFlap} ${styles.logoFlapAccent}`}>L</span>
                </>
              }
              onClick={(e) => handleNavClick(e, '#hero')}
              style={styles.logoIcon}
            />
            <NavButton
              href="#hero"
              text={t.topBar.logoText}
              onClick={(e) => handleNavClick(e, '#hero')}
              style={styles.logoText}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNavigation}>
            <NavButton
              href="#projects"
              text={t.topBar.projects}
              onClick={(e) => handleNavClick(e, '#projects')}
              style={styles.navLink}
            />
            <NavButton
              href="#skills"
              text={t.topBar.skills}
              onClick={(e) => handleNavClick(e, '#skills')}
              style={styles.navLink}
            />
            <NavButton
              href="#contact"
              text={t.topBar.contact}
              onClick={(e) => handleNavClick(e, '#contact')}
              style={styles.navLink}
            />
            <button
              type="button"
              className={styles.languageButton}
              onClick={toggleLanguage}
              title={t.common.language}
              aria-label={`${t.common.language}: ${language.toUpperCase()}`}
            >
              <GlobeIcon />
              {language.toUpperCase()}
            </button>
            <button
              type="button"
              className={styles.themeButton}
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <ThemeIcon theme={theme} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Hamburger Button - Outside of header */}
      <button
        type="button"
        className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleMenu()
          }
        }}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {/* Mobile Menu Overlay - the hamburger above turns into its close (X) button */}
      <div
        className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        onClick={handleOverlayClick}
      >
        <button
          type="button"
          className={styles.mobileLogo}
          aria-label={t.topBar.logoText}
          onClick={(e) => {
            handleNavClick(e, '#hero')
            closeMenu()
          }}
        >
          <span className={styles.logoFlap}>N</span>
          <span className={`${styles.logoFlap} ${styles.logoFlapAccent}`}>L</span>
        </button>

        <nav className={styles.mobileNavigation} aria-label="Main">
          {MOBILE_LINKS.map(({ href, key }, i) => (
            <a
              key={href}
              href={href}
              className={`${styles.mobileLink} ${activeSection === href ? styles.mobileLinkActive : ''}`}
              aria-current={activeSection === href ? 'location' : undefined}
              onClick={(e) => {
                handleNavClick(e, href)
                closeMenu()
              }}
            >
              <span className={styles.mobileLinkIndex}>{String(i + 1).padStart(2, '0')}</span>
              {t.topBar[key]}
            </a>
          ))}
        </nav>

        <div className={styles.mobileFooter}>
          {contactOpen ? (
            <div className={styles.mobileContactChoice}>
              <a href="mailto:norbertleksa@gmail.com" className={styles.mobileContactOption}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {t.contact.email}
              </a>
              <a href="tel:+48514230618" className={styles.mobileContactOption}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                {t.contact.phone}
              </a>
            </div>
          ) : (
            <button
              type="button"
              className={styles.mobileTalk}
              onClick={() => setContactOpen(true)}
              aria-expanded={contactOpen}
            >
              {t.contact.heading.replace(/\.$/, '')}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div className={styles.mobileSettings}>
            <fieldset aria-label={t.common.language} className={styles.mobileLanguages}>
              {(['pl', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={language === code}
                  className={`${styles.mobileLanguage} ${language === code ? styles.mobileLanguageActive : ''}`}
                  onClick={() => setLanguage(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </fieldset>
            <button type="button" className={styles.mobileThemeButton} onClick={toggleTheme}>
              <ThemeIcon theme={theme} />
              {theme === 'light' ? t.common.darkMode : t.common.lightMode}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopBar
