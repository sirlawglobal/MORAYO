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
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-brand-deep">
      {/* Cinematic Hero Background - No Blur here per user request */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-purple.png"
          alt="Romantic Couple"
          fill
          priority
          className="object-cover scale-105 animate-subtle-zoom"
        />
        {/* Darkening Overlays only */}
        <div className="absolute inset-0 bg-brand-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/70 via-transparent to-brand-deep/80" />
        <div className="absolute inset-0 texture-silk opacity-10 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto text-center text-white px-8 py-16 md:px-16 md:py-24 bg-brand-deep/20 backdrop-blur-xl rounded-[5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-brand-lavender/10 rounded-full blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-8 inline-block"
          >
            <span className="text-brand-gold bg-brand-gold/10 px-6 py-2 rounded-full text-xs md:text-sm font-bold tracking-[0.4em] uppercase border border-brand-gold/20">
              Celebrating the Union of
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="text-5xl md:text-8xl font-serif mb-10 text-white drop-shadow-2xl leading-none"
          >
            MORadekemi <span className="text-brand-gold italic serif block md:inline md:mx-4">&</span> AYObami
          </motion.h1>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex gap-3 md:gap-10 justify-center mb-16"
          >
            {[
              { label: 'Days', value: days },
              { label: 'Hrs', value: hours },
              { label: 'Mins', value: minutes },
              { label: 'Secs', value: seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-20 md:w-24 md:h-28 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl md:text-5xl font-serif text-brand-gold relative z-10">{item.value.toString().padStart(2, '0')}</span>
                </div>
                <span className="mt-3 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-lavender/60">{item.label}</span>
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
              className="inline-block px-16 py-6 bg-white text-brand-deep rounded-full font-bold text-xs uppercase tracking-[0.4em] hover:bg-brand-gold hover:text-white hover:shadow-[0_25px_50px_rgba(212,175,55,0.4)] transition-all duration-700 transform hover:-translate-y-2 relative overflow-hidden group"
            >
              <span className="relative z-10">Reserve Your Spot</span>
              <div className="absolute inset-0 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Silk Corners */}
      <div className="absolute top-10 left-10 w-40 h-40 border-l border-t border-brand-gold/30 rounded-tl-[60px] opacity-40" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border-r border-b border-brand-gold/30 rounded-br-[60px] opacity-40" />
    </section>
  )
}
