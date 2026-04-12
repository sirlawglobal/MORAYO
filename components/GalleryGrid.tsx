'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'

interface GalleryItem {
  id: string
  imageUrl: string
  category: string
}

export default function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')

  // ✅ Optimized categories
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(images.map((img) => img.category)))],
    [images]
  )

  const filteredImages = useMemo(
    () =>
      filter === 'All'
        ? images
        : images.filter((img) => img.category === filter),
    [images, filter]
  )

  // 🔥 Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowRight')
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % filteredImages.length : null
        )
      if (e.key === 'ArrowLeft')
        setSelectedIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredImages.length) % filteredImages.length
            : null
        )
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, filteredImages])

  return (
    <section className="py-28 md:py-32 relative bg-brand-deep overflow-hidden">
      
      {/* 🎬 Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 grayscale"
          src="https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Wedding_Flowers_preview.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-deep/80 to-brand-deep" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* 🏷️ Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6 text-brand-lavender"
          >
            <ImageIcon size={32} strokeWidth={1} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mb-8"
          >
            Our Gallery of{' '}
            <span className="text-brand-lavender italic">Memories</span>
          </motion.h2>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                  filter === cat
                    ? 'bg-brand-gold text-brand-deep border-brand-gold shadow-lg'
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🖼️ Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.category}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition" />

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                    {image.category}
                  </p>
                  <div className="w-10 h-[1px] bg-brand-gold mb-3 scale-x-0 group-hover:scale-x-100 transition" />
                  <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition">
                    View Memory
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty */}
        {filteredImages.length === 0 && (
          <div className="py-20 text-center text-white/30 italic text-2xl">
            Memories loading soon...
          </div>
        )}

        {/* 💎 Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              {/* Close */}
              <button
                className="absolute top-6 right-6 text-white hover:text-brand-gold"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={36} />
              </button>

              {/* Prev */}
              <button
                className="absolute left-6 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex(
                    (selectedIndex - 1 + filteredImages.length) %
                      filteredImages.length
                  )
                }}
              >
                <ChevronLeft size={40} />
              </button>

              {/* Next */}
              <button
                className="absolute right-6 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex(
                    (selectedIndex + 1) % filteredImages.length
                  )
                }}
              >
                <ChevronRight size={40} />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative w-[90%] md:w-[70%] h-[70%]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredImages[selectedIndex].imageUrl}
                  alt="Preview"
                  fill
                  className="object-contain rounded-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}