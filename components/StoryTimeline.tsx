'use client'

import { motion } from 'framer-motion'
import { Heart, Calendar, Stars } from 'lucide-react'

interface StoryItem {
  id: string
  title: string
  description: string
  imageUrl?: string | null
  order: number
}

export default function StoryTimeline({ stories }: { stories: StoryItem[] }) {
  return (
    <section className="py-28 md:py-32 bg-brand-cream relative overflow-hidden">
      
      {/* 🌫️ Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lavender/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-deep/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* 🏷️ Header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border border-brand-lavender/20 text-brand-gold">
              <Heart fill="currentColor" size={22} />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif mb-6 text-brand-deep leading-tight"
          >
            The Chapters of Our{' '}
            <span className="text-brand-lavender italic">Love</span>
          </motion.h2>

          <div className="w-24 h-[2px] bg-brand-gold mx-auto rounded-full opacity-60" />
        </div>

        {/* 📍 Timeline */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent" />

          {stories.map((story, index) => {
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: index * 0.15 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative mb-16 md:mb-24"
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    !isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* 🧊 Card */}
                  <div className="w-full md:w-[45%]">
                    <div className="relative p-8 md:p-10 bg-white/70 backdrop-blur-xl 
                    rounded-[2.5rem] border border-white/60 shadow-xl 
                    hover:shadow-2xl transition-all duration-500 group overflow-hidden">

                      {/* Glow Accent */}
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-lavender/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-all duration-500" />

                      {/* Tag */}
                      <div className={`flex items-center gap-3 mb-5 text-brand-gold ${!isLeft ? 'justify-end' : ''}`}>
                        {index === 0 ? (
                          <Heart size={18} />
                        ) : index === stories.length - 1 ? (
                          <Stars size={18} />
                        ) : (
                          <Calendar size={18} />
                        )}
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">
                          Chapter {story.order}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-serif mb-4 text-brand-deep 
                      group-hover:text-brand-lavender transition-colors duration-500">
                        {story.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {story.description}
                      </p>
                    </div>
                  </div>

                  {/* 🎯 Center Node (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 
                  bg-white border-2 border-brand-gold rounded-full z-10 
                  items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse" />
                  </div>

                  {/* 📱 Mobile Line */}
                  <div className="md:hidden w-[2px] h-10 bg-brand-gold/30" />

                  {/* Spacer */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}