import { Checkbox, Field, Label } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import { defaultPostsValues, IPostSearchForm, postsSchema } from '@/pages-lib/admin/yup';
import SvgIcon from '@/public/svg/check.svg';
import buttonStyles from '@/styles/buttonStyles';

type Props = {
  // posts: Post[];
};

const validateCheckboxes = (published: boolean, unpublished: boolean) => {
  if (published && !unpublished) return true;
  if (!published && unpublished) return false;
  return undefined;
};

const AdminPosts = ({}: Props) => {
  const t = useTranslations();

  const { handleSubmit, register, control, watch, setValue, reset } = useForm<IPostSearchForm>({
    defaultValues: defaultPostsValues,
    resolver: yupResolver(postsSchema),
  });

  const published = watch('published');
  const unpublished = watch('unpublished');

  const onSubmit = async () => {
    await postsRefetch();
  };

  const {
    posts = [],
    postsLoading,
    postsError,
    postsRefetch,
  } = usePostsQuery({
    size: 2000,
    published: validateCheckboxes(published, unpublished),
  });

  if (postsLoading) {
    return <Spinner />;
  }

  if (!posts || postsError) {
    return <h1>Что пошло не так при получении объявлений</h1>;
  }
  return (
    <>
      <h2>Количество: {posts.length}</h2>

      <form
        className="mb-3 flex items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
      >
        <Field className="flex items-center gap-1 hover:cursor-pointer">
          <Controller
            control={control}
            name="published"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                onChange={value => {
                  setValue('published', value);
                }}
                className="group block size-4 rounded border bg-gray data-[checked]:bg-white"
              >
                {value && <SvgIcon />}
              </Checkbox>
            )}
          />

          <Label>{t('показать только активные')}</Label>
        </Field>
        <Field className="flex items-center gap-1 hover:cursor-pointer">
          <Controller
            control={control}
            name="unpublished"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                onChange={value => {
                  setValue('unpublished', value);
                }}
                className="group block size-4 rounded border bg-gray data-[checked]:bg-white"
              >
                {value && <SvgIcon />}
              </Checkbox>
            )}
          />
          <Label>{t('показать только активные')}</Label>
        </Field>
        <div className="ml-auto">
          <button
            className={clsx(buttonStyles({ size: 'medium', variant: 'secondary' }))}
            type="reset"
          >
            Сбросить
          </button>
          <button className={clsx(buttonStyles({ size: 'medium' }))} type="submit">
            {t('Поиск')}
          </button>
        </div>
      </form>

      <Posts posts={posts} edit={true} />
    </>
  );
};

export default AdminPosts;
