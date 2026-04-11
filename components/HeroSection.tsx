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
      {/* Cinematic Hero Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-purple.png"
          alt="Romantic Couple"
          fill
          priority
          className="object-cover scale-105 animate-subtle-zoom"
        />
        {/* Multi-layered luxury overlays */}
        <div className="absolute inset-0 bg-brand-deep/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/60 via-transparent to-brand-deep/80" />
        <div className="absolute inset-0 texture-silk opacity-10 mix-blend-overlay" />
      </div>

      <div
        className="relative z-10 text-center text-white px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-6 inline-block"
        >
          <span className="text-brand-lavender text-sm md:text-base font-medium tracking-[0.4em] uppercase">
            Celebrating the Union of
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="text-5xl md:text-7xl font-serif mb-8 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight"
        >
          MORadekemi <span className="text-brand-gold italic serif">&</span> AYObami
        </motion.h1>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex gap-4 md:gap-8 justify-center mb-12"
        >
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Mins', value: minutes },
            { label: 'Secs', value: seconds }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                <span className="text-2xl md:text-3xl font-serif text-brand-gold">{item.value.toString().padStart(2, '0')}</span>
              </div>
              <span className="mt-2 text-[10px] uppercase tracking-[0.2em] font-medium text-brand-lavender/80">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <a
            href="#rsvp"
            className="inline-block px-12 py-5 bg-white text-brand-deep rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-white hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-1"
          >
            Save Our Date
          </a>
        </motion.div>
      </div>

      {/* Decorative Silk Corners */}
      <div className="absolute top-10 left-10 w-40 h-40 border-l border-t border-brand-gold/30 rounded-tl-[60px] opacity-40" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border-r border-b border-brand-gold/30 rounded-br-[60px] opacity-40" />
    </section>
  )
}
