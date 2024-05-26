// import fetchArticles from '@/utils/api/fetchArticles';
import Breadcrumbs, { Breadcrumb } from '@/components/Breadcrumbs';
import { getAllArticles } from '@/prisma/services/articles';
import { routes, seo } from '@/utils/constants';
import { getBlogJsonLd } from '@/utils/jsonLd';
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
  const articles = await getAllArticles();

  const breadcrumbs: Breadcrumb[] = [
    { value: routes.main, label: 'Главная' },
    { value: routes.blog, label: 'Блог' },
  ];

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogJsonLd(articles)) }}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1>Блог</h1>
      <ul className="grid grid-cols-1 gap-2">
        {articles.map(({ id, title, slug }) => (
          <li key={id}>
            <Link href={routes.blog + '/' + slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
