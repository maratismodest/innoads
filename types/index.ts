import { Post } from '@prisma/client';

export type ArticleDTO = Required<{
  id: number;
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}>;

export interface Seo {
  title: string;
  description: string;
}

export interface GetIdPath {
  params: { id: number };
}

export interface GetSlugPath {
  params: { slug: string };
}

// export interface TelegramUser {
//   readonly id: number;
//   first_name: string;
//   last_name: string;
//   username: string;
//   photo_url: string;
//   auth_date: number;
//   hash: string;
// }

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
  readonly id: number;
  readonly username: string;
  readonly createdAt?: string;
  readonly userAd?: any[];
}

export interface PostDTO {
  readonly id: number;
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
  readonly id: number;
  title: string;
  body: string;
  price: number;
  readonly userId: number;
  preview: string;
  images: string;
  slug: string;
  categoryId: number;
}

export interface CategoryDTO {
  readonly id: number;
  name: string;
  label: string;
  image: string;
}

export interface BanDTO {
  readonly id: number;
  readonly userId: number;
  readonly description?: string;
}

export type CommonPost = PostDTO | Post;

// types.ts
export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export interface IWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setParams: ({ text }: { text: string }) => void;
    show: () => void;
  };
  HapticFeedback: any;
}
