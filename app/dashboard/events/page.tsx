import prisma from '@/lib/prisma'
import { updateEventDetails } from '@/app/actions/wedding'
import { Calendar, Save, Info } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function EventsManagementPage() {
  let events: { id: string; title: string; value: string }[] = []
  try {
    events = await prisma.eventDetail.findMany()
  } catch (error) {
    console.error('Events fetch failed:', error)
  }

  async function handleEventUpdate(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const value = formData.get('value') as string
    await updateEventDetails(id, value)
    revalidatePath('/dashboard/events')
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-serif">Event Schedule</h1>
        <p className="text-gray-500 font-light">Manage your wedding dates and venues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.length > 0 ? events.map((event: { id: string; title: string; value: string }) => (
          <div key={event.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <form action={handleEventUpdate} className="space-y-6">
               <input type="hidden" name="id" value={event.id} />
               <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">
                  {event.title}
                </label>
                <div className="space-y-4">
                  <textarea 
                    name="value" 
                    defaultValue={event.value}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-brand-gold outline-none text-sm resize-none border-none transition-all"
                  />
                  <button className="w-full py-4 bg-brand-dark text-white rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Save size={18} />
                    Save Event Details
                  </button>
                </div>
              </div>
            </form>
          </div>
        )) : (
          <div className="md:col-span-2 p-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <Calendar size={40} className="text-gray-200" />
            </div>
            <p className="text-lg font-serif">No events listed yet</p>
            <p className="max-w-xs mx-auto text-sm font-light">Add your wedding schedule to the database to start managing them here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
