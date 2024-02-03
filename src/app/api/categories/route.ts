import connectMongoDB from '@/libs/mongodb'
import { Article } from '@/models/article'
import Category from '@/models/category'
import { NextRequest, NextResponse } from 'next/server'

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

export const GET = async () => {
  try {
    await connectMongoDB()

    const categories = await Category.find({})

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories: ', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories.' },
      { status: 500 },
    )
  }
}
