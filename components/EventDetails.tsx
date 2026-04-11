'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, Shirt, Gem } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  dressCode: string
}

interface EventDetailsProps {
  events: Event[]
}

export default function EventDetails({ events }: EventDetailsProps) {
  // Map icons based on title or index
  const getIcon = (index: number) => {
    switch(index % 3) {
      case 0: return <Gem className="text-brand-gold" size={24} />
      case 1: return <Clock className="text-brand-gold" size={24} />
      default: return <MapPin className="text-brand-gold" size={24} />
    }
  }

  // Fallback data if DB is empty (should not happen after seed)
  const displayEvents = events?.length > 0 ? events : [
    {
      id: '1',
      title: 'Traditional Wedding',
      date: 'December 28, 2026',
      time: '10:00 AM',
      location: 'Grand Heritage Hall, Lagos',
      dressCode: 'Elegant Traditional Attire',
    }
  ]

  return (
    <section id="details" className="py-32 bg-brand-cream texture-silk">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6 text-brand-lavender/40"
          >
            <Gem size={40} strokeWidth={1} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif mb-6 text-brand-deep"
          >
            The Celebration <span className="text-brand-lavender italic">Details</span>
          </motion.h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group bg-white p-10 rounded-[3rem] shadow-premium hover:shadow-2xl transition-all duration-500 border border-brand-lavender/10 relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-lavender/5 rounded-bl-[100px] transition-all group-hover:bg-brand-gold/10" />
              
              <div className="w-16 h-16 bg-brand-deep/5 rounded-[1.5rem] flex items-center justify-center mb-8 border border-brand-lavender/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {getIcon(index)}
              </div>
              
              <h3 className="text-3xl font-serif mb-6 text-brand-deep group-hover:text-brand-lavender transition-colors">{event.title}</h3>
              
              <div className="space-y-6 mb-10 w-full text-left bg-brand-cream/50 p-6 rounded-3xl border border-brand-lavender/5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-gold">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Date</p>
                    <p className="text-brand-deep font-semibold text-sm">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-gold">
                    <Clock size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Time</p>
                    <p className="text-brand-deep font-semibold text-sm">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-gold">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Venue</p>
                    <p className="text-brand-deep font-semibold text-sm line-clamp-1">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-gold">
                    <Shirt size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Dress Code</p>
                    <p className="text-brand-deep font-semibold text-sm">{event.dressCode}</p>
                  </div>
                </div>
              </div>

              <button 
                className="w-full py-4 bg-brand-deep text-white rounded-2xl hover:bg-black hover:shadow-xl transition-all duration-500 text-xs font-bold tracking-[0.2em] uppercase"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`, '_blank')}
              >
                Get Directions
              </button>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 w-full h-[500px] rounded-[3.5rem] overflow-hidden shadow-premium relative group border-8 border-white"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126844.063486026!2d3.350624!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a3da57233f!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1650000000000!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          ></iframe>
          <div className="absolute top-10 left-10 p-8 bg-brand-deep/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 text-white shadow-2xl pointer-events-none translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
             <h4 className="text-2xl font-serif text-brand-gold mb-1">Our Location</h4>
             <p className="text-xs uppercase tracking-widest opacity-60 font-medium">Lagos, Nigeria</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
