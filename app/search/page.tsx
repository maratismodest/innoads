'use client'
import Select from '@/components/ui/Select';
import InfinitePosts from "@/modules/InfinitePosts";
import type {Seo} from "@/types";
import {categories, CategoryProps} from "@/utils/categories";
import {useRouter, useSearchParams} from 'next/navigation'
import React, {useState} from 'react'

type Props = {
  seo: Seo
}

export default function SearchPage<NextPage>() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams?.get('categoryId')
  const [category, setCategory] = useState<CategoryProps>(
    categories.find(category => category.value === Number(categoryId)) || categories[0],
  )

  return (
    <>
      <h1>Поиск</h1>
      <hr/>
      <Select onChange={setCategory} defaultValue={category.value}/>
      <hr/>
      <InfinitePosts initPage={0} initPosts={[]} options={{categoryId: category.value}}/>
    </>
  )
}
