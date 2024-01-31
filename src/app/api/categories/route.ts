import { Category } from '@/models/article'
import connectMongoDB from '@/libs/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const { categoryName } = await request.json()

  await connectMongoDB()

  const isExistedCategory = await Category.findOne({ categoryName })
  if (isExistedCategory) {
    return NextResponse.json({ error: 'Category name already exists' })
  }

  try {
    const createdCategory = await Category.create({ categoryName })
    console.log('Category created: ', createdCategory)
    return NextResponse.json({ message: 'Category created successfully' })
  } catch (error) {
    console.error('Error creating category: ', error)
    return NextResponse.json({ error: 'Failed to create category.' })
  }
}

export const GET = async () => {
  try {
    const categories = await Category.find({})

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories: ', error)
    return NextResponse.json({ error: 'Failed to fetch categories.' })
  }
}
