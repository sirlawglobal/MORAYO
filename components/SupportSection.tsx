'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy,
  Check,
  Gift,
  Wallet,
  CreditCard,
  Diamond
} from 'lucide-react'

interface SupportDetail {
  id: string
  currency: string
  bank: string
  accountNum: string
  accountName: string
  symbol: string
}

export default function SupportSection({ supportData }: { supportData: SupportDetail[] }) {
  const [currency, setCurrency] = useState<string>('NGN')
  const [copied, setCopied] = useState<string | null>(null)

  // 🔥 Optimized mapping
  const details = useMemo(() => {
    const map: Record<string, SupportDetail> = {}
    supportData?.forEach((item) => {
      map[item.currency] = item
    })
    return map
  }, [supportData])

  const active = details[currency] || Object.values(details)[0]

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="py-28 bg-white relative overflow-hidden">

      {/* 🌫️ Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-lavender/10 blur-[140px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6 text-brand-gold"
          >
            <Gift size={36} />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif text-brand-deep mb-6">
            Registry & <span className="text-brand-lavender italic">Support</span>
          </h2>

          <p className="text-gray-500 italic max-w-xl mx-auto text-sm md:text-base">
            Your presence is our greatest gift. If you wish to support us, we are deeply grateful ❤️
          </p>
        </div>

        {/* Currency Switch */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-2 p-2 rounded-full bg-brand-deep/5 border border-brand-lavender/10">
            {Object.keys(details).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-6 py-2 rounded-full text-xs tracking-widest transition ${
                  currency === curr
                    ? 'bg-brand-deep text-white shadow-lg'
                    : 'text-brand-deep/60 hover:bg-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* 💎 Bank Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currency}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="relative p-8 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white shadow-xl group"
            >
              {/* Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-gold/10 blur-3xl rounded-full" />

              <div className="relative z-10 space-y-8">

                <div className="flex items-center gap-3">
                  <Wallet className="text-brand-gold" />
                  <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
                    Bank Details
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Bank</p>
                  <h3 className="text-2xl font-serif text-brand-deep">
                    {active?.bank}
                  </h3>
                </div>

                {/* Account */}
                <div className="p-5 rounded-2xl bg-white border flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">
                      Account Number
                    </p>
                    <h2 className="text-3xl font-serif text-brand-deep tracking-wide">
                      {active?.accountNum}
                    </h2>
                  </div>

                  <button
                    onClick={() => copy(active?.accountNum, 'acc')}
                    className="p-3 rounded-xl bg-brand-deep/5 hover:bg-brand-gold transition"
                  >
                    {copied === 'acc' ? (
                      <Check className="text-white bg-brand-gold rounded-full p-1" />
                    ) : (
                      <Copy />
                    )}
                  </button>
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">
                    Account Name
                  </p>
                  <p className="text-lg text-brand-deep/80">
                    {active?.accountName}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 💳 Online Payment */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative p-8 md:p-10 rounded-[2.5rem] bg-brand-deep text-white overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-lavender/20 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between h-full">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-brand-gold" />
                  <span className="text-xs tracking-[0.3em] uppercase text-brand-lavender">
                    Online Payment
                  </span>
                </div>

                <h3 className="text-3xl font-serif mb-4">
                  Digital Contribution
                </h3>

                <p className="text-brand-lavender/60 text-sm leading-relaxed">
                  Send your love instantly via secure payment platforms like Paystack or Flutterwave.
                </p>
              </div>

              <button className="mt-10 py-4 rounded-full bg-brand-gold text-brand-deep font-bold text-xs tracking-widest hover:scale-[1.03] transition flex items-center justify-center gap-2">
                Contribute Now
                <Diamond size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ✅ Copy Toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-brand-deep text-white px-6 py-3 rounded-full text-xs tracking-widest shadow-xl"
            >
              Copied successfully ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}