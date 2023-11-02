import connectMongoDB from '@/libs/mongodb'
import Article from '@/models/topic'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params: { id } }: Params) {
  const { newTitle: title, newContent: content } = await request.json()
  await connectMongoDB()
  await Article.findByIdAndUpdate(id, { title, content })
  return NextResponse.json({ message: 'Article updated' }, { status: 200 })
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  await connectMongoDB()
  const article = await Article.findOne({ _id: id })
  return NextResponse.json({ article }, { status: 200 })
}
