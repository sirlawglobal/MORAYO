'use client'

import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Stars } from 'lucide-react'

interface StoryItem {
  id: number
  title: string
  description: string
  imageUrl?: string | null
  createdAt: Date
}

export default function StoryTimeline({ stories }: { stories: StoryItem[] }) {
  return (
    <section id="story" className="py-24 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Our Love Story
          </motion.h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-brand-gold/20 z-0" />

          {stories.map((story, index) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative flex items-center justify-between mb-16 w-full ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className="w-[45%] p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-brand-pink/30 group">
                <div className="flex items-center gap-3 mb-4 text-brand-gold">
                  {index === 0 ? <Heart size={20} /> : index === stories.length - 1 ? <Stars size={20} /> : <Calendar size={20} />}
                  <span className="text-sm font-medium tracking-widest uppercase">
                    {new Date(story.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-brand-gold transition-colors">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{story.description}</p>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-brand-gold rounded-full z-10 flex items-center justify-center text-brand-gold overflow-hidden">
                <div className="w-2 h-2 bg-brand-gold rounded-full" />
              </div>

              {/* Empty Space for alignment */}
              <div className="w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
