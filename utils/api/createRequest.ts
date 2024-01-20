import axios from 'axios';

export const beRoutes = {
  telegrams: '/telegrams',
  ads: '/ads',
  uploads: '/uploads',
  users: '/users',
  articles: '/articles',
  categories: '/categories',
} as const;

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

client.interceptors.request.use(
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

export default client;
