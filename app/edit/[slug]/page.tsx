import PostForm from '@/modules/PostForm/PostForm'
import {postDefaultValues, PostFormValues} from '@/modules/PostForm/utils';
import fetchPost from "@/utils/api/fetchAd";
import {categories} from '@/utils/categories'

interface EditPageProps {
  params: { slug: string }
}

export default async function EditPage<NextPage>({params}: EditPageProps) {
  const post = await fetchPost(params.slug as string)
  const {categoryId, title, body, price} = post
  const editValues: PostFormValues = {
    ...postDefaultValues,
    categoryId: categories.find((category) => category.value === categoryId)?.value || 1,
    body,
    title,
    price,
  }
  return (
    <PostForm defaultValues={editValues} post={post}/>
  )
}
