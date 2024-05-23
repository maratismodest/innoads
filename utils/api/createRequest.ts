import axios from 'axios';

export const beRoutes = {
  telegrams: '/telegrams',
  ads: '/ads',
  uploads: '/uploads',
  users: '/users',
  articles: '/articles',
  categories: '/categories',
  bans: '/bans',
  posts: '/posts',
} as const;

// https://chamala.tatar - теперь только для crud images
const clientBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

clientBackend.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const clientPrisma = axios.create({
  baseURL: '/api',
});

export const clientTelegram = axios.create({
  baseURL: `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}`,
});

export default clientBackend;
