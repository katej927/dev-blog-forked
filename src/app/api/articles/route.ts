import { NextRequest, NextResponse } from 'next/server'

import connectMongoDB from '@/libs/mongodb'
import Article from '@/models/article'

export const POST = async (request: NextRequest) => {
  const { title, content } = await request.json()
  await connectMongoDB()
  await Article.create({ title, content })
  return NextResponse.json({ message: 'Article created' }, { status: 201 })
}

export const GET = async () => {
  await connectMongoDB()
  const articles = await Article.find()
  return NextResponse.json({ articles })
}

export const DELETE = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Article.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Article deleted' }, { status: 200 })
}
