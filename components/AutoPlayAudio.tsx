'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, VolumeX, Volume2 } from 'lucide-react'

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
    window.addEventListener('wheel', handleScroll, { once: false, passive: true })
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
      <audio ref={audioRef} src="/wedding-song.mp3" preload="auto" />

      <motion.div
        className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, type: 'spring' }}
      >
        <AnimatePresence>
          {isMuted && isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-brand-deep/80 backdrop-blur-xl text-white text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-3 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3"
            >
              <Music size={14} className="animate-pulse text-brand-gold" />
              Scroll to Play Our Song
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-premium border border-white/20 overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #1F0D37 0%, #9B82A9 100%)',
          }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isPlaying && !isMuted && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border border-brand-gold/50"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-brand-gold/30"
                animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}

          <div className="relative z-10 text-white group-hover:text-brand-gold transition-colors duration-500">
            {isMuted ? <VolumeX size={26} strokeWidth={1.5} /> : <Volume2 size={26} strokeWidth={1.5} />}
          </div>
          
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-full" />
        </motion.button>
      </motion.div>
    </>
  )
}
