'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, Shirt } from 'lucide-react'

export default function EventDetails() {
  const events = [
    {
      id: 1,
      title: 'Traditional Wedding',
      date: 'December 28, 2026',
      time: '10:00 AM',
      location: 'Grand Heritage Hall, Lagos',
      dressCode: 'Elegant Traditional Attire',
      icon: <Calendar className="text-brand-gold" size={24} />,
    },
    {
      id: 2,
      title: 'Wedding Ceremony',
      date: 'December 31, 2026',
      time: '1:00 PM',
      location: 'The White Pebble Chapel, Lagos',
      dressCode: 'Strictly Formal / Black Tie',
      icon: <Clock className="text-brand-gold" size={24} />,
    },
    {
      id: 3,
      title: 'Reception Party',
      date: 'December 31, 2026',
      time: '4:00 PM',
      location: 'Grand Ballroom, Eko Hotel',
      dressCode: 'Evening Grace',
      icon: <MapPin className="text-brand-gold" size={24} />,
    }
  ]

  return (
    <section id="details" className="py-24 bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            The Big Day
          </motion.h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-gold hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-brand-pink/20 rounded-full flex items-center justify-center mb-6">
                {event.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{event.title}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="mt-1 text-brand-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Date</p>
                    <p className="text-brand-dark font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-1 text-brand-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Time</p>
                    <p className="text-brand-dark font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-brand-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Venue</p>
                    <p className="text-brand-dark font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shirt size={18} className="mt-1 text-brand-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Dress Code</p>
                    <p className="text-brand-dark font-medium">{event.dressCode}</p>
                  </div>
                </div>
              </div>

              <button 
                className="w-full py-3 border border-brand-gold/50 text-brand-gold rounded-lg hover:bg-brand-gold hover:text-white transition-all duration-300 text-sm font-medium"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`, '_blank')}
              >
                Get Directions
              </button>
            </motion.div>
          ))}
        </div>

        {/* Google Maps Embed Placeholder - User can replace with actual API key/embed */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-1000"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126844.063486026!2d3.350624!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a3da57233f!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1650000000000!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
          ></iframe>
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
            <p className="text-white text-sm font-medium">Join us at the heart of Lagos</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
