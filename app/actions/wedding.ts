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
  const data = rsvpSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    status: formData.get('status'),
    message: formData.get('message'),
  })

  await prisma.rSVP.create({ data })
  revalidatePath('/dashboard/rsvps')
  return { success: true }
}

export async function deleteRSVP(id: string) {
  await prisma.rSVP.delete({ where: { id } })
  revalidatePath('/dashboard/rsvps')
}

export async function getRSVPs() {
  return await prisma.rSVP.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

// --- Event Detail Actions ---

export async function updateEventDetails(id: string, value: string) {
  await prisma.eventDetail.update({
    where: { id },
    data: { value },
  })
  revalidatePath('/')
  revalidatePath('/dashboard')
}

// --- Support Info Actions ---

export async function updateSupportInfo(id: string, value: string) {
  await prisma.supportInfo.update({
    where: { id },
    data: { value },
  })
  revalidatePath('/')
  revalidatePath('/dashboard')
}
