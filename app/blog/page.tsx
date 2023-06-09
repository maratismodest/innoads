import InnerBlog from "@/pages-lib/blog";
import fetchArticles from "@/utils/api/fetchArticles";

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
      <InnerBlog articles={articles}/>
    </>
  );
};
