import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import { type Project, imageVariant, projects } from '../projectsData'
import styles from './ProjectModal.module.scss'

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

type Orientation = 'wide' | 'tall'
type Filter = 'all' | Orientation

const NO_SHOTS: string[] = []
const FILTERS: Filter[] = ['all', 'wide', 'tall']
const webp = (src: string) => src.replace(/\.(jpg|jpeg|png)$/, '.webp')

// Screenshots carry no device info, so tell phones (portrait) from desktop/tablet (landscape) by their real size
const useOrientations = (srcs: string[]) => {
  const [orientations, setOrientations] = useState<Record<string, Orientation>>({})
  useEffect(() => {
    for (const src of srcs) {
      const img = new Image()
      img.onload = () =>
        setOrientations((prev) => ({
          ...prev,
          [src]: img.naturalWidth >= img.naturalHeight ? 'wide' : 'tall',
        }))
      // the small thumbnail has the same proportions, so there's no need to download the full image
      img.src = imageVariant(src, 'thumb')
    }
  }, [srcs])
  return orientations
}

const Chevron = ({ left }: { left?: boolean }) => (
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
    <path d={left ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
  </svg>
)

// size: a lighter copy for thumbnails and the grid; the main viewer gets the full screenshot
const Shot = ({
  src,
  alt,
  className,
  size,
}: { src: string; alt: string; className?: string; size?: 'thumb' | 'md' }) => (
  <picture>
    <source srcSet={size ? imageVariant(src, size) : webp(src)} type="image/webp" />
    <img src={src} alt={alt} className={className} loading="lazy" />
  </picture>
)

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}) => {
  const { t, language } = useLanguage()
  const shots = project.screenshots ?? NO_SHOTS
  const orientations = useOrientations(shots)
  const [filter, setFilter] = useState<Filter>('all')
  const [index, setIndex] = useState(0)
  const [grid, setGrid] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const countOf = (f: Filter) =>
    f === 'all' ? shots.length : shots.filter((s) => orientations[s] === f).length
  const showTabs = countOf('wide') > 0 && countOf('tall') > 0
  const visible = shots.filter((s) => filter === 'all' || orientations[s] === filter)
  const n = visible.length
  const current = Math.min(index, Math.max(n - 1, 0))
  const step = (delta: number) => {
    if (n > 1) setIndex((current + delta + n) % n)
  }

  const position = projects.findIndex((p) => p.id === project.id)
  const previousName = projects[(position - 1 + projects.length) % projects.length].name
  const nextName = projects[(position + 1) % projects.length].name

  // a different project starts from its first screenshot
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on project change only
  useEffect(() => {
    setFilter('all')
    setIndex(0)
    setGrid(false)
  }, [project.id])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!grid && e.key === 'ArrowLeft') step(-1)
      if (!grid && e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  if (!isOpen) return null

  const tag = project.tag ?? project.highlight?.tag
  const filterLabel = { all: t.projects.all, wide: t.projects.wide, tall: t.projects.mobile }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; Escape closes from the keyboard
    <div className={styles.overlay} onClick={onClose}>
      {/* biome-ignore lint/a11y/useSemanticElements: custom overlay; native <dialog> would need showModal() wiring */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.titleRow}>
            {tag && <span className={`eyebrow ${styles.eyebrow}`}>{tag[language]}</span>}
            <h2 id="project-modal-title" className={styles.title} title={project.name}>
              {project.name}
            </h2>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.pill} onClick={onPrevious}>
              <Chevron left />
              <span className={styles.pillLabel}>{previousName}</span>
            </button>
            <button type="button" className={styles.pill} onClick={onNext}>
              <span className={styles.pillLabel}>{nextName}</span>
              <Chevron />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={onClose}
              aria-label={t.projects.close}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.body}>
          {n > 0 && (
            <div className={styles.gallery}>
              <div className={styles.toolbar}>
                {showTabs ? (
                  <div role="tablist" aria-label={t.projects.gallery} className={styles.tabs}>
                    {FILTERS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        role="tab"
                        aria-selected={filter === f}
                        className={`${styles.tab} ${filter === f ? styles.tabActive : ''}`}
                        onClick={() => {
                          setFilter(f)
                          setIndex(0)
                        }}
                      >
                        {filterLabel[f]} <span className={styles.tabCount}>{countOf(f)}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <span />
                )}
                <div className={styles.toolbarEnd}>
                  {!grid && (
                    <span className={styles.counter}>
                      {current + 1} / {n}
                    </span>
                  )}
                  {n > 1 && (
                    <button
                      type="button"
                      className={`${styles.pill} ${grid ? styles.pillActive : ''}`}
                      aria-pressed={grid}
                      onClick={() => setGrid(!grid)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                      {grid ? t.projects.backToViewer : t.projects.allScreenshots}
                    </button>
                  )}
                </div>
              </div>

              {grid ? (
                <div className={styles.grid}>
                  {visible.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className={`${styles.tile} ${orientations[src] === 'wide' ? styles.tileWide : ''}`}
                      onClick={() => {
                        setIndex(i)
                        setGrid(false)
                      }}
                      aria-label={`${t.projects.screenshot} ${i + 1}`}
                    >
                      <Shot src={src} alt="" className={styles.tileImage} size="md" />
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <div
                    className={styles.stage}
                    onTouchStart={(e) => {
                      touchStartX.current = e.touches[0].clientX
                    }}
                    onTouchEnd={(e) => {
                      if (touchStartX.current === null) return
                      const dx = e.changedTouches[0].clientX - touchStartX.current
                      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
                      touchStartX.current = null
                    }}
                  >
                    <Shot
                      src={visible[current]}
                      alt={`${project.name} — ${t.projects.screenshot} ${current + 1} / ${n}`}
                      className={styles.stageImage}
                    />
                    {n > 1 && (
                      <>
                        <button
                          type="button"
                          className={`${styles.arrow} ${styles.arrowLeft}`}
                          onClick={() => step(-1)}
                          aria-label={t.projects.previousScreenshot}
                        >
                          <Chevron left />
                        </button>
                        <button
                          type="button"
                          className={`${styles.arrow} ${styles.arrowRight}`}
                          onClick={() => step(1)}
                          aria-label={t.projects.nextScreenshot}
                        >
                          <Chevron />
                        </button>
                      </>
                    )}
                  </div>
                  {n > 1 && (
                    <div className={styles.filmstrip}>
                      {visible.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
                          onClick={() => setIndex(i)}
                          aria-label={`${t.projects.screenshot} ${i + 1}`}
                          aria-current={i === current}
                        >
                          <Shot src={src} alt="" className={styles.thumbImage} size="thumb" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <aside className={styles.details}>
            <p className={styles.description}>{project.description[language]}</p>

            {project.highlight && (
              <dl className={styles.metrics}>
                {project.highlight.metrics.map((metric, i) => (
                  <div key={metric.value} className={styles.metric}>
                    <dt>{metric.label[language]}</dt>
                    <dd className={i === 0 ? styles.metricAccent : ''}>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className={styles.links}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveLink}
                >
                  {project.liveUrlLabel ? project.liveUrlLabel[language] : t.projects.viewLive}
                </a>
              )}
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.outlineLink}
                >
                  App Store
                </a>
              )}
              {project.githubUrl && !project.githubHidden && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.outlineLink}
                >
                  {t.projects.viewCode}
                </a>
              )}
            </div>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>{t.projects.myRole}</h3>
              <p>{project.role[language]}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>{t.projects.achievements}</h3>
              <ul className={styles.achievements}>
                {project.achievements[language].map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>{t.projects.technologies}</h3>
              <ul className={styles.techList}>
                {project.technologies.map((tech) => (
                  <li key={tech} className={styles.techTag}>
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
