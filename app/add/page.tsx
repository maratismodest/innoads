import PostForm from '@/modules/PostForm/PostForm'
import {seo} from "@/utils/constants";
import {Metadata} from "next";

export const metadata: Metadata = {...seo.add}

export default function AddPage<NextPage>() {
  return (
    <PostForm/>
  )
}
