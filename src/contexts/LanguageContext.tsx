import type React from 'react'
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { type Language, translations } from '../i18n/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language') as Language
    return saved || 'en'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    // keep <html lang> in sync for screen readers, translation tools and search engines
    document.documentElement.lang = language
  }, [language])

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
