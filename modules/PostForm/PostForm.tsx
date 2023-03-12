import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import {useAuth} from '@/hooks/useAuth'
import {CreatePostDTO, EditPostDTO, PostDTO} from '@/types/PostDTO'
import client from "@/utils/api/createRequest";
import postAd from "@/utils/api/postPost";
import {updateAd} from '@/utils/api/updatePost'
import {Routes} from '@/utils/routes'
import {AxiosError} from 'axios'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import slug from 'slug'

import PostFormImages from './PostFormImages'
import {messages, postDefaultValues, PostFormValues} from './utils'

export interface PostFormProps {
  defaultValues?: PostFormValues
  post?: PostDTO
}

export type FormValues = {
  title: HTMLInputElement,
  body: HTMLInputElement,
  price: HTMLInputElement,
  categoryId: HTMLSelectElement
}

const PostForm = ({defaultValues = postDefaultValues, post}: PostFormProps) => {
  const [images, setImages] = useState<string[]>(() => post ? post.images.split('||') : [])
  const router = useRouter()
  const {t} = useTranslation()

  const {user} = useAuth()
  const [sending, setSending] = useState(false)

  console.log('client.defaults.headers.common in post',client.defaults.headers.common)

  useEffect(() => {
    if (!user) {
      router.push(Routes.profile)
      return
    }
  }, [])

  if (!user) {
    return null
  }

  const handleCreate = async (formData: CreatePostDTO) => {
    try {
      setSending(true)
      await postAd(formData)
      alert('Ваше объявление создано!')
      return router.push(Routes.profile)
    } catch (e) {
      console.log(e)
      if (e instanceof AxiosError) {
        return alert(e.response?.data)
      }
      return
    } finally {
      setSending(false)
    }
  }

  const handleEdit = async (formData: EditPostDTO) => {
    try {
      setSending(true)
      await updateAd(formData)
      alert(messages.postUpdated)
      return router.push(Routes.profile)
    } catch (e) {
      console.log(e)
      alert(messages.somethingWentWrong)
      return
    } finally {
      setSending(false)
    }
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement & FormValues> = async (event) => {
    event.preventDefault()

    if (images.length === 0) {
      return
    }

    const {title, body, price, categoryId} = event.currentTarget

    const data = {
      title: title.value.trim(),
      body: body.value.trim(),
      price: Number(price.value),
      categoryId: Number(categoryId.value),
    }

    if (post) {
      const editPostDto: EditPostDTO = {
        id: post.id,
        categoryId: data.categoryId,
        price: data.price,
        title: data.title,
        body: data.body,
        preview: images[0],
        images: images.join('||'),
        userId: user.id,
        slug: post.slug,
      }
      await handleEdit(editPostDto)
      return
    }

    const createPostDto: CreatePostDTO = {
      categoryId: data.categoryId,
      price: data.price,
      title: data.title,
      body: data.body,
      preview: images[0],
      images: images.join('||'),
      slug: slug(data.title) + '-' + Math.floor(Math.random() * 100),
      userId: user.id,
    }
    await handleCreate(createPostDto)
    return
  }

  return (
    <form
      onSubmit={onSubmit}
      className='form'
    >
      <h1>{t('addPost')}</h1>
      <Select
        required={true}
        name='categoryId'
        defaultValue={defaultValues.categoryId}
        data-testid='categoryId'
      />
      <Input
        required={true}
        min={1}
        type='number'
        placeholder={t('price') as string}
        name='price'
        defaultValue={defaultValues.price}
        data-testid='price'
      />
      <Input
        type='text'
        placeholder={t('header') as string}
        required={true}
        minLength={5}
        name='title'
        defaultValue={defaultValues.title}
        data-testid='title'
      />
      <textarea
        rows={5}
        cols={5}
        placeholder={t('description') as string}
        required={true}
        minLength={10}
        maxLength={800}
        className='my-4 rounded p-4'
        name='body'
        defaultValue={defaultValues.body}
        data-testid='description'
      />

      <PostFormImages
        images={images}
        setImages={setImages}
      />

      <Button
        type='submit'
        disabled={sending}
      >
        {post ? t('editAd') : t('addAd')}
      </Button>
    </form>
  )
}

export default PostForm
