import { useCallback, useEffect, useState } from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useTheme } from '../../../contexts/ThemeContext'
import NavButton from './NavButton'
import styles from './TopBar.module.scss'

const TopBar = () => {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'pl' ? 'en' : 'pl')
  }

  const toggleMenu = () => {
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
            >
              {language === 'pl' ? 'EN' : 'PL'}
            </button>
            <button
              type="button"
              className={styles.themeButton}
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
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

      {/* Mobile Menu Overlay - Outside of header */}
      <div
        className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        onClick={handleOverlayClick}
      >
        {/* Close Button inside overlay */}
        <button
          type="button"
          className={`${styles.closeButton} ${isMenuOpen ? styles.closeButtonVisible : ''}`}
          onClick={closeMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              closeMenu()
            }
          }}
          aria-label="Close menu"
        >
          <span className={styles.closeLine} />
          <span className={styles.closeLine} />
        </button>

        <nav className={styles.mobileNavigation}>
          <NavButton
            href="#hero"
            text={t.topBar.hero}
            onClick={(e) => {
              handleNavClick(e, '#hero')
              closeMenu()
            }}
          />
          <NavButton
            href="#projects"
            text={t.topBar.projects}
            onClick={(e) => {
              handleNavClick(e, '#projects')
              closeMenu()
            }}
          />
          <NavButton
            href="#skills"
            text={t.topBar.skills}
            onClick={(e) => {
              handleNavClick(e, '#skills')
              closeMenu()
            }}
          />
          <NavButton
            href="#contact"
            text={t.topBar.contact}
            onClick={(e) => {
              handleNavClick(e, '#contact')
              closeMenu()
            }}
            style={styles.mobileContact}
          />
          <div className={styles.mobileLanguageThemeContainer}>
            <button
              type="button"
              className={styles.mobileLanguageButton}
              onClick={() => {
                toggleLanguage()
              }}
              title={t.common.language}
            >
              {language === 'pl' ? 'EN' : 'PL'}
            </button>
            <button
              type="button"
              className={styles.mobileThemeButton}
              onClick={() => {
                toggleTheme()
              }}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default TopBar
