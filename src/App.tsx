import Contact from './components/Contact/Contact'
import HeroSection from './components/HeroSection/HeroSection'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'

import { useEffect } from 'react'
import Footer from './components/Footer/Footer'
import RetroHomepage from './components/RetroHomepage/RetroHomepage'
import { stopRetroMusic, useIsRetro } from './utils/retro'

function App() {
  const isRetro = useIsRetro()

  // music belongs to retro mode only, however it was left
  useEffect(() => {
    if (!isRetro) stopRetroMusic()
  }, [isRetro])

  if (isRetro) return <RetroHomepage />

  return (
    <div className="app">
      <HeroSection />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
