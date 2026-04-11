'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Password is required.' }).trim(),
})

export async function login(prevState: any, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()))

  // 2. If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    // 3. Find user in database
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    // 4. Check if user exists and password is correct
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return {
        errors: {
          email: ['Invalid email or password.'],
        },
      }
    }

    // 5. Create user session
    await createSession(admin.id.toString())
  } catch (error) {
    console.error('Login error:', error)
    return {
      errors: {
        email: ['Something went wrong. Please try again.'],
      },
    }
  }

  // 6. Redirect to dashboard (must be outside try/catch — redirect throws internally)
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
