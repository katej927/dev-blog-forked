import connectMongoDB from '@/libs/mongodb'
import Article from '@/models/topic'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { title, content } = await request.json()
  await connectMongoDB()
  await Article.create({ title, content })
  return NextResponse.json({ message: 'Article created' }, { status: 201 })
}
