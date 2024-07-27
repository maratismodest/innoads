import { NextResponse } from 'next/server';

import fetchUsers from '@/utils/api/prisma/fetchUsers';
import cleanObject from '@/utils/cleanObject';
import getSearchParams from '@/utils/getSearchParams';

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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const params = getSearchParams(searchParams, ['search']);
  const response = await fetchUsers(cleanObject({ search: params?.search }));
  return NextResponse.json(response);
}
