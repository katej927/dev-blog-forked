import Category from '@/models/category'
import { NextRequest, NextResponse } from 'next/server'

import { connectMongoDB } from '@/libs/mongodb'
import { Article, ArticleContent } from '@/models/article'
import { RevisedArticleInterface } from '@/apis/articles'

export const PUT = async (
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string }
  },
) => {
  const {
    newTitle: title,
    newContent: { text, html },
    newCategory: category,
  }: RevisedArticleInterface = await request.json()

  await connectMongoDB()

  const { content: contentId, _id: articleId } =
    await Article.findByIdAndUpdate(id, {
      title,
      category,
    })

  await ArticleContent.findByIdAndUpdate(contentId, {
    text,
    html,
  })

  await Category.findOneAndUpdate(
    { articles: articleId },
    { $pull: { articles: articleId } },
  )

  await Category.findByIdAndUpdate(category, {
    $addToSet: { articles: articleId },
  })

  return NextResponse.json({ message: 'Article updated' }, { status: 200 })
}

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  await connectMongoDB()
  const article = await Article.findOne({ _id: id }).populate('content')

  return NextResponse.json({ article }, { status: 200 })
}
