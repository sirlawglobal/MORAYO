'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Copy, Check, DollarSign, Wallet } from 'lucide-react'

export default function SupportSection() {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN')
  const [copied, setCopied] = useState<string | null>(null)

  const details = {
    NGN: {
      bank: 'High Premium Bank',
      accountNum: '0123456789',
      accountName: 'Morayo & Ade Wedding',
      symbol: '₦',
    },
    USD: {
      bank: 'Global Trust Bank',
      accountNum: '9876543210',
      accountName: 'Morayo & Ade Global',
      symbol: '$',
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="support" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Gift Registry
          </motion.h2>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            Your presence is enough, but if you wish to gift us, we would be honored by your support towards our new beginning.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-brand-pink/20 p-1 rounded-full flex gap-1">
            {(['NGN', 'USD'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currency === curr 
                  ? 'bg-brand-gold text-white shadow-md' 
                  : 'text-brand-dark hover:bg-brand-pink/30'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Bank Details */}
          <motion.div 
            key={currency}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-cream border border-brand-gold/20 p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 text-brand-gold/10">
              <CreditCard size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 text-brand-gold">
                <Wallet size={24} />
                <span className="text-sm uppercase tracking-widest font-semibold text-brand-dark">Bank Transfer</span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Bank Name</p>
                  <p className="text-xl font-serif">{details[currency].bank}</p>
                </div>
                
                <div className="group relative">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Account Number</p>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-serif tracking-tighter">{details[currency].accountNum}</p>
                    <button 
                      onClick={() => copyToClipboard(details[currency].accountNum, 'acc')}
                      className="p-2 hover:bg-brand-gold/10 rounded-lg transition-colors text-brand-gold"
                    >
                      {copied === 'acc' ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Account Name</p>
                  <p className="text-lg font-medium">{details[currency].accountName}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Other Options (e.g. Card Payment Link) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-dark text-white p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-8 text-brand-gold">
                <CreditCard size={24} />
                <span className="text-sm uppercase tracking-widest font-semibold text-brand-pink">Online Gift card</span>
              </div>
              <p className="text-2xl font-serif mb-4">prefer to give online?</p>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                If you would like to send a gift using your card or international platforms, you can use our secure payment link.
              </p>
            </div>

            <button className="w-full py-4 bg-brand-gold text-white rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 group">
              Send Gift via Card
              <DollarSign size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
