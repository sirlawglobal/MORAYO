import prisma from '@/lib/prisma'
import { motion } from 'framer-motion'
import { Users, Image as ImageIcon, Heart, MessageSquare, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let rsvpCount = 0
  let imageCount = 0
  let storyCount = 0
  let recentRSVPs: any[] = []

  try {
    const [rc, ic, sc, rr] = await Promise.all([
      prisma.rSVP.count(),
      prisma.gallery.count(),
      prisma.story.count(),
      prisma.rSVP.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      })
    ])
    rsvpCount = rc
    imageCount = ic
    storyCount = sc
    recentRSVPs = rr
  } catch (error) {
    console.error('Dashboard data fetch failed. Check database connection.', error)
  }

  const stats = [
    { label: 'Total RSVPs', value: rsvpCount, icon: Users, color: 'bg-blue-500', trend: '+12% from last week' },
    { label: 'Gallery Images', value: imageCount, icon: ImageIcon, color: 'bg-indigo-500', trend: 'Storage at 42%' },
    { label: 'Love Stories', value: storyCount, icon: Heart, color: 'bg-pink-500', trend: 'Timeline complete' },
    { label: 'Messages', value: recentRSVPs.filter((r: { message: string | null }) => r.message).length, icon: MessageSquare, color: 'bg-amber-500', trend: 'New wishes' },
  ]

  return (
    <div className="space-y-10">
      {/* Title & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Welcome back, Admin</h1>
          <p className="text-gray-500 font-light">Here's what's happening with your wedding registry.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-500 flex items-center gap-2 shadow-sm">
            <Calendar size={14} />
            Today: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: { label: string; value: number; icon: any; color: string; trend: string }) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                <TrendingUp size={14} />
                <span>Active</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-serif mt-1">{stat.value}</h3>
              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent RSVPs */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-serif">Recent RSVPs</h3>
            <Link href="/dashboard/rsvps" className="text-sm text-brand-gold hover:underline font-medium">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentRSVPs.length > 0 ? (
              recentRSVPs.map((rsvp: { id: number; name: string; email: string; status: string }) => (
                <div key={rsvp.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-pink/20 rounded-full flex items-center justify-center text-brand-gold font-bold">
                      {rsvp.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{rsvp.name}</p>
                      <p className="text-xs text-gray-400 font-light">{rsvp.email}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    rsvp.status === 'attending' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {rsvp.status.replace('_', ' ')}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-400 font-light italic text-sm">
                No RSVPs received yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-xl font-serif mb-4 text-brand-gold">Quick Actions</h3>
               <div className="flex flex-col gap-3">
                 <Link href="/dashboard/gallery" className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl flex items-center gap-3 text-sm">
                   <ImageIcon size={18} />
                   Upload New Image
                 </Link>
                 <Link href="/dashboard/stories" className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl flex items-center gap-3 text-sm">
                   <Heart size={18} />
                   Add Story Block
                 </Link>
                 <Link href="/" target="_blank" className="w-full py-3 px-4 bg-brand-gold hover:bg-opacity-90 transition-all rounded-xl flex items-center justify-center gap-3 text-sm font-bold shadow-lg mt-4">
                   View Live Site
                 </Link>
               </div>
             </div>
             <Heart className="absolute -bottom-10 -right-10 text-white/5" size={200} />
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Registration Tip</h3>
            <p className="text-gray-600 text-sm font-light italic">
              "Did you know? Most guests RSVP during the last two weeks before the deadline. Keep an eye on your dashboard!"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
