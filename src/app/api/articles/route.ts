import connectMongoDB from '@/src/libs/mongodb'
import Article from '@/src/models/topic'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { title, content } = await request.json()
  await connectMongoDB()
  await Article.create({ title, content })
  return NextResponse.json({ message: 'Article created' }, { status: 201 })
}

export async function GET() {
  await connectMongoDB()
  const articles = await Article.find()
  return NextResponse.json({ articles })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Article.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Article deleted' }, { status: 200 })
}
