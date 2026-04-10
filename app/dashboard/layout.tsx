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
  X
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: BarChart3 },
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col">
        <div className="p-8 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-pink/20 rounded-xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
              <Heart fill="currentColor" size={20} />
            </div>
            <span className="font-serif text-xl tracking-tight">Admin <span className="text-brand-gold">Registry</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item: { href: string; label: string; icon: any }) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-brand-dark text-white shadow-lg' 
                  : 'text-gray-500 hover:bg-brand-pink/10 hover:text-brand-dark'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-gold"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <button 
            onClick={() => logout()}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between z-20">
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <span className="font-serif font-semibold">Admin</span>
          </div>
          
          <div className="hidden lg:block">
            <h2 className="text-xl font-medium text-gray-800">
              {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Admin Team</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Wedding Registry</p>
            </div>
            <div className="w-10 h-10 bg-brand-gold/10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold">
              <Users size={20} />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <span className="font-serif text-xl">Registry</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-2">
                {navItems.map((item: { href: string; label: string; icon: any }) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                      pathname === item.href ? 'bg-brand-dark text-white' : 'text-gray-500'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="p-6 border-t border-gray-100">
                <button 
                  onClick={() => logout()}
                  className="flex items-center gap-4 px-4 py-3 w-full text-red-500 rounded-xl"
                >
                  <LogOut size={20} />
                  <span className="font-medium text-sm">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
