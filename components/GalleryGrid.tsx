'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Play
} from 'lucide-react'

interface GalleryItem {
  id: string
  imageUrl: string
  category: string
  type?: 'image' | 'video'
}

export default function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [autoPlay, setAutoPlay] = useState(true)

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(images.map(i => i.category)))],
    [images]
  )

  const filteredImages = useMemo(
    () => filter === 'All'
      ? images
      : images.filter(i => i.category === filter),
    [images, filter]
  )

  // ❤️ Favorite toggle
  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  // 🎞️ Auto slideshow
  useEffect(() => {
    if (!autoPlay || selectedIndex === null) return

    const interval = setInterval(() => {
      setSelectedIndex(prev =>
        prev !== null
          ? (prev + 1) % filteredImages.length
          : null
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [autoPlay, selectedIndex, filteredImages])

  // ⌨️ Keyboard control
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowRight')
        setSelectedIndex(i => (i! + 1) % filteredImages.length)
      if (e.key === 'ArrowLeft')
        setSelectedIndex(i => (i! - 1 + filteredImages.length) % filteredImages.length)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, filteredImages])

  return (
    <section className="py-28 bg-brand-deep relative overflow-hidden">

      {/* 🎬 Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-deep/80 to-brand-deep" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Our Gallery of <span className="text-brand-lavender italic">Memories</span>
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition ${
                  filter === cat
                    ? 'bg-brand-gold text-brand-deep'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={item.imageUrl}
                alt=""
                fill
                placeholder="blur"
                blurDataURL={item.imageUrl}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-40 group-hover:opacity-70 transition" />

              {/* Favorite */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(item.id)
                }}
                className="absolute top-4 right-4 z-10"
              >
                <Heart
                  size={20}
                  className={`transition ${
                    favorites.includes(item.id)
                      ? 'fill-brand-gold text-brand-gold'
                      : 'text-white'
                  }`}
                />
              </button>

              {/* Video Icon */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={40} className="text-white/80" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* 💎 Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) {
                  setSelectedIndex((selectedIndex + 1) % filteredImages.length)
                } else if (info.offset.x > 100) {
                  setSelectedIndex(
                    (selectedIndex - 1 + filteredImages.length) % filteredImages.length
                  )
                }
              }}
            >
              {/* Close */}
              <button
                className="absolute top-6 right-6 text-white"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={36} />
              </button>

              {/* Prev */}
              <button
                className="absolute left-6 text-white"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + filteredImages.length) %
                      filteredImages.length
                  )
                }
              >
                <ChevronLeft size={40} />
              </button>

              {/* Next */}
              <button
                className="absolute right-6 text-white"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex + 1) % filteredImages.length
                  )
                }
              >
                <ChevronRight size={40} />
              </button>

              {/* Content */}
              <motion.div
                key={selectedIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-[90%] md:w-[70%] h-[70%]"
              >
                {filteredImages[selectedIndex].type === 'video' ? (
                  <video
                    src={filteredImages[selectedIndex].imageUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <Image
                    src={filteredImages[selectedIndex].imageUrl}
                    alt=""
                    fill
                    className="object-contain rounded-2xl"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}