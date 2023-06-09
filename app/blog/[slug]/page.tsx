import fetchArticle from "@/utils/api/fetchArticle";

export default async function Article({
                                        params,
                                      }: { params: { slug: string } }) {

  const {title, body} = await fetchArticle(params?.slug as string)
  return (
    <>
      <h1>{title}</h1>
      <article className='wysiwyg' dangerouslySetInnerHTML={{__html: body}}/>
    </>

  )
}

