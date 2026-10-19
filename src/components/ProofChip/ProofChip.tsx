import { useState } from 'react'
import styles from './ProofChip.module.scss'

// "55k+ active users" → value "55k+", label "active users"
const splitStat = (text: string) => {
  const [value, ...label] = text.split(' ')
  return { value, label: label.join(' ') }
}

interface ProofChipProps {
  text: string
  details: string
  isOpen?: boolean
  onToggle?: () => void
}

const ProofChip = ({ text, details, isOpen, onToggle }: ProofChipProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isExpanded = isOpen !== undefined ? isOpen : internalOpen
  const handleToggle = onToggle ?? (() => setInternalOpen(!internalOpen))
  const { value, label } = splitStat(text)
  return (
    <>
      <button
        type="button"
        className={styles.proofChip}
        onClick={handleToggle}
        aria-expanded={isExpanded}
      >
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>
          {label}
          <svg
            className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isExpanded && <p className={styles.details}>{details}</p>}
    </>
  )
}

export default ProofChip
