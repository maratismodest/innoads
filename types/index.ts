export interface TelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
}

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

export interface Seo {
    title: string,
    description: string
}
