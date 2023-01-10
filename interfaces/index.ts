export interface PostInterface extends InitialPostInterface {
    id: number;
    createdAt: string;
    updatedAt: string;
    vector?: any;
    user?: UserType
}
export type UserType = {
    id: number,
    username: string
}

export interface InitialPostInterface {
    title: string;
    body: string;
    price: number;
    userId: number;
    preview: string;
    images: string;
    slug: string;
    categoryId: number;
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
