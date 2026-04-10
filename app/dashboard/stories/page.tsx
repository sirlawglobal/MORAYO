'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createStory, updateStory, deleteStory, getStories } from '@/app/actions/stories'
import { Plus, Trash2, Edit2, Clock, X, Loader2, Save } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface StoryItem {
  id: number
  title: string
  description: string
  imageUrl?: string | null
  order: number
}

export default function StoryManagementPage() {
  const [stories, setStories] = useState<StoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStory, setEditingStory] = useState<StoryItem | null>(null)

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    setIsLoading(true)
    const data = await getStories()
    setStories(data)
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    
    if (editingStory) {
      await updateStory(editingStory.id, formData)
    } else {
      await createStory(formData)
    }

    setIsModalOpen(false)
    setEditingStory(null)
    loadStories()
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete this story block?')) {
      await deleteStory(id)
      loadStories()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif">Story Management</h1>
          <p className="text-gray-500 font-light">Tell your journey through time.</p>
        </div>
        <button 
          onClick={() => { setEditingStory(null); setIsModalOpen(true); }}
          className="bg-brand-dark text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          New Milestone
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-brand-gold" size={40} />
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story: StoryItem) => (
            <div key={story.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-brand-pink/20 rounded-xl flex items-center justify-center text-brand-gold font-bold">
                  {story.order}
                </div>
                <div>
                  <h3 className="font-serif text-xl">{story.title}</h3>
                  <p className="text-sm text-gray-400 font-light line-clamp-1">{story.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setEditingStory(story); setIsModalOpen(true); }}
                  className="p-2 text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(story.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {stories.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-light bg-white rounded-3xl border-2 border-dashed border-gray-100 italic">
              No milestones added yet. Start by adding your first meeting!
            </div>
          )}
        </div>
      )}

      {/* Story Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif">{editingStory ? 'Edit Milestone' : 'New Milestone'}</h3>
                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <div className="md:col-span-3 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Title</label>
                    <input 
                      name="title" 
                      defaultValue={editingStory?.title}
                      required 
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Order</label>
                    <input 
                      name="order" 
                      type="number" 
                      defaultValue={editingStory?.order || stories.length + 1}
                      required 
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-center"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Description</label>
                  <textarea 
                    name="description" 
                    defaultValue={editingStory?.description}
                    required 
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 bg-brand-gold text-white rounded-2xl font-medium hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  <Save size={20} />
                  {editingStory ? 'Save Changes' : 'Create Milestone'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
