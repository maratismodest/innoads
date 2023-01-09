export const getUrl = (category: number = 0, page: number = 0, size: number = 10, text: string = '', tgId: number = 0): string =>
    `${process.env.NEXT_PUBLIC_API_URL}/posts?category=${category}&page=${page}&size=${size}&text=${text}&tgId=${tgId}`
