import { Message } from '@prisma/client';
import { NextResponse } from 'next/server';

import { getAllMessage } from '@/prisma/services/messages';

/**
 * @swagger
 * /api/messages:
 *   get:
 *     description: Returns messages list
 *     responses:
 *       200:
 *         description: []
 *         content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     $ref: "#/components/schemas/Message",
 *                   }
 *                 }
 *               }
 *             }
 *
 *
 */

const headers = {
  'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
};

export async function GET() {
  const res: Message[] = await getAllMessage();
  return NextResponse.json(res, {
    headers: headers,
  });
}
