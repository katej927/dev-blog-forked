import { NextRequest, NextResponse } from 'next/server'

import connectMongoDB from '@/libs/mongodb'
import Article from '@/models/article'

export const POST = async (request: NextRequest) => {
  const { title, content } = await request.json()
  await connectMongoDB()

  const createdInfo = await Article.create({ title, content })
  const { _id } = createdInfo

  return NextResponse.json({ message: _id.toString() }, { status: 201 })
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
