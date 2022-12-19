import axios from 'axios'
import cn from 'classnames'

import Button from 'components/Button/Button'
import ErrorBlock from 'components/ErrorBlock/ErrorBlock'
import GoToProfile from 'components/GoToProfile/GoToProfile'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'
import MainLayout from 'components/Layout/Layout'
import Modal from 'components/Modal/Modal'
import Spinner from 'components/Spinner/Spinner'
import {useAuth} from 'hooks/useAuth'
import {HTMLInputEvent, PostInterface} from 'interfaces'
import type {GetServerSideProps} from 'next'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import {useRouter} from 'next/router'
import React, {useRef, useState} from 'react'
import {isDesktop} from 'react-device-detect'
import {useForm} from 'react-hook-form'

import classes from 'styles/classes.module.scss'
import selectStyles from 'styles/select.module.scss'
import putPost from "utils/api/putPost";
import {ACCEPTED_IMAGE_FORMAT, defaultValues, FormValues, messages, NO_IMAGE, Routes, titles} from 'utils/constants'
import {handleDeleteImage} from 'utils/handleDeleteImage'
import handleImageUpload from 'utils/handleImageUpload'
import {handlePostImage} from 'utils/handlePostImage'
import hasCurseWords from "utils/hasCurseWords";
import {MoveImage, moveImage} from 'utils/moveImage'
import {options} from 'utils/options'

export default function Edit({post}: { post: PostInterface }) {
  const {t} = useTranslation()
  const ref = useRef<HTMLInputElement>(null)
  const {categoryId, id, title, body, price} = post
  const router = useRouter()
  const {user} = useAuth()
  const [images, setImages] = useState<string[]>(() => post.images.split('||'))
  const [error, setError] = useState<string | undefined>()
  const editValues: FormValues = {
    ...defaultValues, categoryId: options.find((x) => x.value === categoryId)?.value || 1, body, title, price,
  }
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({defaultValues: editValues})
  const [loading, setLoading] = useState(false)

  if (!user || !user.username) {
    return <GoToProfile/>
  }

  const onSubmit = async (data: FormValues) => {
    if (images.length === 0) {
      return setError(messages.noImages)
    }

    if (hasCurseWords(data)) {
      return alert(messages.forbiddenWords)
    }

    const {title, body, price, categoryId} = data

    const formData = {
      ...post,
      categoryId,
      price: Number(price),
      title,
      body,
      images: images.join('||'),
      preview: images[0],
    }

    try {
      setLoading(true)
      await putPost(formData)
      alert(messages.postUpdated)
      return router.push(Routes.profile)
    } catch (e) {
      console.log(e)
      alert(messages.somethingWentWrong)
    } finally {
      setLoading(false)
    }
  }

  const getCompressedImagesLinks = async (imagesFromInput: FileList) => {
    for (let i = 0; i < imagesFromInput.length; i++) {
      const initialImage: File = imagesFromInput[i]
      const resizedImage = await handleImageUpload(initialImage)
      if (resizedImage) {
        const formData = new FormData()
        formData.append('image', resizedImage, `${Date.now()}.jpg`)
        const {status, value} = await handlePostImage(formData)
        if (status === 'ok') {
          setImages((prevState: string[]) => [...prevState, value])
          setError(undefined)
        }
      }
    }
  }

  const imageHandler = async (e: HTMLInputEvent) => {
    if (e.target.files) {
      const imagesFromInput: FileList = e.target.files
      const length = imagesFromInput.length + images.length
      if (length > 4) {
        return setError(messages.manyImages)
      }
      setLoading(true)
      await getCompressedImagesLinks(imagesFromInput)
      setLoading(false)
    }
  }

  const deleteImage = async (current: string) => {
    const res = images.filter((image) => image !== current)
    setImages(res)
    return await handleDeleteImage(current)
  }

  return (
    <>
      <Modal visible={loading}>
        <Spinner/>
      </Modal>
      <MainLayout title={titles.edit}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <h1 className={classes.title}>Новое объявление</h1>
          <select
            className={cn(selectStyles.select, 'select-css')}
            {...register('categoryId', {required: true})}
          >
            {options.map(({value, label}) => <option key={value} value={value}>{t(label)}</option>)}
          </select>
          <ErrorBlock name={'categoryId'} errors={errors}/>
          <Input
            type='number'
            placeholder={t('price') as string}
            register={register}
            required={true}
            name='price'
          />
          <ErrorBlock name={'price'} errors={errors}/>
          <Input
            type='text'
            placeholder={t('header') as string}
            register={register}
            required={true}
            name='title'
          />
          <ErrorBlock name={'title'} errors={errors}/>
          <textarea
            rows={5}
            cols={5}
            placeholder={t('description') as string}
            {...register('body', {required: true})}
            className={classes.textArea}
          />
          <ErrorBlock name={'body'} errors={errors}/>
          <div>
            <div>
              <h4>{t('addPhoto')}</h4>
              <div
                className={cn({
                  [classes.image]: isDesktop,
                  [classes.imageMobile]: !isDesktop,
                })}
                onClick={() => {
                  if (ref.current) {
                    ref.current.click()
                  }
                }}
              >
                <Image
                  alt='image'
                  src={NO_IMAGE}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            <Input
              id='upload'
              type='file'
              onChange={imageHandler}
              hidden
              multiple
              accept={ACCEPTED_IMAGE_FORMAT}
              ref={ref}
            />
          </div>
          <h4>{t('preview')}</h4>
          <ul
            className={cn({
              [classes.images]: isDesktop,
              [classes.imagesMobile]: !isDesktop,
            })}
          >
            {images.map((image: string, index: number) => {
              return (
                <li
                  key={image}
                  className={cn({
                    [classes.image]: isDesktop,
                    [classes.imageMobile]: !isDesktop,
                  })}
                >
                  <Image
                    alt={image}
                    src={image}
                    style={{
                      objectFit: 'cover',
                    }}
                    fill={true}
                    placeholder='blur'
                    blurDataURL={NO_IMAGE}
                  />
                  <Icon
                    className={classes.leftArrow}
                    onClick={(e: MouseEvent) => {
                      moveImage(
                        e,
                        images,
                        index,
                        MoveImage.left,
                        setImages,
                      )
                    }}
                  >
                    &larr;
                  </Icon>
                  <Icon
                    className={classes.rightArrow}
                    onClick={(e: MouseEvent) => {
                      moveImage(
                        e,
                        images,
                        index,
                        MoveImage.right,
                        setImages,
                      )
                    }}
                  >
                    &rarr;
                  </Icon>
                  <Icon
                    className={classes.deleteIcon}
                    onClick={async () => {
                      await deleteImage(image)
                    }}
                  >
                    &times;
                  </Icon>
                </li>
              )
            })}
            {loading && (
              <li
                className={cn({
                  [classes.image]: isDesktop,
                  [classes.imageMobile]: !isDesktop,
                })}
              >
                <p className={classes.loadingImage}>
                  Загружаем изображение
                </p>
              </li>
            )}
          </ul>
          <span style={{color: "red"}}>{error}</span>
          <Button
            className={classes.mt40}
            type='submit'
            disabled={loading}
          >Сохранить изменения
          </Button>
        </form>
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
                                                               locale,
                                                               query,
                                                             }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${query.slug}`,
  )
  if (!response) {
    return {
      notFound: true,
    }
  }
  const snapshot = response.data
  return {
    props: {
      post: snapshot,
      slug: snapshot.slug,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
