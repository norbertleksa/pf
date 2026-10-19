import { useSyncExternalStore } from 'react'

const RETRO = 'retro90s'
let music: HTMLAudioElement | null = null

const isRetroNow = () => document.documentElement.getAttribute('data-theme') === RETRO

export const stopRetroMusic = () => {
  if (music) {
    music.pause()
    music.currentTime = 0
  }
}

// The retro page's pixel fonts are only fetched once someone finds the easter egg
const loadRetroFonts = () => {
  if (document.getElementById('retro-fonts')) return
  const link = document.createElement('link')
  link.id = 'retro-fonts'
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Silkscreen&family=VT323&display=swap'
  document.head.appendChild(link)
}

// Easter egg: swaps the whole page for the 90s homepage, with music
export const toggleRetro = () => {
  const root = document.documentElement
  if (isRetroNow()) {
    root.setAttribute('data-theme', localStorage.getItem('portfolio-theme') || 'light')
    stopRetroMusic()
  } else {
    loadRetroFonts()
    root.setAttribute('data-theme', RETRO)
    if (!music) {
      music = new Audio(`${import.meta.env.BASE_URL}audio/64-bit-adventure.mp3`)
      music.loop = true
      music.volume = 0.4
    }
    // play() must start inside the click handler, or browsers block it as autoplay
    music.play().catch(() => {})
  }
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export const useIsRetro = () => useSyncExternalStore(subscribe, isRetroNow)

// dev only: hot reload swaps this module, so silence the old player instead of orphaning it
import.meta.hot?.dispose(stopRetroMusic)
