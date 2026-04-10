import prisma from '@/lib/prisma'
import { deleteRSVP } from '@/app/actions/wedding'
import { Trash2, Mail, Phone, MessageSquare, CheckCircle2, XCircle } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function RSVPManagementPage() {
  let rsvps: any[] = []
  try {
    rsvps = await prisma.rSVP.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('RSVPs fetch failed:', error)
  }

  async function removeRSVP(id: string) {
    'use server'
    await deleteRSVP(id)
    revalidatePath('/dashboard/rsvps')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif">Guest List (RSVPs)</h1>
        <p className="text-gray-500 font-light">Total responses: {rsvps.length}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Guest</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Contact</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Message</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rsvps.length > 0 ? (
                rsvps.map((rsvp: { id: string; name: string; email: string; phone: string; status: string; message: string | null; createdAt: Date }) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-6">
                      <p className="font-semibold text-gray-900">{rsvp.name}</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                        Added {new Date(rsvp.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-6 font-medium">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                        rsvp.status === 'attending' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                      }`}>
                        {rsvp.status === 'attending' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {rsvp.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Mail size={12} className="text-brand-gold" />
                          {rsvp.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Phone size={12} className="text-brand-gold" />
                          {rsvp.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      {rsvp.message ? (
                        <div className="flex gap-2 max-w-xs">
                          <MessageSquare size={14} className="text-gray-300 shrink-0 mt-1" />
                          <p className="text-xs text-gray-500 font-light italic line-clamp-2">
                            "{rsvp.message}"
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs italic">No message</span>
                      )}
                    </td>
                    <td className="px-6 py-6 text-right">
                      <form action={removeRSVP.bind(null, rsvp.id)}>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-light">
                    No RSVPs found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
