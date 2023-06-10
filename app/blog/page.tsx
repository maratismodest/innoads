import fetchArticles from "@/utils/api/fetchArticles";
import {routes, seo} from "@/utils/constants";
import {Metadata} from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = seo.blog

export default async function BlogPage() {
  const articles = await fetchArticles()

  return (
    <>
      <h1>Блог</h1>
      <ul>
        {articles.map((article) =>
          <li key={article.id} className='mb-2'>
            <Link href={routes.blog + '/' + article.slug}>{article.title}</Link>
          </li>,
        )}
      </ul>
    </>
  );
};
