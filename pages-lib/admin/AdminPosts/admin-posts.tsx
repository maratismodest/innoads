import { Checkbox, Field, Label } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Posts from '@/components/Posts';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import SvgIcon from '@/public/svg/check.svg';
import buttonStyles from '@/styles/buttonStyles';

import { formInputs } from './constants';
import { validateCheckboxes } from './helpers';
import { defaultPostsValues, IPostSearchForm, postsSchema } from './yup';

type Props = {};

const AdminPosts = ({}: Props) => {
  const t = useTranslations();

  const { handleSubmit, register, control, watch, setValue, reset } = useForm<IPostSearchForm>({
    defaultValues: defaultPostsValues,
    resolver: yupResolver(postsSchema),
  });

  const published = watch('published');
  const unpublished = watch('unpublished');

  const { posts, postsLoading, postsError, postsRefetch } = usePostsQuery({
    size: 2000,
    published: validateCheckboxes(published, unpublished),
  });

  const onSubmit = async () => {
    await postsRefetch();
  };

  return (
    <>
      <h2>Количество: {posts?.length}</h2>
      <form
        className="mb-3 flex items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          reset();
          postsRefetch();
        }}
      >
        {formInputs.map(({ name, label, type }) => {
          switch (type) {
            case 'checkbox':
              return (
                <Field key={name} className="flex items-center gap-1 hover:cursor-pointer">
                  <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value}
                        onChange={value => {
                          setValue(name, value);
                        }}
                        className="group block size-4 rounded border bg-gray data-[checked]:bg-white"
                      >
                        {value && <SvgIcon />}
                      </Checkbox>
                    )}
                  />
                  <Label>{t(label)}</Label>
                </Field>
              );
            default:
              return null;
          }
        })}
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

      <Posts posts={posts} edit={true} loading={postsLoading} error={postsError} />
    </>
  );
};

export default AdminPosts;
