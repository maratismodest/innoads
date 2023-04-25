import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Spinner from "@/components/ui/Spinner";
import {useAuth} from '@/hooks/useAuth'
import {CreatePostDTO, EditPostDTO, PostDTO} from '@/types/PostDTO'
import postAd from "@/utils/api/postPost";
import postTelegram from "@/utils/api/postTelegram";
import updateAd from "@/utils/api/updatePost";
import {categories, CategoryProps} from "@/utils/categories";
import {Routes} from '@/utils/routes'
import {AxiosError} from "axios";
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

interface FormField {
  type: 'select' | 'number' | 'text' | 'textarea',
  value: any,
  label: string
  required: boolean
  options: object
}

interface Form {
  categoryId: FormField,
  price: FormField,
  title: FormField,
  description: FormField,
}

const PostForm = ({defaultValues = postDefaultValues, post}: PostFormProps) => {
  const {t} = useTranslation()
  const [data, setData] = useState<Form>({
    categoryId: {
      type: 'select',
      value: defaultValues?.categoryId,
      label: t('chooseCategory'),
      required: true,
      options: {},
    },
    price: {
      type: 'number',
      value: defaultValues?.price,
      label: t('price'),
      required: true,
      options: {min: 1},
    },
    title: {
      type: 'text',
      value: defaultValues?.title,
      label: t('header'),
      required: true,
      options: {minLength: 5, maxLength: 50},
    },
    description: {
      type: 'textarea',
      value: defaultValues?.body,
      label: t('description'),
      required: true,
      options: {minLength: 10, maxLength: 800},
    }
  })

  const [images, setImages] = useState<string[]>(() => post ? post.images.split('||') : [])
  const router = useRouter()

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

  const handleChange = (name: keyof Form, value: any) =>
    setData(prev => ({...prev, [name]: {...prev[name], value}}))

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      return
    }

    const form = {
      title: data.title.value.trim(),
      body: data.description.value.trim(),
      price: data.price.value,
      categoryId: data.categoryId.value,
    }

    if (post) {
      const editPostDto: EditPostDTO = {
        id: post.id,
        categoryId: form.categoryId,
        price: form.price,
        title: form.title,
        body: form.body,
        preview: images[0],
        images: images.join('||'),
        userId: user.id,
        slug: post.slug,
      }
      await handleEdit(editPostDto)
      return
    }

    const createPostDto: CreatePostDTO = {
      categoryId: form.categoryId,
      price: form.price,
      title: form.title,
      body: form.body,
      preview: images[0],
      images: images.join('||'),
      slug: slug(form.title) + '-' + Math.floor(Math.random() * 100),
      userId: user.id,
    }
    await handleCreate(createPostDto)
    return

  }

  return (
    <form
      onSubmit={onSubmit}
      className='form'
      name={post ? t('editAd') : t('addAd')}
    >
      <h1>{t('addPost')}</h1>
      {Object.entries(data).map(([name, {label, value, type, required, options}]) => {
        switch (type) {
          case "select": {
            return (
              <Select
                label={label}
                data-testid={name}
                value={value ? categories.map(({value, label}) => ({
                  value,
                  label: t(label)
                })).find(x => x.value === value) : value}
                onChange={(option: CategoryProps) => {
                  handleChange(name as keyof Form, Number(option.value))
                }}
                required={required}
              />
            )
          }
          case "number":
            return (
              <Input
                type='number'
                label={label}
                data-testid={name}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(name as keyof Form, Number(event.target.value))
                }}
                required={required}
                {...options}
              />
            )
          case "text":
            return (
              <Input
                type='text'
                label={label}
                data-testid={name}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(name as keyof Form, event.target.value)
                }}
                required={required}
                {...options}
              />
            )
          case "textarea":
            return (
              <div className='grid'>
                <label htmlFor={name}>{label}</label>
                <textarea rows={5} cols={5} name={name} data-testid={name} value={value}
                          required={required} {...options}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(name as keyof Form, event.target.value)
                          }}/>
              </div>
            )
          default:
            return null
        }
      })}
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


// const schema = yup.object({
//   title: yup.string().required(t('required')).min(5, ({min}) => t('min', {min})).max(50, ({max}) => t('max', {max})),
//   body: yup.string().required(t('required')).min(10, ({min}) => t('min', {min})).max(800, ({max}) => t('max', {max})),
//   price: yup.number().typeError('Price must be a number').required(t('required')).min(1, ({min}) => t('min', {min})),
//   categoryId: yup.number().required(t('required')),
// });
