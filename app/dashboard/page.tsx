import prisma from '@/lib/prisma'
import { Users, Image as ImageIcon, Heart, MessageSquare, TrendingUp, Calendar, Zap, Sparkles } from 'lucide-react'
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
    { label: 'Total RSVPs', value: rsvpCount, icon: 'users', color: 'bg-brand-deep', iconColor: 'text-brand-gold', trend: '+12% from last week' },
    { label: 'Gallery Images', value: imageCount, icon: 'image', color: 'bg-brand-lavender', iconColor: 'text-white', trend: 'Storage at 42%' },
    { label: 'Love Stories', value: storyCount, icon: 'heart', color: 'bg-brand-gold', iconColor: 'text-brand-deep', trend: 'Timeline complete' },
    { label: 'Messages', value: recentRSVPs.filter((r: { message: string | null }) => r.message).length, icon: 'message', color: 'bg-brand-cream', iconColor: 'text-brand-lavender', trend: 'New wishes' },
  ]

  const iconMap: Record<string, typeof Users> = {
    users: Users,
    image: ImageIcon,
    heart: Heart,
    message: MessageSquare,
  }

  return (
    <div className="space-y-10 font-sans">
      {/* Title & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif text-brand-deep mb-2">Welcome back, <span className="text-brand-lavender italic">Admin</span></h1>
          <p className="text-gray-400 font-medium text-sm tracking-tight">Your wedding preparation journey is progressing beautifully.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-6 py-3 bg-white border border-brand-lavender/10 rounded-2xl text-[10px] uppercase font-bold text-brand-deep/60 flex items-center gap-3 shadow-premium">
            <Calendar size={14} className="text-brand-gold" />
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon]
          return (
            <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-brand-lavender/5 hover:translate-y-[-5px] transition-all duration-500 group">
              <div className="flex items-center justify-between mb-6">
                <div className={`${stat.color} p-4 rounded-2xl ${stat.iconColor} shadow-lg transition-transform group-hover:rotate-6`}>
                  <Icon size={24} />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                  <TrendingUp size={12} />
                  <span>Live</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h3 className="text-4xl font-serif text-brand-deep">{stat.value}</h3>
                <p className="text-[10px] text-brand-lavender/60 mt-4 italic font-medium">{stat.trend}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent RSVPs */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-premium border border-brand-lavender/5 overflow-hidden">
          <div className="p-8 border-b border-brand-lavender/10 flex items-center justify-between bg-brand-cream/10">
            <h3 className="text-2xl font-serif text-brand-deep">Recent Guest Activity</h3>
            <Link href="/dashboard/rsvps" className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-deep font-bold transition-colors">Complete List</Link>
          </div>
          <div className="divide-y divide-brand-lavender/5">
            {recentRSVPs.length > 0 ? (
              recentRSVPs.map((rsvp: { id: string; name: string; email: string; status: string }) => (
                <div key={rsvp.id} className="p-8 flex items-center justify-between hover:bg-brand-cream/30 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-brand-deep text-brand-gold rounded-full flex items-center justify-center font-serif text-xl shadow-lg group-hover:scale-110 transition-transform">
                      {rsvp.name[0]}
                    </div>
                    <div>
                      <p className="font-serif text-lg text-brand-deep">{rsvp.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{rsvp.email}</p>
                    </div>
                  </div>
                  <div className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] ${
                    rsvp.status === 'attending' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {rsvp.status.replace('_', ' ')}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center text-gray-300 font-serif italic text-xl">
                The guest list is currently empty.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="bg-brand-deep text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             {/* Silk texture overlay */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none texture-silk" />
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-lavender/10 rounded-full blur-[80px]" />
             
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6 text-brand-gold">
                  <Sparkles size={20} />
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Management Hub</h3>
               </div>
               <h4 className="text-2xl font-serif mb-8 text-white">Quick Updates</h4>
               
               <div className="flex flex-col gap-4">
                 <Link href="/dashboard/gallery" className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 transition-all rounded-2xl flex items-center gap-4 text-xs font-bold tracking-widest uppercase border border-white/5">
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-lavender">
                     <ImageIcon size={16} />
                   </div>
                   Add Gallery Media
                 </Link>
                 <Link href="/dashboard/stories" className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 transition-all rounded-2xl flex items-center gap-4 text-xs font-bold tracking-widest uppercase border border-white/5">
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-lavender">
                     <Heart size={16} />
                   </div>
                   Compose New Story
                 </Link>
                 <Link href="/" target="_blank" className="w-full py-5 px-6 bg-brand-gold text-brand-deep hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 rounded-2xl flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl mt-4">
                   <Zap size={16} />
                   View Live Ceremony Website
                 </Link>
               </div>
             </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-brand-lavender/5 text-center">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-6">Pro Registry Tip</h3>
            <p className="text-brand-deep/60 text-sm font-light italic leading-relaxed">
              &quot;Personalized thank-you messages increase guest engagement by 40%. Consider adding a custom note to your RSVP success page!&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
