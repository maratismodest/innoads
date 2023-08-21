import PostForm from '@/modules/PostForm/PostForm'
import type {Seo} from '@/types';
import React from 'react'

type Props = {
  seo: Seo
}

export default function Page<NextPage>(
  // {seo}: Props
) {
  return (
    // <Layout {...seo}>
      <PostForm/>
    // </Layout>
  )
}

// export const getStaticProps: GetStaticProps = async ({locale}) => {
//   return {
//     props: {
//       seo: seo.add,
//     },
//   }
// }
