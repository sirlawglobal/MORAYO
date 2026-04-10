import bcrypt from 'bcryptjs'
import prisma from './lib/prisma.js'

async function debugLogin() {
  const email = 'admin@wedding.com'
  const password = 'admin123'

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      console.log('User not found')
      return
    }

    console.log('User found:', admin.email)
    
    const isMatch = await bcrypt.compare(password, admin.password)
    console.log('Password match:', isMatch)

    if (isMatch) {
       console.log('Login logic successful')
    } else {
       console.log('Login logic failed: password mismatch')
    }
  } catch (error) {
    console.error('Debug Login Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugLogin()
