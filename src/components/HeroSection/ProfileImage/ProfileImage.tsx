import { useCallback } from 'react'
import profileImagePng from '../../../assets/images/me.png'
import profileImageWebp from '../../../assets/images/me.webp'
import styles from './ProfileImage.module.scss'

const ProfileImage = () => {
  const handleImageClick = useCallback(() => {
    const root = document.documentElement
    const isRetro = root.getAttribute('data-theme') === 'retro90s'

    if (isRetro) {
      const saved = localStorage.getItem('portfolio-theme') || 'light'
      root.setAttribute('data-theme', saved)
    } else {
      root.setAttribute('data-theme', 'retro90s')
    }
  }, [])

  return (
    <div className={styles.profileContainer}>
      <div className={styles.decorativeElements}>
        <div className={styles.orbit1} />
        <div className={styles.orbit2} />
        <div className={styles.star1} />
        <div className={styles.star2} />
        <div className={styles.star3} />
        <div className={styles.circle1} />
        <div className={styles.circle2} />
      </div>

      <div className={styles.imageWrapper}>
        <div className={styles.profileImage}>
          <picture>
            <source srcSet={profileImageWebp} type="image/webp" />
            <img src={profileImagePng} alt="Norbert Leksa" className={styles.profileImg} />
          </picture>
          <button
            type="button"
            className={styles.easterEgg}
            onClick={handleImageClick}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileImage
