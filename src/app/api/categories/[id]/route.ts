import { NextRequest, NextResponse } from 'next/server'

import { connectMongoDB } from '@/libs/mongodb'
import { Article } from '@/models/article'
import Category from '@/models/category'

export const PUT = async (
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string }
  },
) => {
  const { categoryName } = await request.json()

  try {
    await connectMongoDB()

    const existingCategory = await Category.findOneAndUpdate(
      { _id: id },
      { categoryName },
      { new: true },
    )

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found.' },
        { status: 404 },
      )
    }

    console.log('Category updated: ', existingCategory)
    return NextResponse.json(
      { message: 'Category updated successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error updating category: ', error)
    return NextResponse.json(
      { error: 'Failed to update category. ' },
      { status: 500 },
    )
  }
}

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  await connectMongoDB()
  const category = await Category.findOne({ _id: id }).populate('articles')

  return NextResponse.json({ category }, { status: 200 })
}

export const DELETE = async (
  request: NextRequest,
  { params: { id: categoryId } }: { params: { id: string } },
) => {
  try {
    await connectMongoDB()

    await Article.updateMany(
      { category: categoryId },
      { $set: { category: null } },
    )

    await Category.deleteOne({ _id: categoryId })

    return NextResponse.json(
      { message: 'Category and associated articles deleted' },
      { status: 200 },
    )
  } catch (error) {
    console.error('An error occurred while deleting the category: ', error)
    return NextResponse.json(
      {
        message: 'Error occurred while deleting the category',
      },
      { status: 500 },
    )
  }
}
