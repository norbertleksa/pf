import Contact from './components/Contact/Contact'
import HeroSection from './components/HeroSection/HeroSection'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'

import { useEffect } from 'react'
import Footer from './components/Footer/Footer'
import { projects } from './components/Projects/projectsData'
import RetroHomepage from './components/RetroHomepage/RetroHomepage'
import { stopRetroMusic, useIsRetro } from './utils/retro'

function App() {
  const isRetro = useIsRetro()

  // music belongs to retro mode only, however it was left
  useEffect(() => {
    if (!isRetro) stopRetroMusic()
  }, [isRetro])

  // a project link (#kitopay) must not survive in the address bar while the retro page is shown,
  // or going back would pop that project's dialog open by itself
  useEffect(() => {
    if (isRetro && projects.some((p) => `#${p.id}` === window.location.hash)) {
      const { pathname, search } = window.location
      history.replaceState(null, '', `${pathname}${search}`)
    }
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
