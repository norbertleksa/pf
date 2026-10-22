import type React from 'react'
import { useState } from 'react'
import { person } from '../../config/person'
import { useLanguage } from '../../contexts/LanguageContext'
import { trackEvent } from '../../utils/analytics'
import styles from './Contact.module.scss'

const Contact: React.FC = () => {
  const { t } = useLanguage()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  const contactInfo = [
    {
      id: 'email',
      label: t.contact.email,
      value: (
        <>
          {person.emailUser}
          <wbr />
          @gmail.com
        </>
      ),
      link: `mailto:${person.email}`,
      copyValue: person.email,
    },
    {
      id: 'phone',
      label: t.contact.phone,
      value: '+48 514 230 618',
      link: 'tel:+48514230618',
      copyValue: '+48514230618',
    },
  ]

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={`section-inner ${styles.container}`}>
        <p className="eyebrow">{t.contact.title}</p>
        <h2 className={styles.heading}>{t.contact.heading}</h2>
        <p className={styles.subtitle}>{t.contact.subtitle}</p>

        <ul className={styles.rows}>
          {contactInfo.map((item, index) => (
            <li key={item.id} className={styles.row}>
              <div className={styles.rowText}>
                <span className={styles.label}>{item.label}</span>
                <a
                  href={item.link}
                  className={`${styles.value} ${index === 0 ? styles.valueLarge : ''}`}
                  onClick={() =>
                    trackEvent({
                      category: 'Contact',
                      action: 'click_link',
                      label: item.id,
                    })
                  }
                >
                  {item.value}
                </a>
              </div>
              <button
                type="button"
                className={`${styles.copyButton} ${index === 0 ? styles.copyPrimary : ''}`}
                onClick={() => {
                  trackEvent({
                    category: 'Contact',
                    action: 'copy_info',
                    label: item.id,
                  })
                  handleCopy(item.copyValue, item.id)
                }}
                aria-label={`${t.contact.copy}: ${item.label}`}
              >
                {copiedId === item.id ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="12" height="12" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </svg>
                )}
                <span aria-live="polite">
                  {copiedId === item.id ? t.contact.copied : t.contact.copy}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contact
