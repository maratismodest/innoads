'use client';
import { getCurrencySymbol } from '@/components/Price/utils';
import SelectHeadlessUi from '@/components/SelectHeadlessUi';
import useApp from '@/hooks/useApp';
import useToast from '@/hooks/useToast';
import ImagesModuleInput from '@/modules/PostModule/ImagesModule/ImagesModuleInput';
import ImagesModulePreview from '@/modules/PostModule/ImagesModule/ImagesModulePreview';
import imageHandler from '@/modules/PostModule/ImagesModule/utils';
import buttonStyles from '@/styles/buttonStyles';
import inputStyles from '@/styles/inputStyles';
import { EditPostDTO } from '@/types';
import updatePostPrisma from '@/utils/api/prisma/updatePost';
import { messages } from '@/utils/messages';
import { Field, Label } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Post } from '@prisma/client';
import clsx from 'clsx';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { defaultValues, IFormInput, schema } from '../yup';

interface PostModuleProps {
  onSubmitOptional?: () => Promise<void>;
  item: Post;
}

export default function EditPostModule({
  onSubmitOptional = async () => undefined,
  item,
}: PostModuleProps) {
  const { categories } = useApp();
  const { toast } = useToast();
  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
      ...item,
      images: item.images.split('||'),
      categoryId:
        categories.find(category => category.value === item.categoryId)?.value ||
        categories[0].value,
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

  const images = useWatch({ name: 'images', control }) as string[];

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      setLoading(true);
      const editPostDto: EditPostDTO = {
        slug: item.slug,
        userId: item.userId,
        id: item.id,
        categoryId: data.categoryId,
        price: data.price,
        title: data.title,
        body: data.body,
        preview: images[0],
        images: images.join('||'),
        published: item.published,
      };
      // await postTelegramNew(editPostDto, user, categories);
      // if (data.post) {
      const post = await updatePostPrisma(editPostDto);
      console.log('post', post);
      // }
      reset();
      toast('Объявление изменено!');
      await onSubmitOptional();
    } catch (e) {
      console.log(e);
      toast(messages.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form gap-2">
        <h1>Новое объявление</h1>
        <Field>
          <Label>Выберите категорию</Label>
          <SelectHeadlessUi options={categories} name="categoryId" />
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
          <textarea rows={5} cols={5} {...register('body')} name="body" className="w-full" />
          <span className="error">{errors.body?.message}</span>
        </div>

        <ImagesModuleInput
          images={images}
          imageHandler={files => imageHandler(files, images, methods, setLoading)}
          methods={methods}
        />
        <ImagesModulePreview images={images} setImages={images => setValue('images', images)} />

        <div className="hidden">
          <input type="checkbox" {...register('agreement')} name="agreement" id="agreement" />
          <label htmlFor="agreement">
            &nbsp;<span>Соглашаюсь с</span>&nbsp;
            <a href={`${process.env.NEXT_PUBLIC_APP_URL}/blog/rules`} className="!underline">
              правилами и условиями
            </a>
          </label>
          <span className="error block">{errors.agreement?.message}</span>
        </div>

        <div className="hidden">
          <input type="checkbox" {...register('post')} name="post" id="post" />
          <label htmlFor="post"> Автоматически подать на сайт</label>
        </div>

        <button
          className={clsx(buttonStyles({ size: 'medium' }), 'mt-6 w-full')}
          type="submit"
          disabled={loading || categories.length === 0}
        >
          Редактировать
        </button>
      </form>
    </FormProvider>
  );
}
