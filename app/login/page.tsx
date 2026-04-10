'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import { motion } from 'framer-motion'
import { Heart, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-brand-pink/30"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4 text-brand-gold">
            <Heart size={48} />
          </div>
          <h1 className="text-3xl font-serif mb-2">Admin Registry</h1>
          <p className="text-gray-400 text-sm font-light">Secure access for Morayo & Ade</p>
        </div>

        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/50" size={18} />
              <input 
                name="email" 
                type="email" 
                placeholder="admin@wedding.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all placeholder:text-gray-300"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-500 text-xs mt-1 px-1">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/50" size={18} />
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all placeholder:text-gray-300"
              />
            </div>
            {state?.errors?.password && (
              <p className="text-red-500 text-xs mt-1 px-1">{state.errors.password[0]}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={pending}
            className="w-full py-4 bg-brand-dark text-white rounded-2xl font-serif text-xl hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {pending ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Enter Dashboard'
            )}
          </button>
        </form>

        <div className="mt-12 text-center text-[10px] uppercase tracking-widest text-gray-300">
          Privileged Access Only
        </div>
      </motion.div>
    </main>
  )
}
