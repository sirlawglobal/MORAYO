import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // 1. Clear existing data (optional but helpful for a clean start)
  try {
    await prisma.eventDetail.deleteMany()
    await prisma.supportDetail.deleteMany()
    console.log('Cleared old event and support details')
  } catch (e) {
    console.log('No data to clear')
  }

  // 1. Create Default Admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@wedding.com' },
    update: {},
    create: {
      email: 'admin@wedding.com',
      password: hashedPassword,
    },
  })
  console.log('Admin checked:', admin.email)

  // 2. Create Initial Story Blocks
  const storiesCount = await prisma.story.count()
  if (storiesCount === 0) {
    const stories = [
      { title: 'The First Encounter', description: 'It all started at a small coffee shop in Lagos. A spilled latte and a shared laugh was all it took for MORadekemi and AYObami to notice each other.', order: 1 },
      { title: 'The Proposal', description: 'Under the stars at the beach, with the sound of the waves as our witness, AYObami asked MORadekemi to begin forever together.', order: 2 },
    ]
    for (const story of stories) {
      await prisma.story.create({ data: story })
    }
    console.log('Story blocks created')
  }

  // 3. Create Initial Event Details
  const events = [
    { 
      title: 'Traditional Wedding', 
      date: 'December 28, 2026', 
      time: '10:00 AM', 
      location: 'Grand Heritage Hall, Lagos', 
      dressCode: 'Elegant Traditional Attire',
      order: 1
    },
    { 
      title: 'Wedding Ceremony', 
      date: 'December 31, 2026', 
      time: '1:00 PM', 
      location: 'The White Pebble Chapel, Lagos', 
      dressCode: 'Strictly Formal / Black Tie',
      order: 2
    },
    { 
      title: 'Reception Party', 
      date: 'December 31, 2026', 
      time: '4:00 PM', 
      location: 'Grand Ballroom, Eko Hotel', 
      dressCode: 'Evening Grace',
      order: 3
    }
  ]
  for (const event of events) {
    await prisma.eventDetail.create({ data: event })
  }
  console.log('Rich events created')

  // 4. Create Initial Support Info
  const support = [
    { 
      currency: 'NGN', 
      bank: 'High Premium Bank', 
      accountNum: '0123456789', 
      accountName: 'MORadekemi & AYObami Wedding',
      symbol: '₦'
    },
    { 
      currency: 'USD', 
      bank: 'Global Trust Bank', 
      accountNum: '9876543210', 
      accountName: 'MORadekemi & AYObami Global',
      symbol: '$'
    }
  ]
  for (const item of support) {
    await prisma.supportDetail.create({ data: item })
  }
  console.log('Structured support details created')

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
