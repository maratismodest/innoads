import {UserDTO} from "types/UserDTO";

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
  createdAt: string;
}
