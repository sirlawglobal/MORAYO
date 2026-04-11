'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const gallerySchema = z.object({
  category: z.string().min(1, 'Category is required'),
})

export async function addGalleryImage(formData: FormData) {
  try {
    const category = formData.get('category') as string
    const file = formData.get('file') as File

    if (!file || file.size === 0) {
      throw new Error('No image file provided')
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary with optimization
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'wedding-gallery',
          resource_type: 'image',
          transformation: [
            { width: 2000, height: 2000, crop: 'limit' }, // Optimization: Limit size to 2000px
            { quality: 'auto', fetch_format: 'auto' }     // Optimization: Auto quality/format
          ],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    }) as any

    const imageUrl = uploadResponse.secure_url

    // Save to Database
    await prisma.gallery.create({
      data: {
        imageUrl,
        category,
      },
    })

    revalidatePath('/')
    revalidatePath('/dashboard/gallery')
    return { success: true, imageUrl }
  } catch (error: any) {
    console.error('Add gallery image error:', error)
    return { success: false, error: error?.message || 'Failed to add image' }
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    // Note: We could also delete from Cloudinary if we stored the public_id,
    // but for now we'll just remove the DB record.
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
