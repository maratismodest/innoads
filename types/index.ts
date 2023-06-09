export type ArticleDTO = {
  readonly id: number,
  readonly title: string
  readonly slug: string
  readonly body: string
}

export interface Seo {
  title: string,
  description: string
}

export interface GetStaticPath {
  params: { id: string },
  locale: string
}

export interface GetStaticPostPath {
  params: { slug: string },
  locale: string
}
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

export interface TelegramPostDTO {
  title: string;
  body: string;
  price: number;
  slug: string;
  username: string;
  categoryId: number;
  images: string;
}

export interface UserDTO {
  readonly id: number,
  readonly username: string
}

export interface PostDTO {
  id: number;
  title: string;
  body: string;
  price: number;
  userId: number;
  preview: string;
  images: string;
  slug: string;
  categoryId: number;
  user: UserDTO;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDTO {
  title: string;
  body: string;
  price: number;
  userId: number;
  preview: string;
  images: string;
  slug: string;
  categoryId: number;
}

export interface EditPostDTO {
  id: number;
  title: string;
  body: string;
  price: number;
  userId: number;
  preview: string;
  images: string;
  slug: string;
  categoryId: number;
}

