import styles from './TopBar.module.scss'

interface NavButtonProps {
  href: string
  text: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  style?: string
}

const NavButton = ({ href, text, onClick, style }: NavButtonProps) => {
  return (
    <button onClick={onClick} type="button" className={styles.navButton} tabIndex={-1}>
      <a href={href} className={style}>
        {text}
      </a>
    </button>
  )
}

export default NavButton
