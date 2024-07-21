import { getAllUsers } from '@/prisma/services/users';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns users list
 *     responses:
 *       200:
 *         description: []
 *         content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     $ref: "#/components/schemas/User",
 *                   }
 *                 }
 *               }
 *             }
 *
 *
 */

export const dynamic = 'force-dynamic';
export async function GET() {
  const res = await getAllUsers();

  return NextResponse.json(res);
}
