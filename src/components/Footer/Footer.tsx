import type React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          {t.footer.copyright.replace('{{year}}', year.toString())}
        </p>
        <a href="#hero" className={styles.backToTop}>
          {t.footer.backToTop} ↑
        </a>
      </div>
    </footer>
  )
}

export default Footer
