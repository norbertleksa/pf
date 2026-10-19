import type React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import styles from './Skills.module.scss'
import { skillsData } from './skillsData'

// "NEXT 13 Masters '23" → { name: "NEXT 13 Masters", year: "2023" }
const splitCourse = (course: string) => {
  const match = course.match(/^(.*) '(\d{2})$/)
  return match ? { name: match[1], year: `20${match[2]}` } : { name: course, year: '' }
}

const Skills: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <h2 className="section-title">{t.skills.title}</h2>
        <div className={styles.layout}>
          <dl className={styles.skillsList}>
            {skillsData.map((category) => (
              <div key={category.id} className={styles.skillRow}>
                <dt className={styles.categoryTitle}>
                  {t.skills[category.name as keyof typeof t.skills]}
                </dt>
                <dd className={styles.skills}>{category.skills.join(' · ')}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.aside}>
            <div id="courses" className={styles.block}>
              <h3 className={styles.blockTitle}>{t.courses.title}</h3>
              <ol className={styles.courses}>
                {t.courses.list.map((course) => {
                  const { name, year } = splitCourse(course)
                  return (
                    <li key={course} className={styles.course}>
                      <span>{name}</span>
                      <span className={styles.year}>{year}</span>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div id="languages" className={styles.block}>
              <h3 className={styles.blockTitle}>{t.languages.title}</h3>
              <ul className={styles.languages}>
                {t.languages.list.map((language) => (
                  <li key={language.name} className={styles.language}>
                    <span className={styles.level}>{language.level}</span>
                    <span>{language.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
