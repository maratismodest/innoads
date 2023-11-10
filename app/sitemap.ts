// app/sitemap.js
import fetchUsers from '@/utils/api/fetchUsers';
import fetchAds from '../utils/api/fetchAds';

const URL = 'https://innoads.ru';

export default async function sitemap() {
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

  const routes = ['', '/blog', '/favourites', '/add', '/profile', '/search'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts, ...userRoutes];
}
