import fetchArticles from '@/utils/api/fetchArticles';
import { routes, seo } from '@/utils/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: seo.blog.title,
  description: seo.blog.description,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL + routes.blog,
  },
};

export default async function ArticlesPage<NextPage>() {
  const articles = await fetchArticles();
  return (
    <section itemScope itemType="https://schema.org/Blog">
      <h1>Блог</h1>
      <ul className="grid grid-cols-1 gap-2">
        {articles.map(({ id, title, slug }) => (
          <li key={id} itemType="blogPost">
            <Link href={routes.blog + '/' + slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
