'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { 
  BarChart3, 
  Heart, 
  Image as ImageIcon, 
  Users, 
  Calendar, 
  Gift, 
  LogOut,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/stories', label: 'Our Story', icon: Heart },
  { href: '/dashboard/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/dashboard/rsvps', label: 'RSVPs', icon: Users },
  { href: '/dashboard/events', label: 'Events', icon: Calendar },
  { href: '/dashboard/support', label: 'Support Info', icon: Gift },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-cream/30 flex font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-brand-lavender/10 flex-col shadow-xl">
        <div className="p-8 border-b border-brand-lavender/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-deep text-brand-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
              <Heart fill="currentColor" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl leading-tight text-brand-deep">Admin <span className="text-brand-gold italic">Portal</span></span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-gray-400 font-bold">Wedding Control</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                  ? 'bg-brand-deep text-white shadow-[0_10px_25px_rgba(31,13,55,0.2)]' 
                  : 'text-gray-400 hover:bg-brand-lavender/10 hover:text-brand-deep'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-brand-gold' : 'group-hover:text-brand-gold transition-colors'} />
                <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_#D4AF37]"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-brand-lavender/10 bg-brand-cream/20">
          <button 
            onClick={() => logout()}
            className="flex items-center gap-4 px-5 py-4 w-full text-red-500/70 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-brand-lavender/10 px-8 flex items-center justify-between z-20">
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-brand-deep/5 rounded-xl transition-colors">
              <Menu size={24} className="text-brand-deep" />
            </button>
            <span className="font-serif text-xl text-brand-deep">Admin</span>
          </div>
          
          <div className="hidden lg:block">
            <h2 className="text-xl font-serif text-brand-deep flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-gold rounded-full" />
              {navItems.find(item => item.href === pathname)?.label || 'Dashboard Overview'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-brand-deep uppercase tracking-tighter">MORAYOMI</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-bold">Oct 2026</p>
            </div>
            <div className="w-12 h-12 bg-brand-deep/5 rounded-2xl border border-brand-lavender/10 flex items-center justify-center text-brand-deep shadow-inner">
               <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white text-[10px] font-bold">M</div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-brand-deep/60 backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="absolute inset-y-0 left-0 w-80 bg-white shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-brand-lavender/10 flex items-center justify-between bg-brand-cream/10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-brand-deep text-brand-gold rounded-lg flex items-center justify-center">
                      <Heart fill="currentColor" size={14} />
                   </div>
                   <span className="font-serif text-xl pt-1">Registry</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-brand-deep/5 rounded-full transition-colors">
                  <X size={24} className="text-brand-deep" />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-300 ${
                      pathname === item.href 
                      ? 'bg-brand-deep text-white shadow-lg' 
                      : 'text-gray-400 hover:text-brand-deep hover:bg-brand-cream/50'
                    }`}
                  >
                    <item.icon size={20} className={pathname === item.href ? 'text-brand-gold' : ''} />
                    <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="p-8 border-t border-brand-lavender/10">
                <button 
                  onClick={() => logout()}
                  className="flex items-center gap-4 px-5 py-4 w-full text-red-500 font-bold text-[10px] uppercase tracking-[0.2em]"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
