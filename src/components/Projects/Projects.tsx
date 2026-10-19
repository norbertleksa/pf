import type React from 'react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import FeaturedProject from './FeaturedProject/FeaturedProject'
import ProjectCard from './ProjectCard/ProjectCard'
import ProjectModal from './ProjectModal/ProjectModal'
import styles from './Projects.module.scss'
import { type Project, projects } from './projectsData'

const featured = projects.filter((p) => p.highlight)
const others = projects.filter((p) => !p.highlight)

// Each project has a shareable link: /pf/#kitopay opens its details straight away
const projectFromHash = () => projects.find((p) => `#${p.id}` === window.location.hash) ?? null
const isOtherProjectHash = () => others.some((p) => `#${p.id}` === window.location.hash)

const Projects: React.FC = () => {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(projectFromHash)
  const [showOthersMobile, setShowOthersMobile] = useState(isOtherProjectHash)

  // arriving from a project link: put the page under the dialog at the projects section
  useEffect(() => {
    const section = document.getElementById('projects')
    // instant: smooth scrolling is cancelled while the dialog locks the page
    if (projectFromHash() && section)
      window.scrollTo({ top: section.offsetTop, behavior: 'instant' })
  }, [])

  // follow links changed by hand or by back/forward
  useEffect(() => {
    const onHashChange = () => {
      setSelectedProject(projectFromHash())
      if (isOtherProjectHash()) setShowOthersMobile(true)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // mirror the open project in the address bar, so it can be copied and shared
  useEffect(() => {
    const { pathname, search, hash } = window.location
    if (selectedProject) {
      if (hash !== `#${selectedProject.id}`) {
        history.replaceState(null, '', `${pathname}${search}#${selectedProject.id}`)
      }
    } else if (projects.some((p) => `#${p.id}` === hash)) {
      history.replaceState(null, '', `${pathname}${search}`)
    }
  }, [selectedProject])

  const closeModal = () => setSelectedProject(null)

  const goToNextProject = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
    setSelectedProject(projects[(currentIndex + 1) % projects.length])
  }

  const goToPreviousProject = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
    setSelectedProject(projects[(currentIndex - 1 + projects.length) % projects.length])
  }

  return (
    <section id="projects" className="section">
      <div className={`section-inner ${styles.container}`}>
        <div className={styles.header}>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className={styles.sectionSubtitle}>{t.projects.subtitle}</p>
        </div>

        {featured.map((project, index) => (
          <FeaturedProject
            key={project.id}
            project={project}
            index={index}
            onOpenModal={() => setSelectedProject(project)}
          />
        ))}

        <div className={styles.others}>
          <button
            type="button"
            className={styles.headerButton}
            onClick={() => setShowOthersMobile((prev) => !prev)}
            aria-expanded={showOthersMobile}
            aria-controls="other-projects-grid"
          >
            <span className="eyebrow">{t.projects.otherProjects}</span>
            <span className={styles.mobileIndicator}>
              <span className={styles.badge}>{others.length}</span>
              <span className={`${styles.iconWrap} ${showOthersMobile ? styles.iconOpen : ''}`}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </span>
          </button>

          <div
            id="other-projects-grid"
            className={`${styles.projectsGrid} ${showOthersMobile ? styles.gridVisibleMobile : styles.gridStackedMobile}`}
          >
            {others.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen
          onClose={closeModal}
          onNext={goToNextProject}
          onPrevious={goToPreviousProject}
        />
      )}
    </section>
  )
}

export default Projects
