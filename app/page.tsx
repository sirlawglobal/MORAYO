import prisma from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import StoryTimeline from '@/components/StoryTimeline'
import GalleryGrid from '@/components/GalleryGrid'
import EventDetails from '@/components/EventDetails'
import SupportSection from '@/components/SupportSection'
// import RSVPForm from '@/components/RSVPForm'
import AutoPlayAudio from '@/components/AutoPlayAudio'
import { Heart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let stories: any[] = []
  let images: any[] = []
  let eventDetails: any[] = []
  let supportDetails: any[] = []

  try {
    const [sc, gc, ec, sd] = await Promise.all([
      prisma.story.findMany({ orderBy: { order: 'asc' } }),
      prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.eventDetail.findMany({ orderBy: { order: 'asc' } }),
      prisma.supportDetail.findMany()
    ])
    stories = sc
    images = gc
    eventDetails = ec
    supportDetails = sd
  } catch (error) {
    console.error('Database connection failed. Serving fallback UI.', error)
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Auto-play Background Music */}
      <AutoPlayAudio />

      {/* Hero Section */}
      <HeroSection />

      {/* Love Story Section */}
      <StoryTimeline stories={stories} />

      {/* Gallery Section */}
      <GalleryGrid images={images} />

      {/* Event Details Section */}
      <EventDetails events={eventDetails} />

      {/* Support / Gift Section */}
      <SupportSection supportData={supportDetails} />

      {/* RSVP Section */}
      {/* <RSVPForm /> */}

      {/* Footer */}
      <footer className="py-16 bg-brand-dark text-white border-t border-brand-gold/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 text-brand-gold">
            <Heart fill="currentColor" size={32} />
          </div>
          <h2 className="text-3xl font-serif mb-4">MORadekemi <span className="text-brand-gold italic"> & </span> AYObami</h2>
          <p className="text-brand-pink/60 uppercase tracking-[0.3em] text-sm mb-8">Beginning Forever | 31.10.26</p>
          
          <div className="flex justify-center gap-8 mb-12">
            {['Instagram', 'Twitter', 'Facebook'].map((social: string) => (
              <a 
                key={social} 
                href="#" 
                className="text-white/40 hover:text-brand-gold transition-colors duration-300 text-xs uppercase tracking-widest"
              >
                {social}
              </a>
            ))}
          </div>

          <p className="text-[10px] text-white/20 uppercase tracking-widest">
            Made with love for our beautiful journey
          </p>
        </div>
      </footer>
    </main>
  )
}
