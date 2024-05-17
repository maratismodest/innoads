import prisma from '@/lib/prisma';
import { Article } from '@prisma/client';

export function getAllArticles(): Promise<Article[]> {
  return prisma.article.findMany();
}

export function getArticleBySlug(slug: string) {
  try {
    return prisma.article.findUnique({ where: { slug } });
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}
