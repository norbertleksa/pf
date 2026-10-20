import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import { type Project, imageVariant } from '../../Projects/projectsData'
import styles from './RetroProjectModal.module.scss'

interface RetroProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

const NO_SHOTS: string[] = []
const webp = (src: string) => src.replace(/\.(jpg|jpeg|png)$/, '.webp')

const RetroProjectModal: React.FC<RetroProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}) => {
  const { t, language } = useLanguage()
  const shots = project.screenshots ?? NO_SHOTS
  const [index, setIndex] = useState(0)
  const [isMaximized, setIsMaximized] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const n = shots.length
  const current = Math.min(index, Math.max(n - 1, 0))

  const step = (delta: number) => {
    if (n > 1) {
      setIndex((current + delta + n) % n)
    }
  }

  // Reset screenshot index on project change
  useEffect(() => {
    setIndex(0)
  }, [project.id])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Keyboard navigation: Escape closes, arrows switch screenshots
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  if (!isOpen) return null

  const tag = project.tag?.[language] ?? project.highlight?.tag[language]
  const achievements = project.achievements[language] ?? []

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1)
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="retro-modal-title"
        className={`${styles.window} ${isMaximized ? styles.maximized : ''}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className={styles.titleBar}>
          <div className={styles.titleBarText}>
            <span className={styles.winIcon} aria-hidden="true">
              🖼️
            </span>
            <span id="retro-modal-title">
              {t.retro.galleryTitle} - [{project.name.toUpperCase()}.BMP]
            </span>
          </div>
          <div className={styles.titleControls}>
            <button
              type="button"
              className={styles.winBtn}
              onClick={() => setIsMaximized(false)}
              aria-label="Minimize"
              title="Minimize"
            >
              _
            </button>
            <button
              type="button"
              className={styles.winBtn}
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? '❐' : '□'}
            </button>
            <button
              type="button"
              className={`${styles.winBtn} ${styles.closeBtn}`}
              onClick={onClose}
              aria-label={t.retro.close}
              title={t.retro.close}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className={styles.menuBar}>
          <span>
            <u>F</u>ile
          </span>
          <span>
            <u>E</u>dit
          </span>
          <span>
            <u>V</u>iew
          </span>
          <span>
            <u>O</u>ptions
          </span>
          <span>
            <u>H</u>elp
          </span>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolGroup}>
            <button
              type="button"
              className={styles.toolBtn}
              onClick={onPrevious}
              title={t.retro.prevProject}
            >
              {t.retro.prevProject}
            </button>
            <button
              type="button"
              className={styles.toolBtn}
              onClick={onNext}
              title={t.retro.nextProject}
            >
              {t.retro.nextProject}
            </button>
          </div>

          <div className={styles.toolGroup}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`${styles.toolBtn} ${styles.liveBtn}`}
              >
                {t.retro.viewLive}
              </a>
            )}
            {project.githubUrl && !project.githubHidden && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.toolBtn}
              >
                {t.retro.viewCode}
              </a>
            )}
          </div>
        </div>

        {/* Window Body */}
        <div className={styles.body}>
          {/* Main Stage (Image Viewer) */}
          {n > 0 && (
            <div
              className={styles.stage}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.stageHeader}>
                <span className={styles.stageTitle}>
                  ★ VIEWING SHOT {current + 1} OF {n} ★
                </span>
                <span className={styles.lcdCounter}>
                  SHOT {String(current + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}
                </span>
              </div>

              <div className={styles.imageFrame}>
                <picture>
                  <source srcSet={webp(shots[current])} type="image/webp" />
                  <img
                    src={shots[current]}
                    alt={`${project.name} - shot ${current + 1}`}
                    className={styles.image}
                  />
                </picture>

                {n > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${styles.stageArrow} ${styles.arrowLeft}`}
                      onClick={() => step(-1)}
                      aria-label={t.retro.prevShot}
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      className={`${styles.stageArrow} ${styles.arrowRight}`}
                      onClick={() => step(1)}
                      aria-label={t.retro.nextShot}
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails strip */}
              {n > 1 && (
                <div className={styles.thumbsStrip}>
                  {shots.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className={`${styles.thumbBtn} ${i === current ? styles.thumbActive : ''}`}
                      onClick={() => setIndex(i)}
                      aria-label={`Shot ${i + 1}`}
                    >
                      <picture>
                        <source srcSet={imageVariant(src, 'thumb')} type="image/webp" />
                        <img src={src} alt="" loading="lazy" />
                      </picture>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project Details Panel */}
          <fieldset className={styles.infoFieldset}>
            <legend className={styles.legend}>
              === {project.name.toUpperCase()}.TXT ===
            </legend>

            <div className={styles.headerRow}>
              <h2 className={styles.projectTitle}>{project.name}</h2>
              {tag && <span className={styles.retroTag}>[{tag.toUpperCase()}]</span>}
            </div>

            <p className={styles.projectDesc}>{project.description[language]}</p>

            {project.role?.[language] && (
              <p className={styles.roleText}>
                <b>MY ROLE:</b> {project.role[language]}
              </p>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className={styles.sectionBlock}>
                <b className={styles.sectionHeading}>{t.retro.achievements}</b>
                <ul className={styles.achieveList}>
                  {achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlight metrics */}
            {project.highlight?.metrics && (
              <div className={styles.metricsBox}>
                {project.highlight.metrics.map((m) => (
                  <div key={m.value} className={styles.metricItem}>
                    <span className={styles.metricVal}>{m.value}</span>
                    <span className={styles.metricLab}>{m.label[language]}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className={styles.sectionBlock}>
              <b className={styles.sectionHeading}>{t.retro.techStack}</b>
              <div className={styles.techList}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Windows 95 Status Bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusPart}>
            <span className={styles.led} /> {t.retro.statusBarReady}
          </div>
          <div className={`${styles.statusPart} ${styles.hideSmall}`}>
            {t.retro.statusBarBaud}
          </div>
          <div className={`${styles.statusPart} ${styles.hideSmall}`}>
            {t.retro.statusBarRes}
          </div>
          <div className={styles.statusPart}>
            PAGE {current + 1}/{Math.max(n, 1)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RetroProjectModal
