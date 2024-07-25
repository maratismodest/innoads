'use client';
import { Field, Label } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { getCurrencySymbol } from '@/components/Price/utils';
import Select from '@/components/ui/Select';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import ImagesModuleInput from '@/modules/PostModule/ImagesModule/ImagesModuleInput';
import ImagesModulePreview from '@/modules/PostModule/ImagesModule/ImagesModulePreview';
import imageHandler from '@/modules/PostModule/ImagesModule/utils';
import buttonStyles from '@/styles/buttonStyles';
import inputStyles from '@/styles/inputStyles';
import type { CreatePostDTO } from '@/types';
import postLog from '@/utils/api/prisma/postLog';
import postMessage from '@/utils/api/prisma/postMessage';
import postAd from '@/utils/api/prisma/postPost';
import postTelegram, { TelegramResponseProps } from '@/utils/api/telegram/postTelegram';
import slug from '@/utils/slug';

import { defaultValues, IFormInput, schema } from '../yup';

interface PostModuleProps {
  onSubmitOptional?: () => Promise<void> | void;
}

export function CreatePostModule({ onSubmitOptional = async () => undefined }: PostModuleProps) {
  const t = useTranslations();
  const { categories } = useApp();
  const { user, loading: userLoading } = useAuth();
  const { toast } = useToast();

  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
    getValues,
  } = methods;

  console.log('errors', errors);

  const [loading, setLoading] = useState(false);

  const images = useWatch({ name: 'images', control }) as string[];

  if (userLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div>
        <h1>Вы не авторизованы!</h1>
        <p>Попробуйте перезайти на сайте или перезапустить бота</p>
      </div>
    );
  }

  if (user.bans.length > 0) {
    return (
      <div>
        <h1>Ваш аккаут заблокирован!</h1>
        <p>Обратитесь к модератору канала</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      setLoading(true);
      const _title = data.title.trim();
      const createPostDto: CreatePostDTO = {
        categoryId: data.categoryId,
        price: data.price,
        title: _title,
        body: data.body.trim(),
        preview: images[0],
        images: images.join('||'),
        slug: slug(_title) + '-' + Math.floor(Math.random() * 100),
        userId: user.id,
        published: Boolean(data.post),
      };

      const post = await postAd(createPostDto);

      const { result }: TelegramResponseProps = (await postTelegram(
        createPostDto,
        user,
        categories,
      )) as TelegramResponseProps;
      for (const result_item of result) {
        const message = await postMessage({ id: result_item.message_id, postId: post.id });
        console.warn('message', message);
      }
      reset();
      toast(t('Объявление создано'));
      await onSubmitOptional();
    } catch (e) {
      console.error(e);
      // @ts-ignore
      const error = e.message ?? JSON.stringify(data);
      postLog(JSON.stringify(error));
      toast(t('Что-то пошло не так') + ': ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={event => {
          event.preventDefault();
          const values = getValues();
          // Trim the value of the 'title' and 'body' field
          setValue('title', values.title.trim());
          setValue('body', values.body.trim());
          handleSubmit(onSubmit)();
        }}
        className="form gap-2"
      >
        <h1>Новое объявление</h1>
        <Field>
          <Label>Выберите категорию</Label>
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                options={categories}
                value={value}
                // It should be Option
                onChange={(active: any) => onChange(Number(active.value))}
              />
            )}
          />
          <span className="error">{errors.categoryId?.message}</span>
        </Field>

        <div>
          <label>Цена ({getCurrencySymbol()})</label>
          <input
            type="number"
            {...register('price')}
            className={clsx(inputStyles(), 'block w-full')}
          />
          <span className="error">{errors.price?.message}</span>
        </div>

        <div>
          <label htmlFor="title">Заголовок</label>
          <input {...register('title')} className={clsx(inputStyles(), 'block w-full')} />
          <span className="error">{errors.title?.message}</span>
        </div>

        <div>
          <label htmlFor="body">Описание</label>
          <textarea
            rows={5}
            cols={5}
            {...register('body')}
            name="body"
            className="w-full dark:text-black"
          />
          <span className="error">{errors.body?.message}</span>
        </div>

        <ImagesModuleInput
          images={images}
          imageHandler={file => imageHandler(file, images, methods, setLoading)}
          methods={methods}
        />

        <ImagesModulePreview images={images} setImages={images => setValue('images', images)} />

        <div>
          <input type="checkbox" {...register('agreement')} name="agreement" id="agreement" />
          <label htmlFor="agreement">
            &nbsp;<span>Соглашаюсь с</span>&nbsp;
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/blog/rules`}
              className="!underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              правилами и условиями
            </a>
          </label>
          <span className="error block">{errors.agreement?.message}</span>
        </div>

        <div className="sr-only">
          <input type="checkbox" {...register('post')} name="post" id="post" />
          <label htmlFor="post"> Автоматически подать на сайт</label>
        </div>

        <button
          className={clsx(buttonStyles({ size: 'medium' }), 'mx-auto mt-6 w-full md:w-fit')}
          type="submit"
          disabled={loading || categories.length === 0}
          // disabled={true}
        >
          Опубликовать
        </button>
      </form>
    </FormProvider>
  );
}
