import { NextRequest, NextResponse } from 'next/server'

import { connectMongoDB } from '@/libs/mongodb'
import { DetailArticleCategoryIdInterface } from '@/apis/articles'
import { Article, ArticleContent } from '@/models/article'
import Category from '@/models/category'

export const POST = async (request: NextRequest) => {
  const {
    title,
    content: { text, html },
    category,
  }: DetailArticleCategoryIdInterface = await request.json()
  await connectMongoDB()

  const { _id: articleContentId } = await ArticleContent.create({
    text,
    html,
  })

  const { _id: articleId } = await Article.create({
    title,
    content: articleContentId,
    category,
  })

  if (category) {
    const updateResult = await Category.updateOne(
      { _id: category },
      { $push: { articles: articleId } },
    )

    if (updateResult.modifiedCount === 0) {
      throw new Error(`Category '${category}' does not exist`)
    }
  }

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
    ? await Article.aggregate([
        {
          $lookup: {
            from: 'articlecontents',
            localField: 'content',
            foreignField: '_id',
            as: 'content',
          },
        },
        {
          $unwind: {
            path: '$content',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: searchCondition,
        },
        {
          $project: {
            _id: 1,
            title: 1,
            content: { _id: 1 },
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ])
    : await Article.find()

  return NextResponse.json({ articles }, { status: 200 })
}

export const DELETE = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get('id')

  await connectMongoDB()

  const {
    content: contentId,
    _id: articleId,
    category,
  } = await Article.findByIdAndDelete(id)

  await ArticleContent.findByIdAndDelete(contentId)

  if (category) {
    await Category.findOneAndUpdate(
      { articles: articleId },
      { $pull: { articles: articleId } },
    )
  }

  return NextResponse.json({ message: 'Article deleted' }, { status: 200 })
}
