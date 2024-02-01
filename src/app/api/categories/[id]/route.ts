import connectMongoDB from '@/libs/mongodb'
import Category from '@/models/category'
import { NextRequest, NextResponse } from 'next/server'

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

    const existingCategory = await Category.findById(id)
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found.' },
        { status: 404 },
      )
    }

    existingCategory.categoryName = categoryName
    await existingCategory.save()

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
