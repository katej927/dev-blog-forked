import { NextRequest, NextResponse } from 'next/server'

import { connectMongoDB } from '@/libs/mongodb'
import Category from '@/models/category'

export const POST = async (request: NextRequest) => {
  const { categoryName } = await request.json()

  await connectMongoDB()

  const isExistedCategory = await Category.findOne({ categoryName })
  if (isExistedCategory) {
    return NextResponse.json(
      { error: 'Category name already exists' },
      { status: 400 },
    )
  }

  try {
    const createdCategory = await Category.create({ categoryName })
    console.log('Category created: ', createdCategory)
    return NextResponse.json(
      { message: 'Category created successfully' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating category: ', error)
    return NextResponse.json(
      { error: 'Failed to create category.' },
      { status: 500 },
    )
  }
}

export const GET = async (request: NextRequest) => {
  const articlesType = request.nextUrl.searchParams.get('articlesType')

  try {
    await connectMongoDB()

    let categories
    switch (articlesType) {
      case 'ids':
        categories = await Category.find({})
        break
      case 'omit':
        categories = await Category.find({}, '-articles')
        break
      case 'detail':
        categories = await Category.find({}).populate('articles')
        break
      default:
        throw new Error('Invalid articlesType')
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories: ', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories.' },
      { status: 500 },
    )
  }
}
