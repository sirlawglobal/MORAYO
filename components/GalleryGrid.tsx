'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, PlayCircle, ImageIcon } from 'lucide-react'

interface GalleryItem {
  id: string
  imageUrl: string
  category: string
}

export default function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))]
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter)

  return (
    <section id="gallery" className="py-32 relative min-h-screen bg-brand-deep overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 grayscale saturate-50"
          src="https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Wedding_Flowers_preview.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-deep/80 to-brand-deep" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
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
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif mb-10 text-white"
          >
            Our Gallery of <span className="text-brand-lavender italic">Memories</span>
          </motion.h2>
          
          {/* Filters - Glass Style */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 border ${
                  filter === cat 
                  ? 'bg-brand-gold border-brand-gold text-brand-deep shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl group border border-white/5"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.imageUrl}
                alt={image.category}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Inner Glow & Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                  {image.category}
                </span>
                <div className="w-12 h-[1px] bg-brand-gold mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <PlayCircle size={20} className="text-brand-lavender" />
                  <span className="text-xs uppercase tracking-widest font-medium">View Memory</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="py-20 text-center text-white/20 font-serif text-3xl italic">
            Capturing moments soon...
          </div>
        )}

        {/* Premium Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-brand-deep/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button 
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                className="absolute top-10 right-10 text-white hover:text-brand-gold transition-colors z-[110]"
                onClick={() => setSelectedImage(null)}
              >
                <X size={40} strokeWidth={1} />
              </motion.button>
              
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.imageUrl}
                  alt="Gallery Preview"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Information Overlay */}
                <div className="absolute bottom-10 left-10 right-10 bg-brand-deep/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 max-w-lg hidden md:block">
                   <p className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-2">{selectedImage.category}</p>
                   <h3 className="text-white text-3xl font-serif">A Moment to Cherish</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
