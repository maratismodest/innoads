import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello InnoAds!
 */
export async function GET(_request: Request) {
  return NextResponse.json('Hello InnoAds!', { status: 200 });
}
