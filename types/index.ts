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
