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
      {/* Parallax Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-bg.png"
          alt="Wedding Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-4 text-brand-pink"
        >
          Better Together
        </motion.h2>

        <motion.h1
          className="text-6xl md:text-9xl font-serif mb-8 text-white drop-shadow-2xl"
        >
          MORAdekemi <span className="text-brand-gold">&</span> AYObami
        </motion.h1>

        {/* Countdown */}
        <div className="flex justify-center gap-6 md:gap-12 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-serif text-brand-gold">{value}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-white/80">{unit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            className="px-8 py-3 bg-brand-gold text-white rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 font-medium tracking-wide"
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
          >
            RSVP NOW
          </button>
          <button
            className="px-8 py-3 glass text-white rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300 transform hover:scale-105 font-medium tracking-wide"
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
          >
            OUR STORY
          </button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative">
          <motion.div
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-0 w-full h-4 bg-brand-gold"
          />
        </div>
      </motion.div>
    </section>
  )
}
