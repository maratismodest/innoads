import { UserDTO } from '@/types';
import axios from 'axios';
import type { Post, User } from '@prisma/client';
import client, { beRoutes } from './createRequest';

export default async function fetchPrismaPosts(): Promise<Post[]> {
  const { data } = await axios.get('/api/test');
  return data;
}
