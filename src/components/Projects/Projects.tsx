import type React from 'react'
import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import FeaturedProject from './FeaturedProject/FeaturedProject'
import ProjectCard from './ProjectCard/ProjectCard'
import ProjectModal from './ProjectModal/ProjectModal'
import styles from './Projects.module.scss'
import { type Project, projects } from './projectsData'

const featured = projects.filter((p) => p.highlight)
const others = projects.filter((p) => !p.highlight)

const Projects: React.FC = () => {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
          <h3 className="eyebrow">{t.projects.otherProjects}</h3>
          <div className={styles.projectsGrid}>
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
