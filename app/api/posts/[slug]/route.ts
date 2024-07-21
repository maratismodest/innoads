import { NextResponse } from 'next/server';

import fetchAd from '@/utils/api/prisma/fetchAd';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const res = await fetchAd(slug ?? '');
  return NextResponse.json(res);
}

/**
 * @swagger
 * paths:
 *   /api/posts/{slug}:
 *     get:
 *       summary: Get post by slug
 *       parameters:
 *         - in: path
 *           name: slug
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique slug of the post
 *       responses:
 *         200:
 *           description: Successful response
 *           content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     $ref: "#/components/schemas/Post",
 *                   }
 *                 }
 *               }
 *             }
 *         404:
 *           description: Post not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *               example:
 *                 error: "Post not found"
 */
