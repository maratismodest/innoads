import { getArticleBySlug } from '@/prisma/services/articles';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * paths:
 *   /api/articles/{slug}:
 *     get:
 *       summary: Get article by slug
 *       parameters:
 *         - in: path
 *           name: slug
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique slug of the article
 *       responses:
 *         200:
 *           description: Successful response
 *           content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     $ref: "#/components/schemas/Article",
 *                   }
 *                 }
 *               }
 *             }
 *         404:
 *           description: Article not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *               example:
 *                 error: "Article not found"
 */

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const res = await getArticleBySlug(slug ?? '');
  return NextResponse.json(res);
}
