'use client'

import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Stars } from 'lucide-react'

interface StoryItem {
  id: string
  title: string
  description: string
  imageUrl?: string | null
  order: number
}

export default function StoryTimeline({ stories }: { stories: StoryItem[] }) {
  return (
    <section id="story" className="py-32 bg-brand-cream texture-silk relative overflow-hidden">
      {/* Decorative Blur and Textures */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lavender/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-deep/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-brand-lavender/20 text-brand-gold">
              <Heart fill="currentColor" size={24} />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif mb-6 text-brand-deep"
          >
            The Chapters of Our <span className="text-brand-lavender italic">Love</span>
          </motion.h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full opacity-60" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4">
          {/* Vertical Line - Gradient */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-brand-gold/0 via-brand-gold/40 to-brand-gold/0 z-0" />

          {stories.map((story, index) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className={`relative flex items-center justify-between mb-24 w-full ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              {/* Content Card */}
              <div className="w-full md:w-[44%] p-8 bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-premium hover:shadow-2xl transition-all duration-500 border border-white group relative overflow-hidden">
                {/* Subtle Floral/Background Accent inside card */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-lavender/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors" />
                
                <div className={`flex items-center gap-3 mb-5 text-brand-gold ${index % 2 !== 0 ? 'justify-end' : ''}`}>
                  {index === 0 ? <Heart size={18} /> : index === stories.length - 1 ? <Stars size={18} /> : <Calendar size={18} />}
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">
                    Chapter {story.order}
                  </span>
                </div>
                
                <h3 className="text-3xl font-serif mb-5 text-brand-deep group-hover:text-brand-lavender transition-colors duration-500">
                  {story.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
                  {story.description}
                </p>
              </div>

              {/* Timeline Center Node */}
              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-2 border-brand-gold rounded-full z-10 flex items-center justify-center text-brand-gold shadow-xl">
                 <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse-slow" />
              </div>

              {/* Spacer for desktop */}
              <div className="hidden md:block w-[44%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
