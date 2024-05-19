'use client';
import { ACCEPTED_IMAGE_FORMAT, compressionOptions, handlePostImage } from '@/app/bot/_utils';
import PostImages from '@/app/bot/PostImages';
import SelectNew from '@/app/bot/SelectNew';
import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import { useTelegram } from '@/hooks/useTelegram';
import buttonStyles from '@/styles/buttonStyles';
import inputStyles from '@/styles/inputStyles';
import { CreatePostDTO } from '@/types';
import postAd from '@/utils/api/prisma/postPost';
import postTelegramNew from '@/utils/api/prisma/postTelegramNew';
import { NO_IMAGE } from '@/utils/constants';
import slug from '@/utils/slug';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { IFormInput, schema } from './yup';

export default function AddPostPage() {
  const { categories } = useApp();
  const { user } = useAuth();
  const { tg } = useTelegram();
  const ref = useRef<HTMLInputElement>(null);

  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      images: [],
      agreement: true,
      post: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
  } = methods;

  const [loading, setLoading] = useState(false);

  const images: string[] = useWatch({ name: 'images', control });

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Закрыть окно',
    });
  }, [tg.MainButton]);

  const onSendData = useCallback(() => {
    const data = {
      type: 'success',
      text: 'Объявление создано!',
    };
    tg.sendData(JSON.stringify(data));
  }, [tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  if (!user) {
    return null;
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      setLoading(true);
      const createPostDto: CreatePostDTO = {
        categoryId: data.categoryId,
        price: data.price,
        title: data.title,
        body: data.body,
        preview: images[0],
        images: images.join('||'),
        slug: slug(data.title) + '-' + Math.floor(Math.random() * 100),
        userId: user.id,
        published: data.post ? true : false,
      };
      await postTelegramNew(createPostDto, user, categories);
      if (data.post) {
        const post = await postAd(createPostDto);
        console.log('post', post);
      }
      reset();
      tg.MainButton.show();
      alert('Объявление создано!');
    } catch (e) {
      console.log(e);
      alert('Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  const imageHandler = async (files: FileList | null) => {
    try {
      setLoading(true);
      if (files && files.length > 0) {
        const image = files[0];
        const resizedImage = await imageCompression(image, compressionOptions);
        if (resizedImage) {
          const formData = new FormData();
          formData.append('image', resizedImage, `${Date.now()}.jpg`);
          const link: any = await handlePostImage(formData);
          const res: string[] = images ? [...images, link] : [link];
          setValue('images', res);
        }
        await trigger(['images']);
      }
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="form gap-2">
          <h1>Новое объявление</h1>
          <div>
            <label htmlFor="categoryId">Выберите категорию</label>
            <SelectNew options={categories} name="categoryId" />
            <span className="text-red">{errors.categoryId?.message}</span>
          </div>

          <div>
            <label>Цена</label>
            <input
              type="number"
              {...register('price')}
              className={clsx(inputStyles(), 'block w-full')}
            />
            <span className="text-red">{errors.price?.message}</span>
          </div>

          <div>
            <label htmlFor="title">Заголовок</label>
            <input {...register('title')} className={clsx(inputStyles(), 'block w-full')} />
            <span className="text-red">{errors.title?.message}</span>
          </div>

          <div>
            <label htmlFor="body">Описание</label>
            <textarea rows={5} cols={5} {...register('body')} name="body" className="w-full" />
            <span className="text-red">{errors.body?.message}</span>
          </div>

          <div>
            <label>Добавить фото (по одному, но не более 4)</label>
            <div
              className={clsx(
                'relative mb-2 aspect-square w-[48%] hover:shadow lg:mr-2',
                images && images.length < 4 ? 'cursor-pointer hover:shadow-xl' : 'cursor-no-drop'
              )}
              onClick={() => {
                if (images.length < 4) {
                  ref.current && ref.current.click();
                } else {
                  alert('Не более 4 фото!');
                }
              }}
            >
              <Image
                alt="image"
                src={NO_IMAGE}
                fill={true}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <input
              type="file"
              {...register('images')}
              name="images"
              onChange={async event => await imageHandler(event.target.files)}
              hidden
              ref={ref}
              multiple={false}
              accept={ACCEPTED_IMAGE_FORMAT}
            />
            <span className="text-red">{errors.images?.message}</span>
          </div>

          <PostImages
            images={images}
            setImages={(images: string[]) => setValue('images', images)}
          />

          <div>
            <input type="checkbox" {...register('agreement')} name="agreement" id="agreement" />
            <label htmlFor="agreement">
              &nbsp;<span>Соглашаюсь с</span>&nbsp;
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/blog/rules`} className="!underline">
                правилами и условиями
              </a>
            </label>
            <span className="block text-red">{errors.agreement?.message}</span>
          </div>

          <div>
            <input type="checkbox" {...register('post')} name="post" id="post" />
            <label htmlFor="post"> Автоматически подать на сайт</label>
          </div>

          <button
            className={clsx(buttonStyles(), 'mt-6 w-full')}
            type="submit"
            disabled={loading || categories.length === 0}
          >
            Опубликовать
          </button>
        </form>
      </FormProvider>
    </>
  );
}
