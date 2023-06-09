import {ArticleDTO} from "@/types";

import client, {beRoutes} from './createRequest'

const fetchArticle = async (slug: string): Promise<ArticleDTO> => {
  const {data} = await client.get<ArticleDTO>(beRoutes.articles + '/' + slug)
  return data
}
export default fetchArticle
