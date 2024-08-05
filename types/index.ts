import type { Prisma, Tap } from '@prisma/client';

export interface Seo {
  title: string;
  description: string;
}

export interface GetIdPath {
  params: { id: string };
}

export interface GetSlugPath {
  params: { slug: string };
}

export interface CreatePostDTO {
  title: string;
  body: string;
  price: number;
  userId: string;
  preview: string;
  images: string;
  slug: string;
  categoryId: number;
  published: boolean;
}

export interface EditPostDTO {
  readonly id: number;
  title: string;
  body: string;
  price: number;
  readonly userId: string;
  preview: string;
  images: string;
  readonly slug: string;
  categoryId: number;
  published?: boolean;
  updatedAt?: Date;
}

export type UserWithBans = Prisma.UserGetPayload<{
  include: { bans: true };
}>;

export interface Option {
  value: number;
  label: string;
}

export interface TgUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export type Theme = 'light' | 'dark';

export type CreateTap = Omit<Tap, 'id'> & {};
