import dayjs from 'dayjs';

import prisma from '@/lib/prisma';
import { routes } from '@/utils/constants';
import { dateFormat } from '@/utils/date';

const URL = process.env.NEXT_PUBLIC_APP_URL;

const _mainRoutes = [
  routes.main,
  routes.blog,
  routes.favourites,
  routes.add,
  routes.profile,
  routes.search,
];

const formatDate = (date: string) => dayjs(date).format(dateFormat.time);

export default async function sitemap() {
  const mainRoutes = _mainRoutes.map(route => ({
    url: `${URL}${route}`,
    lastModified: formatDate(new Date().toISOString()),
  }));

  const _posts = await prisma.post.findMany({
    take: 2000,
    where: {
      published: true,
    },
  });

  const posts = _posts.map(({ slug, updatedAt }) => ({
    url: `${URL}${routes.post}/${slug}`,
    lastModified: formatDate(updatedAt.toISOString()),
  }));

  const articles = await prisma.article.findMany();

  const articleRoutes = articles.map(({ slug, updatedAt }) => ({
    url: `${URL}${routes.blog}/${slug}`,
    lastModified: formatDate(updatedAt.toISOString()),
  }));

  return [...mainRoutes, ...posts, ...articleRoutes];
}
