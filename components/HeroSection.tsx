'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Example Wedding Date
  const weddingDate = new Date('2026-10-31T00:00:00')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [weddingDate])

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Cinematic Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-purple.png"
          alt="Morayo & Ade Wedding"
          fill
          className="object-cover"
          priority
        />
        {/* Soft Purple & Gold Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/60 via-brand-deep/20 to-brand-cream/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: 20 }}
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
          className="flex justify-center gap-4 md:gap-10 mb-14 bg-brand-deep/30 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl inline-flex mx-auto"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
              <span className="text-3xl md:text-5xl font-serif text-brand-gold drop-shadow-sm">{value}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70">{unit}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-brand-gold text-brand-deep rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 font-bold tracking-widest text-sm"
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
          >
            RSVP YOUR ATTENDANCE
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 glass text-white rounded-full hover:bg-white hover:text-brand-deep transition-all duration-500 font-bold tracking-widest text-sm border-white/30"
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
          >
            EXPLORE OUR STORY
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-bold">The Journey Begins</span>
        <div className="w-[1px] h-16 bg-white/20 relative">
          <motion.div
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-0 w-full h-6 bg-brand-gold"
          />
        </div>
      </motion.div>
    </section>
  )
}
