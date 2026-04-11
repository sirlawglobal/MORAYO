'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const storySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().optional(),
  order: z.number().int().default(0),
})

export async function createStory(formData: FormData) {
  try {
    const data = storySchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl') || undefined,
      order: Number(formData.get('order')) || 0,
    })

    await prisma.story.create({ data })
    revalidatePath('/')
    revalidatePath('/dashboard/stories')
    return { success: true }
  } catch (error: any) {
    console.error('Create story error:', error)
    return { success: false, error: error?.message || 'Failed to create story' }
  }
}

export async function updateStory(id: string, formData: FormData) {
  try {
    const data = storySchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl') || undefined,
      order: Number(formData.get('order')) || 0,
    })

    await prisma.story.update({
      where: { id },
      data,
    })
    revalidatePath('/')
    revalidatePath('/dashboard/stories')
    return { success: true }
  } catch (error: any) {
    console.error('Update story error:', error)
    return { success: false, error: error?.message || 'Failed to update story' }
  }
}

export async function deleteStory(id: string) {
  try {
    await prisma.story.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/dashboard/stories')
    return { success: true }
  } catch (error: any) {
    console.error('Delete story error:', error)
    return { success: false, error: error?.message || 'Failed to delete story' }
  }
}

export async function getStories() {
  try {
    return await prisma.story.findMany({
      orderBy: { order: 'asc' },
    })
  } catch (error) {
    console.error('Stories fetch failed:', error)
    return []
  }
}
