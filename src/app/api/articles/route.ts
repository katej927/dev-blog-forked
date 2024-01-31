import { NextRequest, NextResponse } from 'next/server'

import { connectMongoDB } from '@/libs/mongodb'
import { Article, ArticleContent, Category } from '@/models/article'
import { ArticleInterface } from '@/apis/articles'

export const POST = async (request: NextRequest) => {
  const {
    title,
    content: { text, html },
    category,
  }: ArticleInterface = await request.json()
  await connectMongoDB()

  const { _id: articleContentId } = await ArticleContent.create({
    text,
    html,
  })

  const { _id: articleId } = await Article.create({
    title,
    content: articleContentId,
  })

  // TODO: 수정 필요
  // let foundCategory = await Category.findOne({ categoryName: category })
  // if (foundCategory) {
  //   foundCategory.articles.push(articleId)
  //   await foundCategory.save()
  // } else {
  //   await Category.create({ categoryName: category, articles: [articleId] })
  // }

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

  return NextResponse.json({ articles })
}

export const DELETE = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get('id')

  await connectMongoDB()

  const { content: contentId } = await Article.findByIdAndDelete(id)
  await ArticleContent.findByIdAndDelete(contentId)

  return NextResponse.json({ message: 'Article deleted' }, { status: 200 })
}
