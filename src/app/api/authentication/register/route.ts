import { NextResponse } from 'next/server'

export async function POST() {
  // export async function POST(request: NextRequest) {
  try {
    // TODO: 여기 처리
    // const { name, email, password } = await request.json()

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
