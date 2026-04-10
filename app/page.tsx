import prisma from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import StoryTimeline from '@/components/StoryTimeline'
import GalleryGrid from '@/components/GalleryGrid'
import EventDetails from '@/components/EventDetails'
import SupportSection from '@/components/SupportSection'
import RSVPForm from '@/components/RSVPForm'
import { Heart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let stories: any[] = []
  let images: any[] = []

  try {
    stories = await prisma.story.findMany({
      orderBy: { order: 'asc' },
    })

    images = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Database connection failed. Serving fallback UI.', error)
    // Fallback or empty states are handled by letting stories/images stay empty arrays
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <HeroSection />

      {/* Love Story Section */}
      <StoryTimeline stories={stories} />

      {/* Gallery Section */}
      <GalleryGrid images={images} />

      {/* Event Details Section */}
      <EventDetails />

      {/* Support / Gift Section */}
      <SupportSection />

      {/* RSVP Section */}
      <RSVPForm />

      {/* Footer */}
      <footer className="py-16 bg-brand-dark text-white border-t border-brand-gold/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 text-brand-gold">
            <Heart fill="currentColor" size={32} />
          </div>
          <h2 className="text-3xl font-serif mb-4">Morayo & Ade</h2>
          <p className="text-brand-pink/60 uppercase tracking-[0.3em] text-sm mb-8">Beginning Forever | 31.12.26</p>
          
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
