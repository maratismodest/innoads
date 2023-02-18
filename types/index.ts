import { TelegramUser } from 'telegram-login-button'

export type UserProps = Pick<TelegramUser, 'id' | 'username'>

export type PostInterface = {
    id: number;
    title: string;
    body: string;
    price: number;
    userId: number;
    preview: string;
    images: string;
    slug: string;
    categoryId: number;
    user: UserProps;
    createdAt: string;
    updatedAt: string;
}
export type PostFormInterface = Omit<PostInterface, 'id' | 'createdAt' | 'updatedAt' | 'user'>
export type EditPostInterface = Omit<PostInterface, 'updatedAt' | 'user'>

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export interface GetStaticPath {
    params: { id: string },
    locale: string
}

export interface GetStaticPostPath {
    params: { slug: string },
    locale: string
}

export type BlogPost = {
    id: string,
    date: string,
    title: string,
    description: string
    contentHtml?: string
}
