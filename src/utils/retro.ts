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

// Easter egg: swaps the whole page for the 90s homepage, with music
export const toggleRetro = () => {
  const root = document.documentElement
  if (isRetroNow()) {
    root.setAttribute('data-theme', localStorage.getItem('portfolio-theme') || 'light')
    stopRetroMusic()
  } else {
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
