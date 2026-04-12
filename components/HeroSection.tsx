'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isClient, setIsClient] = useState(false)

  // 🎥 Parallax
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window === 'undefined') return

    const { clientX, clientY } = e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    x.set(clientX - centerX)
    y.set(clientY - centerY)
  }

  // ⏳ Countdown
  useEffect(() => {
    const target = new Date('October 31, 2026 13:00:00')

    const interval = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ✅ Ensure client-side rendering for particles
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* 🌄 Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-purple.png"
          alt="Romantic Couple"
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* ✨ Floating Particles (Client Only) */}
      {isClient && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(25)].map((_, i) => {
            const randomX = Math.random() * window.innerWidth
            const randomY = Math.random() * window.innerHeight

            return (
              <motion.span
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                initial={{
                  x: randomX,
                  y: randomY,
                  opacity: 0,
                }}
                animate={{
                  y: randomY - 200,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            )
          })}
        </div>
      )}

      {/* 💡 Glow */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[500px] h-[500px] bg-brand-gold/20 blur-[120px] rounded-full" />
      </div>

      {/* 🎯 Content */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 max-w-4xl mx-auto text-center text-white px-6 py-12"
      >
        {/* Subtitle */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block mb-6 text-brand-gold text-xs md:text-sm font-bold tracking-[0.4em] uppercase 
          bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10"
        >
          Celebrating the Union of
        </motion.span>

        {/* Names */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif 
          bg-black/25 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-white/10
          drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
            MORadekemi
          </h1>

          <span className="text-5xl md:text-6xl lg:text-7xl text-brand-gold italic 
          drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            &
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif 
          bg-black/25 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-white/10
          drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
            AYObami
          </h1>
        </div>

        {/* ⏳ Countdown */}
        <div className="flex gap-3 md:gap-6 justify-center mb-12">
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
              <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/70">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#rsvp"
          className="inline-block px-12 py-5 bg-brand-gold text-brand-deep rounded-full 
          font-bold text-xs uppercase tracking-[0.3em] 
          hover:bg-white hover:text-brand-deep hover:shadow-2xl 
          transition-all duration-500 transform hover:-translate-y-1"
        >
          Save Our Date
        </a>
      </motion.div>
    </section>
  )
}