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


        {/* ⏳ Countdown */}
        <div className="flex gap-3 md:gap-6 justify-center mb-12">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hrs', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-14 h-16 md:w-20 md:h-24 bg-black backdrop-blur-lg 
              rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                <span className="text-2xl md:text-4xl font-serif text-brand-gold">
                  {item.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/70 bg-black">
                {item.label}
              </span>
            </div>
          ))}
        </div>


      </motion.div>
    </section>
  )
}