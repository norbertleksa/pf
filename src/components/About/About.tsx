import type React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import ProfileImage from '../HeroSection/ProfileImage/ProfileImage'
import styles from './About.module.scss'

const About: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="section">
      <div className="section-inner">
        <h2 className="section-title">{t.about.title}</h2>
        <div className={styles.content}>
          <div className={styles.imageContent}>
            <ProfileImage />
          </div>
          <div className={styles.textContent}>
            <div className={styles.aboutText}>
              {t.about.content.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 10)} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
