import { getAllCategories } from '@/prisma/services/categories';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/categories:
 *   get:
 *     description: Returns categories list
 *     responses:
 *       200:
 *         description: []
 *         content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "object",
 *                   items: {
 *                     $ref: "#/components/schemas/Category",
 *                   }
 *                 }
 *               }
 *             }
 *
 *
 */

export async function GET(request: Request) {
  const res = await getAllCategories();
  return NextResponse.json(res);
}
