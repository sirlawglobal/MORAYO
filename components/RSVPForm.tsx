'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitRSVP } from '@/app/actions/wedding'
import { Heart, Send, Sparkles, Check } from 'lucide-react'

export default function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await submitRSVP(formData)
      if (result.success) {
        setIsSubmitted(true)
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-32 bg-brand-deep relative overflow-hidden">
        <div className="absolute inset-0 texture-silk opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl mx-auto bg-white p-16 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-brand-gold relative"
          >
            <div className="w-24 h-24 bg-brand-deep text-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Check size={48} strokeWidth={3} />
            </div>
            <h2 className="text-5xl font-serif mb-6 text-brand-deep">Blessings Received!</h2>
            <p className="text-gray-500 font-light text-lg mb-8 italic">
              "We have received your response with joy. Thank you for being a part of our beginning."
            </p>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-32 bg-brand-deep relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 texture-silk opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent opacity-10" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-lavender/10 rounded-full blur-[120px]" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-20 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-t-[12px] border-brand-gold group">
          <div className="text-center mb-16">
            <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="inline-block text-brand-gold mb-4"
            >
              <Sparkles size={32} strokeWidth={1} />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-serif mb-4 text-brand-deep">Reservation of <span className="text-brand-lavender italic">Joy</span></h2>
            <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Kind Response Requested by Oct 1st</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-bold">Honored Guest Name</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="Your Full Name"
                  className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all duration-300 placeholder:text-gray-300 text-brand-deep font-medium" 
                />
              </div>
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-bold">Email Address</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="guest@example.com"
                  className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all duration-300 placeholder:text-gray-300 text-brand-deep font-medium" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-bold">Contact Number</label>
                <input 
                  name="phone" 
                  type="tel" 
                  required 
                  placeholder="+234 ..."
                  className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all duration-300 placeholder:text-gray-300 text-brand-deep font-medium" 
                />
              </div>
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-bold">Attendance Status</label>
                <select 
                  name="status" 
                  required
                  className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all duration-300 bg-brand-cream/50 text-brand-deep font-medium cursor-pointer"
                >
                  <option value="attending">Accepts with Pleasure</option>
                  <option value="not_attending">Declines with Regret</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-bold">Special Note for the Couple</label>
              <textarea 
                name="message" 
                rows={4}
                placeholder="Share your prayers and wishes..."
                className="w-full px-6 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all duration-300 placeholder:text-gray-300 resize-none text-brand-deep font-medium"
              ></textarea>
            </div>

            {error && <p className="text-red-500 text-xs text-center font-bold tracking-widest">{error}</p>}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-deep text-white py-6 rounded-3xl font-serif text-2xl hover:bg-black transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50 relative overflow-hidden"
            >
              <span className="relative z-10 transition-transform group-hover:scale-110">
                {isSubmitting ? 'Sending Blessings...' : 'Finalize Reservation'}
              </span>
              {!isSubmitting && <Send size={20} className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 text-brand-gold" />}
              {/* Button Shine */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
            </button>
          </form>
          
          <div className="mt-16 text-center">
             <Heart size={20} className="mx-auto text-brand-gold/40 mb-2" />
             <p className="text-[10px] uppercase tracking-[0.5em] text-gray-300">Morayo & Adebami | Oct 2026</p>
          </div>
        </div>
      </div>
    </section>
  )
}
