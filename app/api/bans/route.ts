import { getAllBans } from '@/prisma/services/bans';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/bans:
 *   get:
 *     description: Returns banned users list
 *     responses:
 *       200:
 *         description: []
 *         content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     $ref: "#/components/schemas/Ban",
 *                   }
 *                 }
 *               }
 *             }
 *
 *
 */

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await getAllBans();
  return NextResponse.json(res);
}
