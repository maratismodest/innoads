import { Prisma } from '@prisma/client';

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
}

export type UserWithBans = Prisma.UserGetPayload<{
  include: { bans: true };
}>;
