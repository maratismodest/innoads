// app/sitemap.js
import fetchAds from '@/utils/api/fetchAds';
import fetchArticles from '@/utils/api/fetchArticles';
import { routes } from '@/utils/constants';
import { dateFormat } from '@/utils/date';
import dayjs from 'dayjs';

const URL = process.env.NEXT_PUBLIC_APP_URL;

const mainRoutes = [routes.main, routes.blog, routes.favourites, routes.add, routes.profile, routes.search];

const formatDate = (date: string) => dayjs(date).format(dateFormat.time);

export default async function sitemap() {
  const routes = mainRoutes.map(route => ({
    url: `${URL}${route}`,
    lastModified: formatDate(new Date().toISOString()),
  }));

  const { content } = await fetchAds({ size: 1000 });

  const posts = content.map(({ slug, updatedAt }) => ({
    url: `${URL}/post/${slug}`,
    lastModified: formatDate(updatedAt),
  }));

  const articles = await fetchArticles();
  const articleRoutes = articles.map(({ slug, updatedAt }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: formatDate(updatedAt),
  }));

  return [...routes, ...posts, ...articleRoutes];
}
