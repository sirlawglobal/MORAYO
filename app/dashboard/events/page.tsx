import prisma from '@/lib/prisma'
import { updateEventDetails } from '@/app/actions/wedding'
import { Calendar, Save, MapPin, Clock, Shirt, Sparkles } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function EventsManagementPage() {
  let events: any[] = []
  try {
    events = await prisma.eventDetail.findMany({
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error('Events fetch failed:', error)
  }

  async function handleUpdate(formData: FormData) {
    'use server'
    await updateEventDetails(formData)
  }

  return (
    <div className="space-y-12 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif text-brand-deep">Event <span className="text-brand-lavender italic">Schedule</span></h1>
          <p className="text-gray-400 font-medium text-sm mt-2">Manage the timing and locations of your celebration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {events.length > 0 ? events.map((event) => (
          <div key={event.id} className="bg-white p-10 rounded-[3rem] shadow-premium border border-brand-lavender/5 relative overflow-hidden group">
            {/* Silk texture overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none texture-silk" />
            
            <form action={handleUpdate} className="space-y-8 relative z-10">
               <input type="hidden" name="id" value={event.id} />
               
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-brand-deep text-brand-gold rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-deep">{event.title}</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold flex items-center gap-2">
                       <Calendar size={12} /> Date
                    </label>
                    <input 
                      name="date" 
                      defaultValue={event.date}
                      className="w-full px-5 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-semibold text-sm transition-all"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold flex items-center gap-2">
                       <Clock size={12} /> Time
                    </label>
                    <input 
                      name="time" 
                      defaultValue={event.time}
                      className="w-full px-5 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-semibold text-sm transition-all"
                    />
                 </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold flex items-center gap-2">
                     <MapPin size={12} /> Venue Location
                  </label>
                  <input 
                    name="location" 
                    defaultValue={event.location}
                    className="w-full px-5 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-semibold text-sm transition-all"
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold flex items-center gap-2">
                     <Shirt size={12} /> Dress Code
                  </label>
                  <input 
                    name="dressCode" 
                    defaultValue={event.dressCode}
                    className="w-full px-5 py-4 bg-brand-cream/50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-semibold text-sm transition-all"
                  />
               </div>

               <input type="hidden" name="title" value={event.title} />

               <button className="w-full py-5 bg-brand-deep text-white rounded-[2rem] hover:bg-black transition-all duration-500 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase shadow-xl group/btn overflow-hidden relative">
                  <span className="relative z-10">Update Event Details</span>
                  <Save size={18} className="relative z-10 text-brand-gold transition-transform group-hover/btn:scale-110" />
                  <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover/btn:left-[100%]" />
               </button>
            </form>
          </div>
        )) : (
          <div className="lg:col-span-2 p-24 text-center bg-white rounded-[4rem] border-2 border-dashed border-brand-lavender/10 shadow-premium flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center">
              <Calendar size={48} className="text-brand-lavender/30" />
            </div>
            <p className="text-2xl font-serif text-brand-deep italic opacity-40">No event sequences found</p>
          </div>
        )}
      </div>
    </div>
  )
}
