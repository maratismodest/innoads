import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const filename = searchParams.get('filename');

  if (filename) {
    const res = filename?.split('/');
    const filePath = path.join(process.cwd(), 'public', 'uploads', res[res.length - 1]);

    try {
      const file = await fs.readFile(filePath);
      return new NextResponse(file);
    } catch (error) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
  }
}
