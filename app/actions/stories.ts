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
  const data = storySchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    order: Number(formData.get('order')) || 0,
  })

  await prisma.story.create({ data })
  revalidatePath('/')
  revalidatePath('/dashboard/stories')
}

export async function updateStory(id: number, formData: FormData) {
  const data = storySchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    order: Number(formData.get('order')) || 0,
  })

  await prisma.story.update({
    where: { id },
    data,
  })
  revalidatePath('/')
  revalidatePath('/dashboard/stories')
}

export async function deleteStory(id: number) {
  await prisma.story.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/dashboard/stories')
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
