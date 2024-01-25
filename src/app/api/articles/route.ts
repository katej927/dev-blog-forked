import { NextRequest, NextResponse } from 'next/server'

import { connectMongoDB } from '@/libs/mongodb'
import { Article, ArticleContent } from '@/models/article'
import { ArticleInterface } from '@/apis/articles'

export const POST = async (request: NextRequest) => {
  const {
    title,
    content: { text, html },
  }: ArticleInterface = await request.json()
  await connectMongoDB()

  const { _id: articleContentId } = await ArticleContent.create({
    text,
    html,
  })
  const { _id: articleId } = await Article.create({
    title,
    articleContentId,
  })

  return NextResponse.json({ message: articleId.toString() }, { status: 201 })
}

export const GET = async (request: NextRequest) => {
  const searchTerm = request.nextUrl.searchParams.get('searchTerm')

  await connectMongoDB()

  const searchCondition = {
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { 'content.text': { $regex: searchTerm, $options: 'i' } },
    ],
  }

  const articles = searchTerm
    ? await Article.find(searchCondition)
    : await Article.find()

  return NextResponse.json({ articles })
}

export const DELETE = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Article.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Article deleted' }, { status: 200 })
}
