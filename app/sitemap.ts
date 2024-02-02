// app/sitemap.js
import fetchAds from '@/utils/api/fetchAds';
import fetchArticles from '@/utils/api/fetchArticles';
import { routes } from '@/utils/constants';

const URL = process.env.NEXT_PUBLIC_APP_URL;

const mainRoutes = [routes.main, routes.blog, routes.favourites, routes.add, routes.profile, routes.search];

export default async function sitemap() {
  const routes = mainRoutes.map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const { content } = await fetchAds({ size: 1000 });

  const posts = content.map(({ slug, updatedAt }) => ({
    url: `${URL}/post/${slug}`,
    lastModified: updatedAt,
  }));

  const articles = await fetchArticles();
  const articleRoutes = articles.map(({ slug, createdAt }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: createdAt,
  }));

  return [...routes, ...posts, ...articleRoutes];
}
