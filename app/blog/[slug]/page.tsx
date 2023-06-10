import fetchArticle from "@/utils/api/fetchArticle";
import {Metadata} from "next";

type Props = {
  params: { id: string, slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  {params}: Props,
): Promise<Metadata> {
  const {title} = await fetchArticle(params?.slug as string)

  return {
    title
  }
}

export default async function ArticlePage({params}: Props) {

  const {title, body} = await fetchArticle(params?.slug as string)
  return (
    <>
      <h1>{title}</h1>
      <article className='wysiwyg' dangerouslySetInnerHTML={{__html: body}}/>
    </>
  )
}

