export const getUrl = (categoryId: number = 0, page: number = 0, size: number = 10, text: string = '', userId: number = 0): string =>
    `${process.env.NEXT_PUBLIC_API_URL}/posts?categoryId=${categoryId}&page=${page}&size=${size}&text=${text}&userId=${userId}`
