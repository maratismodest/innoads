import { NextResponse } from 'next/server';

import { getAllTaps } from '@/prisma/services/taps';

/**
 * @swagger
 * /api/taps:
 *   get:
 *     description: Returns taps list
 *     responses:
 *       200:
 *         description: []
 *         content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     $ref: "#/components/schemas/Taps",
 *                   }
 *                 }
 *               }
 *             }
 *
 *
 */

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await getAllTaps();
  console.log('GET /api/taps', res);
  return NextResponse.json(res);
}
