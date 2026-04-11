import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const content = await request.json()

    const filePath = join(process.cwd(), 'public', 'content.json')
    await writeFile(filePath, JSON.stringify(content, null, 2))

    return NextResponse.json({
      message: 'Content saved successfully',
    })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { message: 'Error saving content' },
      { status: 500 }
    )
  }
}
