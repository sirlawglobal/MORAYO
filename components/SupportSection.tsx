'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Copy, Check, Heart, Wallet, Gift, Diamond } from 'lucide-react'

interface SupportDetail {
  id: string
  currency: string
  bank: string
  accountNum: string
  accountName: string
  symbol: string
}

interface SupportSectionProps {
  supportData: SupportDetail[]
}

export default function SupportSection({ supportData }: SupportSectionProps) {
  const [currency, setCurrency] = useState<string>('NGN')
  const [copied, setCopied] = useState<string | null>(null)

  // Map the array data into a keyed object for easy access
  const details = supportData?.reduce((acc: any, curr) => {
    acc[curr.currency] = curr
    return acc
  }, {}) || {
    NGN: {
      bank: 'High Premium Bank',
      accountNum: '0123456789',
      accountName: 'MORadekemi & AYObami Wedding',
      symbol: '₦',
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const activeCurrency = details[currency] || Object.values(details)[0]

  return (
    <section id="support" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none texture-silk" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-lavender/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6 text-brand-gold"
          >
            <Gift size={40} strokeWidth={1.5} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif mb-6 text-brand-deep"
          >
            Registry & <span className="text-brand-lavender italic">Support</span>
          </motion.h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto leading-relaxed italic">
            "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a contribution towards our new life together would be much appreciated."
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-brand-deep/5 p-2 rounded-full flex gap-2 border border-brand-lavender/10 shadow-inner">
            {Object.keys(details).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-10 py-3 rounded-full text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 ${
                  currency === curr 
                  ? 'bg-brand-deep text-white shadow-xl scale-105' 
                  : 'text-brand-deep/60 hover:text-brand-deep hover:bg-white/50'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currency}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="bg-brand-cream border border-brand-lavender/20 p-10 rounded-[3rem] relative overflow-hidden group shadow-premium"
            >
              <div className="absolute top-0 right-0 p-8 text-brand-gold/5 group-hover:text-brand-gold/10 transition-colors">
                <Diamond size={160} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-gold shadow-sm">
                    <Wallet size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-deep/60">Registry Details</span>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">Bank Institution</p>
                    <p className="text-2xl font-serif text-brand-deep">{activeCurrency?.bank}</p>
                  </div>
                  
                  <div className="group/acc relative bg-white/50 p-6 rounded-3xl border border-white transition-all hover:bg-white">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">Account Number</p>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-serif tracking-tighter text-brand-deep">{activeCurrency?.accountNum}</p>
                      <button 
                        onClick={() => copyToClipboard(activeCurrency?.accountNum, 'acc')}
                        className="p-3 bg-brand-deep/5 hover:bg-brand-gold text-brand-gold hover:text-white rounded-2xl transition-all duration-500"
                      >
                        {copied === 'acc' ? <Check size={20} /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">Account Name</p>
                    <p className="text-xl font-medium text-brand-deep/80">{activeCurrency?.accountName}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-deep text-white p-10 rounded-[3rem] flex flex-col justify-between relative overflow-hidden shadow-2xl group"
          >
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none texture-silk" />
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-lavender/10 rounded-full blur-[100px]" />
             
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold backdrop-blur-md">
                  <CreditCard size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-lavender">Pay Securely Online</span>
              </div>
              
              <h3 className="text-4xl font-serif mb-6 leading-tight">Digital Contribution Portal</h3>
              <p className="text-brand-lavender/60 font-light leading-relaxed mb-10 text-base">
                For our guests who prefer the convenience of online transfers or card payments via secure platforms like Paystack or Flutterwave.
              </p>
            </div>

            <button className="relative z-10 w-full py-5 bg-brand-gold text-brand-deep rounded-[2rem] font-bold tracking-[0.2em] uppercase text-xs hover:transform hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden group">
              <span className="relative z-10">Contribute Online</span>
              <Diamond size={16} className="relative z-10 transition-transform group-hover:rotate-45" />
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
