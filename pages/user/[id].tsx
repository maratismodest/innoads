import Layout from '@/components/Layout'
import Posts from '@/components/Posts'
import Button from '@/components/ui/Button'
import {GetStaticPath} from '@/types'
import {PostDTO} from "@/types/PostDTO";
import {UserDTO} from "@/types/UserDTO";
import fetchPosts from '@/utils/api/fetchAds'
import fetchUser from '@/utils/api/fetchUser'
import fetchUsers from '@/utils/api/fetchUsers'
import {tgLink} from '@/utils/constants'
import revalidate from '@/utils/revalidate'
import sortByCreatedAt from '@/utils/sortByUpdatedAt'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import {GetStaticPaths, GetStaticProps, NextPage} from 'next/types'
import React from 'react'

type Props = {
  user: UserDTO,
  posts: PostDTO[]
}

const PublicProfile: NextPage<Props> = ({user, posts}) => {
  const {t} = useTranslation()
  return (
    <Layout title={`Пользователь ${user.username}`}
            description={`Пользователь ${user.username} c ${posts.length} объявлениями`}
    >
      <h1>{t('userProfile')}</h1>
      <p>{t('adsCount')}: <span>{posts.length}</span></p>
      <Posts posts={posts} className='mt-10'/>
      <Link href={tgLink + '/' + user.username} passHref className='mt-10 block'>
        <Button>{t('textAuthor')}</Button>
      </Link>
    </Layout>
  )
}

export default PublicProfile

export const getStaticPaths: GetStaticPaths = async ({locales = []}) => {
  const users = await fetchUsers()
  const paths: GetStaticPath[] = users.flatMap(user =>
    locales.map(locale => ({
      params: {id: user.id.toString()},
      locale,
    })))
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({params, locale}) => {
  const userId = Number(params?.id)
  const user = await fetchUser(userId)
  const {content: posts} = await fetchPosts({
    size: 10, userId,
  })
  if (!posts || !user) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      posts: sortByCreatedAt(posts),
      user,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: revalidate,
  }
}
