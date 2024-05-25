// app/sitemap.js
import prisma from '@/lib/prisma';
// import fetchAds from '@/utils/api/backend/fetchAds';
// import fetchArticles from '@/utils/api/prisma/fetchArticles';
import { routes } from '@/utils/constants';
import { dateFormat } from '@/utils/date';
import dayjs from 'dayjs';

const URL = process.env.NEXT_PUBLIC_APP_URL;

const mainRoutes = [
  routes.main,
  routes.blog,
  routes.favourites,
  routes.add,
  routes.profile,
  routes.search,
];

const formatDate = (date: string) => dayjs(date).format(dateFormat.time);

export default async function sitemap() {
  const routes = mainRoutes.map(route => ({
    url: `${URL}${route}`,
    lastModified: formatDate(new Date().toISOString()),
  }));

  const _posts = await prisma.post.findMany({
    take: 1000,
    where: {
      published: true,
    },
  });

  const posts = _posts.map(({ slug, updatedAt }) => ({
    url: `${URL}/post/${slug}`,
    lastModified: formatDate(updatedAt.toISOString()),
  }));

  const articles = await prisma.article.findMany();

  const articleRoutes = articles.map(({ slug, updatedAt }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: formatDate(updatedAt.toISOString()),
  }));
  //
  return [...routes, ...posts, ...articleRoutes];

  // return [];
}
