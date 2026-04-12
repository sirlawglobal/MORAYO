'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('wedding_welcome_seen')

    if (!hasSeenPopup) {
      setTimeout(() => setIsOpen(true), 800) // delay for smooth entry
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('wedding_welcome_seen', 'true')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative max-w-md w-[90%] bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-[2rem] shadow-2xl p-8 text-center text-white"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-brand-gold/10 blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-serif mb-4">
                Welcome 💍
              </h2>

              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                You are warmly invited to celebrate the union of
              </p>

              <h3 className="text-xl font-serif text-brand-gold mb-6">
                MORadekemi & AYObami
              </h3>

              <p className="text-xs text-white/60 mb-8">
                We’re so excited to have you here ❤️
              </p>

              <button
                onClick={handleClose}
                className="px-8 py-3 bg-brand-gold text-brand-deep rounded-full 
                text-xs uppercase tracking-[0.2em] font-bold
                hover:bg-white transition-all duration-300"
              >
                Enter
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}