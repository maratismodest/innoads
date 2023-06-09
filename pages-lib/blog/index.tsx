import {ArticleDTO} from "@/types";
import {routes} from "@/utils/constants";
import Link from "next/link";
import React from 'react';

type Props = {
  articles: ArticleDTO[],
}

const InnerBlog = ({articles}: Props) => {
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

export default InnerBlog;
