import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
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
  console.log('Admin created:', admin.email)

  // 2. Create Initial Story Blocks
  const stories = [
    { title: 'The First Encounter', description: 'It all started at a small coffee shop in Lagos. A spilled latte and a shared laugh was all it took.', order: 1 },
    { title: 'The Proposal', description: 'Under the stars at the beach, with the sound of the waves as our witness.', order: 2 },
  ]
  for (const story of stories) {
    await prisma.story.create({ data: story })
  }
  console.log('Story blocks created')

  // 3. Create Initial Event Details
  const events = [
    { title: 'Traditional Wedding', value: 'Dec 28, 2026 | 10:00 AM\nGrand Heritage Hall, Lagos' },
    { title: 'Church Ceremony', value: 'Dec 31, 2026 | 1:00 PM\nThe White Pebble Chapel, Lagos' },
  ]
  for (const event of events) {
    await prisma.eventDetail.create({ data: event })
  }
  console.log('Events created')

  // 4. Create Initial Support Info
  const support = [
    { label: 'Bank Name (NGN)', value: 'High Premium Bank' },
    { label: 'Account Number (NGN)', value: '0123456789' },
    { label: 'Account Name', value: 'Morayo & Ade Wedding' },
  ]
  for (const item of support) {
    await prisma.supportInfo.create({ data: item })
  }
  console.log('Support info created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
