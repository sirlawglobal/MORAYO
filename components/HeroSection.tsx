'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date('October 31, 2026 13:00:00')

    const interval = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-purple.png"
          alt="Romantic Couple"
          fill
          priority
          className="object-cover scale-100 animate-subtle-zoom"
        />

        {/* Light overlay (keeps image visible) */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Soft radial gradient (focus on center) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl mx-auto text-center text-white px-6 py-12 md:px-16 md:py-20"
        >
          
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block mb-6 text-brand-gold text-xs md:text-sm font-bold tracking-[0.4em] uppercase 
            bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10"
          >
            Celebrating the Union of
          </motion.span>

          {/* Names */}
          <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif 
              bg-black/25 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 
              rounded-[2rem] border border-white/10 shadow-2xl
              drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              MORadekemi
            </motion.h1>

            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl text-brand-gold italic 
              drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            >
              &
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif 
              bg-black/25 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 
              rounded-[2rem] border border-white/10 shadow-2xl
              drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              AYObami
            </motion.h1>
          </div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-3 md:gap-6 justify-center mb-12"
          >
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-14 h-16 md:w-20 md:h-24 bg-white/10 backdrop-blur-lg 
                rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                  <span className="text-2xl md:text-4xl font-serif text-brand-gold">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-2 text-[9px] uppercase tracking-[0.2em] font-bold text-white/70">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#rsvp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="inline-block px-12 py-5 bg-brand-gold text-brand-deep rounded-full 
            font-bold text-xs uppercase tracking-[0.3em] 
            hover:bg-white hover:text-brand-deep hover:shadow-2xl 
            transition-all duration-500 transform hover:-translate-y-1"
          >
            Save Our Date
          </motion.a>
        </motion.div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-10 left-10 w-24 h-24 border-l-2 border-t-2 border-brand-gold/30 rounded-tl-[40px] opacity-30" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-r-2 border-b-2 border-brand-gold/30 rounded-br-[40px] opacity-30" />
    </section>
  )
}