import { useLanguage } from '../../../contexts/LanguageContext'
import { trackEvent } from '../../../utils/analytics'
import type { Project } from '../projectsData'
import styles from './FeaturedProject.module.scss'

interface FeaturedProjectProps {
  project: Project
  index: number
  onOpenModal: () => void
}

const ArrowIcon = () => (
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
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, index, onOpenModal }) => {
  const { t, language } = useLanguage()
  const screenshots = project.screenshots ?? []
  const cover = project.highlight?.cover
  const coverSrc = screenshots[cover?.index ?? 0]
  const open = () => {
    trackEvent({ category: 'Projects', action: 'click_project', label: project.id })
    onOpenModal()
  }

  return (
    <article className={`${styles.featured} ${index % 2 === 1 ? styles.reversed : ''}`}>
      <button
        type="button"
        className={styles.cover}
        onClick={open}
        aria-label={`${t.projects.gallery}: ${project.name}`}
      >
        {coverSrc && (
          <picture>
            <source srcSet={coverSrc.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
            <img
              src={coverSrc}
              alt=""
              className={`${styles.coverImage} ${cover?.fill ? styles.coverFill : ''}`}
            />
          </picture>
        )}
        <span className={styles.galleryBadge}>
          {t.projects.gallery} · {screenshots.length}
        </span>
      </button>

      <div className={styles.body}>
        <p className="eyebrow">
          {String(index + 1).padStart(2, '0')} — {project.highlight?.tag[language]}
        </p>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.description}>{project.description[language]}</p>

        {project.highlight && (
          <dl className={styles.metrics}>
            {project.highlight.metrics.map((metric, i) => (
              <div key={metric.value} className={styles.metric}>
                <dt className={styles.metricLabel}>{metric.label[language]}</dt>
                <dd className={`${styles.metricValue} ${i === 0 ? styles.metricAccent : ''}`}>
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <ul className={styles.techList}>
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech} className={styles.techTag}>
              {tech}
            </li>
          ))}
        </ul>

        <div className={styles.links}>
          <button type="button" className={styles.link} onClick={open}>
            {t.projects.details}
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {project.liveUrlLabel ? project.liveUrlLabel[language] : t.projects.viewLive}
              <ArrowIcon />
            </a>
          )}
          {project.appStoreUrl && (
            <a
              href={project.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkMuted}`}
            >
              App Store
              <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default FeaturedProject
