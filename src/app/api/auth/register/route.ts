import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { connectMongoDB } from '@/libs/mongodb'
import User from '@/models/user'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    const hashedPassword = await bcrypt.hash(password, 10)

    await connectMongoDB()
    await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: 'User registered.' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error ocurred while registering the user.',
      },
      { status: 500 },
    )
  }
}
