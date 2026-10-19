import { useState } from 'react'
import styles from './ProofChip.module.scss'

// "55k+ active users" → value "55k+", label "active users"
const splitStat = (text: string) => {
  const [value, ...label] = text.split(' ')
  return { value, label: label.join(' ') }
}

const ProofChip = ({ text, details }: { text: string; details: string }) => {
  const [showDetails, setShowDetail] = useState(false)
  const { value, label } = splitStat(text)
  return (
    <>
      <button
        type="button"
        className={styles.proofChip}
        onClick={() => setShowDetail(!showDetails)}
        aria-expanded={showDetails}
      >
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>
          {label}
          <svg
            className={`${styles.chevron} ${showDetails ? styles.chevronOpen : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {showDetails && <p className={styles.details}>{details}</p>}
    </>
  )
}

export default ProofChip
