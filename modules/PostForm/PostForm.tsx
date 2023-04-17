import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Spinner from "@/components/ui/Spinner";
import {useAuth} from '@/hooks/useAuth'
import {CreatePostDTO, EditPostDTO, PostDTO} from '@/types/PostDTO'
import postAd from "@/utils/api/postPost";
import postTelegram from "@/utils/api/postTelegram";
import {updateAd} from '@/utils/api/updatePost'
import {categories, CategoryProps} from "@/utils/categories";
import {Routes} from '@/utils/routes'
import {AxiosError} from 'axios'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useForm, Controller, useController} from "react-hook-form";
import slug from 'slug'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import PostFormImages from './PostFormImages'
import {messages, postDefaultValues, PostFormValues} from './utils'

export interface PostFormProps {
  defaultValues?: PostFormValues
  post?: PostDTO
}

const schema = yup.object({
  title: yup.string().required().min(5).max(50),
  body: yup.string().required().min(10).max(800),
  price: yup.number().typeError('Price must be a number').required().min(1, "Too little"),
  categoryId: yup.number().nullable().required("Please select category"),
}).required();
type FormData = yup.InferType<typeof schema>;

const PostForm = ({defaultValues = postDefaultValues, post}: PostFormProps) => {

  const {control, register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const {field: {value: categoryIdValue, onChange: langOnChange, ...restLangField}} = useController({
    name: 'categoryId',
    control
  });
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

  if (!user) {
    return <Spinner/>
  }

  const handleCreate = async (formData: CreatePostDTO) => {
    try {
      setSending(true)
      const res = await postAd(formData)
      await postTelegram({...res, username: user.username})
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

  const onSubmit = async ({title, body, price, categoryId}: FormData) => {
    if (images.length === 0) {
      return
    }

    const data = {
      title: title.trim(),
      body: body.trim(),
      price,
      categoryId,
    }
    console.log('data', data)

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

  console.log(errors)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='form'
      name={post ? t('editAd') : t('addAd')}
    >
      <h1>{t('addPost')}</h1>
      <div>
        <Select
          label={t('chooseCategory')}
          data-testid='categoryId'
          defaultValue={defaultValues?.categoryId}
          value={categoryIdValue ? categories.map(({value, label}) => ({
            value,
            label: t(label)
          })).find(x => x.value === categoryIdValue) : categoryIdValue}
          onChange={(option: CategoryProps) => langOnChange(option ? option.value : option)}
          {...restLangField}
        />
        <span className='text-red'>{errors.categoryId?.message}</span>
      </div>

      <div>
        <Controller
          name="price"
          control={control}
          defaultValue={defaultValues.price}
          render={({field}) => <Input
            type='number'
            label={t('price')}
            data-testid='price'
            {...field}/>}
        />
        <span className='text-red'>{errors.price?.message}</span>
      </div>
      <div>
        <Controller
          name="title"
          control={control}
          defaultValue={defaultValues.title}
          render={({field}) => <Input
            label={t('header')}
            data-testid='title'
            {...field}/>}
        />
        <span className='text-red'>{errors.title?.message}</span>
      </div>
      <div className='grid'>
        <label htmlFor="body">{t('description')}</label>
        <textarea
          id="body"
          {...register('body', {required: true, minLength: 10, maxLength: 800})}
          rows={5}
          cols={5}
          name='body'
          defaultValue={defaultValues.body}
          data-testid='description'
        />
        <span className='text-red'>{errors.body?.message}</span>
      </div>
      <PostFormImages
        images={images}
        setImages={setImages}
      />

      <Button
        type='submit'
        disabled={sending}
        className="mx-auto"
      >
        {post ? t('editAd') : t('addAd')}
      </Button>
    </form>
  )
}

export default PostForm
