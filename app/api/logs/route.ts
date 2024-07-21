import { NextResponse } from 'next/server';

import { getAllLogs } from '@/prisma/services/logs';

/**
 * @swagger
 * /api/logs:
 *   get:
 *     description: Returns logs list
 *     responses:
 *       200:
 *         description: []
 *         content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     $ref: "#/components/schemas/Log",
 *                   }
 *                 }
 *               }
 *             }
 *
 *
 */

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await getAllLogs();
  return NextResponse.json(res);
}
