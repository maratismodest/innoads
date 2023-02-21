import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'
import React, {useEffect, useState} from 'react'
import {AxiosError} from 'axios'
import {useAuth} from 'hooks/useAuth'
import {useModal} from 'hooks/useModal'
import slug from 'slug'
import {EditPostInterface, PostInterface} from 'types'
import postPost from 'utils/api/postPost'
import postTelegram from 'utils/api/postTelegram'
import updatePost from 'utils/api/updatePost'
import hasCurseWords from 'utils/curseWords'
import {Routes} from 'utils/routes'

import Button from 'components/Button'
import Input from 'components/Input'
import Select from 'components/Select'
import Spinner from 'components/Spinner'

import PostFormImages from './PostFormImages'
import {messages, postDefaultValues, PostFormValues} from './utils'

export interface PostFormProps {
  defaultValues?: PostFormValues
  post?: PostInterface
}

export type FormValues = {
  title: HTMLInputElement,
  body: HTMLInputElement,
  price: HTMLInputElement,
  categoryId: HTMLSelectElement
}

const PostForm = ({defaultValues = postDefaultValues, post}: PostFormProps) => {
  const {setModal, setModalValue} = useModal()
  const [images, setImages] = useState<string[]>(() => post ? post.images.split('||') : [])
  const router = useRouter()
  const {t} = useTranslation()

  const {user} = useAuth()
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push(Routes.profile)
      return
    }
  }, [])

  useEffect(() => {
    if (sending) {
      setModalValue(<Spinner/>)
      setModal(true)
    } else {
      setModal(false)
    }

    return () => {
      setModalValue(null)
      setModal(false)
    }

  }, [sending])

  if (!user) {
    return null
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

    if (hasCurseWords(data)) {
      return alert(messages.forbiddenWords)
    }

    if (post) {

      const formData: EditPostInterface = {
        id: post.id,
        categoryId: data.categoryId,
        price: data.price,
        title: data.title,
        body: data.body.length > 800 ? data.body.substring(0, 800) + '...' : data.body,
        preview: images[0],
        images: images.join('||'),
        userId: post.userId,
        slug: post.slug,
        createdAt: post.createdAt,
      }
      try {
        setSending(true)
        await updatePost(formData)
        alert(messages.postUpdated)
        return router.push(Routes.profile)
      } catch (e) {
        console.log(e)
        alert(messages.somethingWentWrong)
      } finally {
        setSending(false)
      }

    }

    const formData = {
      title: data.title,
      body: data.body.length > 800 ? data.body.substring(0, 800) + '...' : data.body,
      price: data.price,
      preview: images[0],
      images: images.join('||'),
      slug: slug(data.title) + '-' + Math.floor(Math.random() * 100),
      telegram: user.username,
      userId: user.id,
      categoryId: data.categoryId,
    }

    try {
      setSending(true)
      await postPost(formData)
      await postTelegram(formData)
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
      />
      <Input
        required={true}
        min={1}
        type='number'
        placeholder={t('price') as string}
        name='price'
        defaultValue={defaultValues.price}
      />
      <Input
        type='text'
        placeholder={t('header') as string}
        required={true}
        minLength={5}
        name='title'
        defaultValue={defaultValues.title}
      />
      <textarea
        rows={5}
        cols={5}
        placeholder={t('description') as string}
        required={true}
        minLength={10}
        className='my-4 rounded p-4'
        name='body'
        defaultValue={defaultValues.body}
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
