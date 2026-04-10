'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const gallerySchema = z.object({
  imageUrl: z.string().url('Invalid image URL'),
  category: z.string().min(1, 'Category is required'),
})

export async function addGalleryImage(formData: FormData) {
  const data = gallerySchema.parse({
    imageUrl: formData.get('imageUrl'),
    category: formData.get('category'),
  })

  await prisma.gallery.create({ data })
  revalidatePath('/gallery')
  revalidatePath('/dashboard/gallery')
}

export async function deleteGalleryImage(id: number) {
  await prisma.gallery.delete({ where: { id } })
  revalidatePath('/gallery')
  revalidatePath('/dashboard/gallery')
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
