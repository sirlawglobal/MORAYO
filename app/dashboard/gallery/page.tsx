'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { addGalleryImage, deleteGalleryImage, getGalleryImages } from '@/app/actions/gallery'
import { Plus, Trash2, Image as ImageIcon, Loader2, X, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

interface GalleryItem {
  id: string
  imageUrl: string
  category: string
}

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setIsLoading(true)
    const data = await getGalleryImages()
    setImages(data)
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      await deleteGalleryImage(id)
      loadImages()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size too large (max 10MB)')
        return
      }
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
      setError(null)
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an image first')
      return
    }
    
    setIsUploading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('file', file)
    
    const result = await addGalleryImage(formData)
    
    if (result.success) {
      setIsUploading(false)
      setIsModalOpen(false)
      setFile(null)
      setPreviewUrl(null)
      loadImages()
    } else {
      setIsUploading(false)
      setError(result.error || 'Failed to upload image')
    }
  }

  return (
    <div className="space-y-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif text-brand-deep">Gallery <span className="text-brand-lavender italic">Management</span></h1>
          <p className="text-gray-400 font-medium text-sm mt-2">Curate the visual story of your celebration.</p>
        </div>
        <button 
          onClick={() => {
            setIsModalOpen(true)
            setError(null)
          }}
          className="bg-brand-deep text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-premium hover:shadow-2xl transition-all flex items-center gap-3 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          Add New Photo
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <Loader2 className="animate-spin text-brand-gold" size={48} strokeWidth={1} />
          <p className="font-serif text-xl text-brand-deep italic">Refreshing your memories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((image: GalleryItem) => (
            <motion.div 
              key={image.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-premium border border-brand-lavender/5"
            >
              <Image 
                src={image.imageUrl} 
                alt={image.category} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-brand-deep/80 to-transparent">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">{image.category}</span>
              </div>
              <div className="absolute inset-0 bg-brand-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                <button 
                  onClick={() => handleDelete(image.id)}
                  className="p-4 bg-white/20 text-white rounded-2xl hover:bg-red-500 transition-all duration-300 shadow-xl border border-white/30"
                  title="Remove Image"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {images.length === 0 && (
            <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-brand-lavender/10">
               <ImageIcon size={48} className="mx-auto text-brand-lavender/20 mb-4" />
               <p className="font-serif text-2xl text-brand-deep/30 italic">No photos uploaded yet</p>
            </div>
          )}
        </div>
      )}

      {/* Add Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isUploading) {
                  setIsModalOpen(false)
                  setFile(null)
                  setPreviewUrl(null)
                }
              }}
              className="absolute inset-0 bg-brand-deep/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative bg-white w-full max-w-xl rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] p-10 overflow-hidden border border-white/20"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-brand-deep text-brand-gold rounded-xl flex items-center justify-center">
                     <ImageIcon size={20} />
                   </div>
                   <h3 className="text-3xl font-serif text-brand-deep leading-none mt-1">Add Memory</h3>
                </div>
                {!isUploading && (
                  <button 
                    onClick={() => {
                      setIsModalOpen(false)
                      setFile(null)
                      setPreviewUrl(null)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>

              <form onSubmit={handleUpload} className="space-y-10">
                {/* Custom File Upload Box */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div 
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  className={`relative p-12 border-2 border-dashed rounded-[3rem] text-center transition-all duration-500 overflow-hidden group/box ${
                    previewUrl ? 'border-brand-gold' : 'border-brand-lavender/20 bg-brand-cream/30 hover:bg-white hover:border-brand-gold'
                  }`}
                >
                  {previewUrl ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                      <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/box:opacity-100 transition-opacity flex items-center justify-center">
                         <p className="bg-white text-brand-deep px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Change Photo</p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 flex flex-col items-center gap-6">
                      <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-premium flex items-center justify-center text-brand-gold group-hover/box:scale-110 group-hover/box:rotate-3 transition-transform duration-500">
                        <UploadCloud size={40} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xl font-serif text-brand-deep mb-2">Unleash Your Memories</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Click to browse or Drag & Drop (Max 10MB)</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                   <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold ml-1">Event Category</label>
                    <select 
                      name="category" 
                      className="w-full px-6 py-4 bg-brand-cream/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-gold outline-none text-brand-deep font-medium cursor-pointer transition-all"
                    >
                      <option value="Engagement">Engagement</option>
                      <option value="Pre-wedding">Pre-wedding</option>
                      <option value="Church Wedding">Church Wedding</option>
                      <option value="Reception">Reception</option>
                      <option value="Memories">Memories</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isUploading || !file}
                    className="w-full py-5 bg-brand-deep text-white rounded-[2rem] font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-30 shadow-premium group relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      {isUploading ? 'Magic in Progress...' : 'Confirm Upload'}
                    </span>
                    {!isUploading && <CheckCircle2 size={16} className="relative z-10 text-brand-gold transition-transform group-hover:scale-125" />}
                    
                    {/* Button Shine */}
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
                  </button>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 text-red-500 text-xs font-bold tracking-widest bg-red-50 p-4 rounded-2xl border border-red-100"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
