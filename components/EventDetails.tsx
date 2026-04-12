'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Clock,
  Calendar,
  Shirt,
  Scale,
  Crown,
  PartyPopper,
  Navigation
} from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  dressCode: string
}

export default function EventDetails({ events }: { events: Event[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // 🔥 Enforce your real event structure if DB empty
  // const displayEvents = events?.length
  //   ? events
  //   : [
  //       {
  //         id: '1',
  //         title: 'Court Wedding',
  //         date: 'October 29, 2026',
  //         time: '10:00 AM',
  //         location: 'Registry Office, Lagos',
  //         dressCode: 'Formal / Chic'
  //       },
  //       {
  //         id: '2',
  //         title: 'Engagement & Traditional Wedding',
  //         date: 'October 30, 2026',
  //         time: '12:00 PM',
  //         location: 'Family House, Ile-Ife',
  //         dressCode: 'Traditional Attire'
  //       },
  //       {
  //         id: '3',
  //         title: 'Reception',
  //         date: 'October 31, 2026',
  //         time: '02:00 PM',
  //         location: 'Grand Hall, Lagos',
  //         dressCode: 'Elegant / Glam'
  //       }
  //     ]

  const displayEvents = events?.length
  ? events
  : [
      {
        id: '1',
        title: 'Court Wedding',
        date: 'October 29, 2026',
        time: '10:00 AM',
        location: 'Modakeke, Ife East LGA, Osun State, Nigeria',
        dressCode: 'Formal / Chic'
      },
      {
        id: '2',
        title: 'Engagement & Traditional Wedding',
        date: 'October 30, 2026',
        time: '12:00 PM',
        location: 'Modakeke, Ife East LGA, Osun State, Nigeria',
        dressCode: 'Traditional Attire'
      },
      {
        id: '3',
        title: 'Reception',
        date: 'October 31, 2026',
        time: '02:00 PM',
        location: 'Modakeke, Ife East LGA, Osun State, Nigeria',
        dressCode: 'Elegant / Glam'
      }
    ]

  const activeEvent = displayEvents[activeIndex]

  // 🎯 Proper icon mapping
  const getEventIcon = (title: string) => {
    if (title.toLowerCase().includes('court')) return <Scale />
    if (title.toLowerCase().includes('engagement')) return <Crown />
    return <PartyPopper />
  }

  return (
    <section className="py-28 bg-brand-cream relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-brand-lavender/10 blur-[140px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-deep mb-4">
            Our Wedding <span className="text-brand-lavender italic">Journey</span>
          </h2>
          <p className="text-gray-500 text-sm italic">
            A beautiful three-part celebration of love
          </p>
        </div>

        {/* 🔥 STEP SELECTOR */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {displayEvents.map((event, index) => (
            <button
              key={event.id}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs tracking-widest transition ${
                activeIndex === index
                  ? 'bg-brand-deep text-white shadow-lg'
                  : 'bg-white text-brand-deep/60 hover:bg-brand-deep/10'
              }`}
            >
              <span className="text-[10px] opacity-60">0{index + 1}</span>
              {event.title}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="p-8 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6 text-brand-gold">
                {getEventIcon(activeEvent.title)}
                <span className="text-xs tracking-widest uppercase">
                  Step {activeIndex + 1}
                </span>
              </div>

              <h3 className="text-3xl font-serif text-brand-deep mb-8">
                {activeEvent.title}
              </h3>

              <div className="space-y-6">
                <Detail icon={<Calendar />} label="Date" value={activeEvent.date} />
                <Detail icon={<Clock />} label="Time" value={activeEvent.time} />
                <Detail icon={<MapPin />} label="Venue" value={activeEvent.location} />
                <Detail icon={<Shirt />} label="Dress Code" value={activeEvent.dressCode} />
              </div>

              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      activeEvent.location
                    )}`,
                    '_blank'
                  )
                }
                className="mt-10 w-full py-4 rounded-full bg-brand-deep text-white text-xs tracking-widest hover:scale-[1.02] transition flex items-center justify-center gap-2"
              >
                Get Directions
                <Navigation size={16} />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT MAP */}
          <motion.div
            key={activeEvent.location}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <iframe
  src={`https://www.google.com/maps?q=${encodeURIComponent(
    activeEvent.location
  )}&output=embed`}
  className="w-full h-full"
/>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Detail({
  icon,
  label,
  value
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-gold shadow">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase text-gray-400">{label}</p>
        <p className="text-brand-deep">{value}</p>
      </div>
    </div>
  )
}