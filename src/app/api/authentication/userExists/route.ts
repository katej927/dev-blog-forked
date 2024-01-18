import { NextRequest } from 'next/server'

import { connectMongoDB } from '@/libs/mongodb'
import User from '@/models/user'

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB()

    const { email } = await request.json()
    await User.findOne({ email }).select('_id')
  } catch (error) {}
}
