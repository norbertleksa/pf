import { useLanguage } from '../../../contexts/LanguageContext'
import { trackEvent } from '../../../utils/analytics'
import { type Project, imageVariant } from '../projectsData'
import styles from './ProjectCard.module.scss'

interface ProjectCardProps {
  project: Project
  onOpenModal: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const { language } = useLanguage()
  const cover = project.screenshots?.[0]

  return (
    <button
      type="button"
      className={styles.projectCard}
      onClick={() => {
        trackEvent({
          category: 'Projects',
          action: 'click_project',
          label: project.id,
        })
        onOpenModal()
      }}
    >
      <div className={styles.screenshot}>
        {cover && (
          <picture>
            <source srcSet={imageVariant(cover, 'md')} type="image/webp" />
            <img
              src={cover}
              alt=""
              className={styles.screenshotImage}
              loading="lazy"
              decoding="async"
            />
          </picture>
        )}
        <span className={styles.cardBadge}>{project.name}</span>
      </div>
      <h3 className={styles.projectName}>{project.name}</h3>
      <p className={styles.projectDescription}>{project.shortDescription[language]}</p>
      <p className={styles.technologies}>{project.technologies.slice(0, 3).join(' · ')}</p>
    </button>
  )
}

export default ProjectCard
