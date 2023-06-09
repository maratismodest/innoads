import fetchArticles from "@/utils/api/fetchArticles";
import {routes} from "@/utils/constants";
import Link from "next/link";
import React from "react";

async function getProps() {
  const articles = await fetchArticles()
  return {
    articles
  }
}

export default async function Articles() {
  const {articles} = await getProps()
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
