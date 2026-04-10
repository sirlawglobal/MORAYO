import { SignJWT } from 'jose'
import dotenv from 'dotenv'
dotenv.config()

async function debugSession() {
  const secretKey = process.env.SESSION_SECRET
  console.log('SESSION_SECRET:', secretKey ? 'Set' : 'NOT SET')
  
  if (!secretKey) {
    console.error('SESSION_SECRET is missing')
    return
  }

  const encodedKey = new TextEncoder().encode(secretKey)
  const userId = '60d5ec...'
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  try {
    const session = await new SignJWT({ userId, expiresAt })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedKey)
    
    console.log('Session encrypted successfully:', session.substring(0, 20) + '...')
  } catch (error) {
    console.error('Encryption failed:', error)
  }
}

debugSession()
