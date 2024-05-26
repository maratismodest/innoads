'use client';
import { getCurrencySymbol } from '@/components/Price/utils';
import SelectHeadlessUi from '@/components/SelectHeadlessUi';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import useTelegram from '@/hooks/useTelegram';
import ImagesModuleInput from '@/modules/PostModule/ImagesModule/ImagesModuleInput';
import ImagesModulePreview from '@/modules/PostModule/ImagesModule/ImagesModulePreview';
import imageHandler from '@/modules/PostModule/ImagesModule/utils';
import buttonStyles from '@/styles/buttonStyles';
import inputStyles from '@/styles/inputStyles';
import { CreatePostDTO } from '@/types';
import postMessage from '@/utils/api/prisma/postMessage';
import postAd from '@/utils/api/prisma/postPost';
import postTelegram, { TelegramResponseProps } from '@/utils/api/telegram/postTelegram';
import slug from '@/utils/slug';
import { Field, Label } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { defaultValues, IFormInput, schema } from '../yup';

interface PostModuleProps {
  onSubmitOptional?: () => Promise<void> | void;
}

export default function CreatePostModule({
  onSubmitOptional = async () => undefined,
}: PostModuleProps) {
  const isTelegram = localStorage.getItem('telegram');
  const { categories } = useApp();
  const { user, loading: userLoading } = useAuth();

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
    return <div>Ваш аккаут заблокирован!</div>;
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
        published: Boolean(data.post),
      };

      const post = await postAd(createPostDto);

      const { result }: TelegramResponseProps = (await postTelegram(
        createPostDto,
        user,
        categories
      )) as TelegramResponseProps;
      const telegram = await postMessage({ id: result[0]?.message_id, postId: post.id });
      console.log('_telegram', telegram);
      reset();
      alert('Объявление создано!');
      await onSubmitOptional();
    } catch (e) {
      console.log(e);
      alert('Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form gap-2">
        <h1>Новое объявление{isTelegram === '1' ? '.' : ''}</h1>
        <Field>
          <Label>Выберите категорию</Label>
          <SelectHeadlessUi options={categories} name="categoryId" />
          <span className="text-red">{errors.categoryId?.message}</span>
        </Field>

        <div>
          <label>Цена ({getCurrencySymbol()})</label>
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

        <ImagesModuleInput
          images={images}
          imageHandler={files => imageHandler(files, images, methods, setLoading)}
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
          <span className="block text-red">{errors.agreement?.message}</span>
        </div>

        <div className="sr-only">
          <input type="checkbox" {...register('post')} name="post" id="post" />
          <label htmlFor="post"> Автоматически подать на сайт</label>
        </div>

        <button
          className={clsx(buttonStyles({ size: 'medium' }), 'mt-6 w-full')}
          type="submit"
          disabled={loading || categories.length === 0}
        >
          Опубликовать
        </button>
      </form>
    </FormProvider>
  );
}
