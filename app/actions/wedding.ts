'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// --- RSVP Actions ---

const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  status: z.enum(['attending', 'not_attending']),
  message: z.string().optional(),
})

export async function submitRSVP(formData: FormData) {
  try {
    const data = rsvpSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      status: formData.get('status'),
      message: formData.get('message') || undefined,
    })

    await prisma.rSVP.create({ data })
    revalidatePath('/dashboard/rsvps')
    return { success: true }
  } catch (error: any) {
    console.error('Submit RSVP error:', error)
    return { success: false, error: error?.message || 'Failed to submit RSVP' }
  }
}

export async function deleteRSVP(id: string) {
  try {
    await prisma.rSVP.delete({ where: { id } })
    revalidatePath('/dashboard/rsvps')
    return { success: true }
  } catch (error: any) {
    console.error('Delete RSVP error:', error)
    return { success: false, error: error?.message || 'Failed to delete RSVP' }
  }
}

export async function getRSVPs() {
  try {
    return await prisma.rSVP.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('RSVPs fetch failed:', error)
    return []
  }
}

// --- Event Detail Actions ---

export async function updateEventDetails(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string
    const location = formData.get('location') as string
    const dressCode = formData.get('dressCode') as string

    await prisma.eventDetail.update({
      where: { id },
      data: { title, date, time, location, dressCode },
    })
    revalidatePath('/')
    revalidatePath('/dashboard/events')
    return { success: true }
  } catch (error: any) {
    console.error('Update event error:', error)
    return { success: false, error: error?.message || 'Failed to update event' }
  }
}

export async function getEventDetails() {
  try {
    return await prisma.eventDetail.findMany({
      orderBy: { order: 'asc' },
    })
  } catch (error) {
    console.error('Event details fetch failed:', error)
    return []
  }
}

// --- Support Info Actions ---

export async function updateSupportDetail(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const bank = formData.get('bank') as string
    const accountNum = formData.get('accountNum') as string
    const accountName = formData.get('accountName') as string

    await prisma.supportDetail.update({
      where: { id },
      data: { bank, accountNum, accountName },
    })
    revalidatePath('/')
    revalidatePath('/dashboard/support')
    return { success: true }
  } catch (error: any) {
    console.error('Update support detail error:', error)
    return { success: false, error: error?.message || 'Failed to update support detail' }
  }
}

export async function getSupportDetails() {
  try {
    return await prisma.supportDetail.findMany()
  } catch (error) {
    console.error('Support details fetch failed:', error)
    return []
  }
}
