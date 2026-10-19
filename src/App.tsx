import Contact from './components/Contact/Contact'
import HeroSection from './components/HeroSection/HeroSection'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'

import Footer from './components/Footer/Footer'

function App() {
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
