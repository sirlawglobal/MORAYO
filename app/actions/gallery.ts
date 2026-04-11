'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const gallerySchema = z.object({
  imageUrl: z.string().url('Invalid image URL'),
  category: z.string().min(1, 'Category is required'),
})

export async function addGalleryImage(formData: FormData) {
  try {
    const data = gallerySchema.parse({
      imageUrl: formData.get('imageUrl'),
      category: formData.get('category'),
    })

    await prisma.gallery.create({ data })
    revalidatePath('/')
    revalidatePath('/dashboard/gallery')
    return { success: true }
  } catch (error: any) {
    console.error('Add gallery image error:', error)
    return { success: false, error: error?.message || 'Failed to add image' }
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await prisma.gallery.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/dashboard/gallery')
    return { success: true }
  } catch (error: any) {
    console.error('Delete gallery image error:', error)
    return { success: false, error: error?.message || 'Failed to delete image' }
  }
}

export async function getGalleryImages() {
  try {
    return await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Gallery images fetch failed:', error)
    return []
  }
}
