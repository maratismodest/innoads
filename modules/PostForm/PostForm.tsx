import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import cn from 'classnames'
import { useAuth } from 'hooks/useAuth'
import slug from 'slug'
import postPost from 'utils/api/postPost'
import postTelegram from 'utils/api/postTelegram'
import { FormValues, messages } from 'utils/constants'
import hasCurseWords from 'utils/curseWords'
import { options } from 'utils/options'
import { Routes } from 'utils/routes'

import Button from 'components/Button/Button'
import ErrorBlock from 'components/ErrorBlock/ErrorBlock'
import GoToProfile from 'components/GoToProfile/GoToProfile'
import Input from 'components/Input/Input'
import Modal from 'components/Modal/Modal'
import Spinner from 'components/Spinner/Spinner'

import PostFormImages from './PostFormImages'

import classes from 'styles/classes.module.scss'
import selectStyles from 'styles/select.module.scss'

interface PostFormProps {
    defaultValues: FormValues
}

const PostForm = ({ defaultValues }: PostFormProps) => {
    const [images, setImages] = useState<string[]>([])
    const router = useRouter()
    const { t } = useTranslation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues })

    const { user } = useAuth()
    const [sending, setSending] = useState(false)

    if (!user) {
        return <GoToProfile />
    }

    const onSubmit = async (data: FormValues) => {

        if (images.length === 0) {
            return
        }

        if (hasCurseWords(data)) {
            return alert(messages.forbiddenWords)
        }

        const { title, body, price, categoryId } = data

        const formData = {
            title,
            body: body.length > 800 ? body.substring(0, 800) + '...' : body,
            price: Number(price),
            preview: images[0],
            images: images.join('||'),
            slug: slug(title) + '-' + Math.floor(Math.random() * 100),
            telegram: user?.username,
            userId: user?.id,
            categoryId: Number(categoryId),
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
        <>
            <Modal visible={sending}>
                <Spinner />
            </Modal>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
            >
                <h1>{t('addPost')}</h1>
                <select
                    className={cn(selectStyles.select, 'select-css')}
                    {...register('categoryId', { required: true })}
                >
                    {options.map(({ value, label }) => <option key={value}
                                                               value={value}>{t(label)}</option>)}
                </select>
                <ErrorBlock name={'categoryId'} errors={errors} />
                <Input
                    type='number'
                    placeholder={t('price') as string}
                    register={register}
                    required={true}
                    name='price'
                />
                <ErrorBlock name={'price'} errors={errors} />
                <Input
                    type='text'
                    placeholder={t('header') as string}
                    register={register}
                    required={true}
                    name='title'
                />
                <ErrorBlock name={'title'} errors={errors} />
                <textarea
                    rows={5}
                    cols={5}
                    placeholder={t('description') as string}
                    {...register('body', { required: true })}
                    className={classes.textArea}
                />
                <ErrorBlock name={'body'} errors={errors} />

                <PostFormImages
                    images={images}
                    setImages={setImages}
                />

                <Button
                    className={classes.mt40}
                    type='submit'
                    disabled={sending}
                >
                    {t('addAd')}
                </Button>
            </form>
        </>
    )
}

export default PostForm
