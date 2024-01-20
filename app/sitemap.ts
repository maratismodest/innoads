// app/sitemap.js
import fetchArticles from '@/utils/api/fetchArticles';
import fetchUsers from '@/utils/api/fetchUsers';
import fetchAds from '@/utils/api/fetchAds';

const URL = process.env.NEXT_PUBLIC_APP_URL;

const mainRoutes = ['', '/blog', '/favourites', '/add', '/profile', '/search'] as const;

export default async function sitemap() {
  const routes = mainRoutes.map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const { content } = await fetchAds({ size: 1000 });
  const users = await fetchUsers();
  const posts = content.map(({ slug, updatedAt }) => ({
    url: `${URL}/post/${slug}`,
    lastModified: updatedAt,
  }));

  const userRoutes = users.map(({ id, createdAt }) => ({
    url: `${URL}/user/${id}`,
    lastModified: createdAt,
  }));

  const articles = await fetchArticles();
  const articleRoutes = articles.map(({ slug, createdAt }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: createdAt,
  }));

  return [...routes, ...posts, ...userRoutes, ...articleRoutes];
}
