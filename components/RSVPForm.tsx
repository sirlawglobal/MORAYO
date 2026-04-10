'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitRSVP } from '@/app/actions/wedding'
import { Heart, Send } from 'lucide-react'

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
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-24 bg-brand-pink/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-brand-gold"
          >
            <div className="w-20 h-20 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold animate-bounce">
              <Heart fill="currentColor" size={40} />
            </div>
            <h2 className="text-3xl font-serif mb-4">Thank You!</h2>
            <p className="text-gray-600 font-light">Your response has been saved. We can't wait to see you!</p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 bg-brand-pink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-brand-pink/30">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif mb-2">Are You Joining Us?</h2>
            <p className="text-brand-gold uppercase tracking-widest text-xs font-medium">Please RSVP by December 1st, 2026</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Full Name</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-brand-gold outline-none transition-colors duration-300 placeholder:text-gray-300" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Email Address</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-brand-gold outline-none transition-colors duration-300 placeholder:text-gray-300" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Phone Number</label>
                <input 
                  name="phone" 
                  type="tel" 
                  required 
                  placeholder="+234 ..."
                  className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-brand-gold outline-none transition-colors duration-300 placeholder:text-gray-300" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Attendance</label>
                <select 
                  name="status" 
                  required
                  className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-brand-gold outline-none transition-colors duration-300 bg-white"
                >
                  <option value="attending">Accepts with Pleasure</option>
                  <option value="not_attending">Declines with Regret</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">A Message for the Couple</label>
              <textarea 
                name="message" 
                rows={4}
                placeholder="Share your warm wishes..."
                className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-brand-gold outline-none transition-colors duration-300 placeholder:text-gray-300 resize-none"
              ></textarea>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-gold text-white py-4 rounded-full font-serif text-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Confirm Attendance
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
