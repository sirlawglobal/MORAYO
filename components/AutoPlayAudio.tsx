'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AutoPlayAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasUnmutedRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Start muted so autoplay is allowed by the browser
    audio.muted = true
    audio.loop = true
    audio.volume = 0.5

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }, [])

  // Unmute on first scroll — no click required
  useEffect(() => {
    const handleScroll = () => {
      if (hasUnmutedRef.current) return
      const audio = audioRef.current
      if (!audio) return

      // If audio isn't playing yet (autoplay was blocked), try again
      if (audio.paused) {
        audio.muted = false
        audio.play().then(() => {
          setIsPlaying(true)
          setIsMuted(false)
          hasUnmutedRef.current = true
        }).catch(() => {})
      } else {
        // Audio is already playing muted — just unmute
        audio.muted = false
        setIsMuted(false)
        hasUnmutedRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { once: false, passive: true })
    // Also listen on wheel (for users who "scroll" at top of page without actual scroll offset change)
    window.addEventListener('wheel', handleScroll, { once: false, passive: true })
    // Touch-scroll on mobile
    window.addEventListener('touchmove', handleScroll, { once: false, passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.muted = false
      audio.play().then(() => {
        setIsPlaying(true)
        setIsMuted(false)
        hasUnmutedRef.current = true
      })
    } else {
      audio.muted = !audio.muted
      setIsMuted(audio.muted)
      hasUnmutedRef.current = true
    }
  }

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/wedding-song.mp3" preload="auto" />

      {/* Floating Music Button — still available as manual control */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        {/* Scroll hint — shown only while still muted */}
        <AnimatePresence>
          {isMuted && isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full whitespace-nowrap border border-white/10"
            >
              🎵 Scroll to play music
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music Button */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, #c9a96e 0%, #a87840 100%)',
          }}
          aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        >
          {/* Animated Rings when playing and unmuted */}
          {isPlaying && !isMuted && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-yellow-400/40"
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.8, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
                animate={{ scale: [1, 1.8, 1.8], opacity: [0.6, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              />
            </>
          )}

          {/* Icon */}
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </motion.button>
      </motion.div>
    </>
  )
}
