'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const target = new Date('October 31, 2026 13:00:00')

    const interval = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      setDays(d)

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      setHours(h)

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      setMinutes(m)

      const s = Math.floor((difference % (1000 * 60)) / 1000)
      setSeconds(s)

      if (difference <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image - Now fully visible */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-purple.png"
          alt="Romantic Couple"
          fill
          priority
          className="object-cover scale-105 animate-subtle-zoom"
        />
        {/* Transparent Overlays - Minimum needed for text readability only */}
        <div className="absolute inset-0 bg-black/20" /> {/* Very light darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="absolute inset-0 texture-silk opacity-5 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto text-center text-white px-6 py-12 md:px-16 md:py-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-6 inline-block"
          >
            <span className="inline-block text-brand-gold text-xs md:text-sm font-bold tracking-[0.4em] uppercase shadow-lg bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              Celebrating the Union of
            </span>
          </motion.div>
          
          <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight inline-block bg-black/30 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 rounded-[2rem] border border-white/10 shadow-2xl"
            >
              MORadekemi
            </motion.h1>
            
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl text-brand-gold italic serif drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] z-10 relative"
            >
              &
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight inline-block bg-black/30 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 rounded-[2rem] border border-white/10 shadow-2xl"
            >
              AYObami
            </motion.h1>
          </div>

          {/* Countdown - Minimal Glass Style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex gap-2 md:gap-6 justify-center mb-12"
          >
            {[
              { label: 'Days', value: days },
              { label: 'Hrs', value: hours },
              { label: 'Mins', value: minutes },
              { label: 'Secs', value: seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-14 h-16 md:w-20 md:h-24 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                  <span className="text-2xl md:text-4xl font-serif text-brand-gold">{item.value.toString().padStart(2, '0')}</span>
                </div>
                <span className="mt-2 text-[9px] uppercase tracking-[0.2em] font-bold text-white/70 shadow-sm">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <a
              href="#rsvp"
              className="inline-block px-12 py-5 bg-brand-gold text-brand-deep rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-deep hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 shadow-xl"
            >
              Save Our Date
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Corner Accents */}
      <div className="absolute top-10 left-10 w-24 h-24 border-l-2 border-t-2 border-brand-gold/30 rounded-tl-[40px] opacity-30" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-r-2 border-b-2 border-brand-gold/30 rounded-br-[40px] opacity-30" />
    </section>
  )
}
