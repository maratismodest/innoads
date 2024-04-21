'use client';

import Arrow from '@/components/Arrow';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import NewSelect from '@/components/ui/NewSelect';
import Select from '@/components/ui/Select';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import inputValidation from '@/modules/PostForm/inputValidation';
import useAuth from '@/hooks/useAuth';
import useValidation from '@/hooks/useValidation';
import { CreatePostDTO, EditPostDTO, PostDTO } from '@/types';
import { Option } from '@/types/global';
import postAd from '@/utils/api/postPost';
import postTelegram from '@/utils/api/postTelegram';
import updateAd from '@/utils/api/updatePost';
// import { categories, CategoryProps } from '@/utils/categories';
import { routes } from '@/utils/constants';
import slug from '@/utils/slug';
import { Listbox } from '@headlessui/react';
import { AxiosError } from 'axios';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';

import PostFormImages from './PostFormImages';
import { messages, postDefaultValues, PostFormValues } from './utils';

export interface PostFormProps {
  defaultValues?: PostFormValues;
  post?: PostDTO;
}

export type PostOptions = Record<string, string | number | boolean>;

interface FormField {
  type: 'select' | 'number' | 'text' | 'textarea';
  value: any;
  label: string;
  options: PostOptions;
}

interface Form {
  categoryId: FormField;
  price: FormField;
  title: FormField;
  description: FormField;
}

const digitsRegex = /[^0-9]+/g;
const SUCCESS_MESSAGE = 'Ваше объявление создано!';
export default function PostForm({ defaultValues = postDefaultValues, post }: PostFormProps) {
  const { categories } = useApp();
  const [data, setData] = useState<Form>({
    categoryId: {
      type: 'select',
      value: defaultValues?.categoryId,
      label: 'Выберите категорию',
      options: {
        required: true,
      },
    },
    price: {
      type: 'number',
      value: defaultValues?.price ?? '',
      label: 'Цена',
      options: { required: true, min: 1 },
    },
    title: {
      type: 'text',
      value: defaultValues?.title,
      label: 'Заголовок',
      options: { required: true, minLength: 5, maxLength: 50 },
    },
    description: {
      type: 'textarea',
      value: defaultValues?.body,
      label: 'Описание',
      options: { required: true, minLength: 10, maxLength: 800 },
    },
  });

  const textAreaError = useValidation(data.description.value, data.description.options);

  const [images, setImages] = useState<string[]>(() => (post ? post.images.split('||') : []));
  const router = useRouter();

  const { user } = useAuth();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push(routes.profile);
      return;
    }
  }, []);

  if (!user) {
    return <Spinner />;
  }

  const handleCreate = async (formData: CreatePostDTO) => {
    try {
      setSending(true);
      const res = await postAd(formData);
      await postTelegram({ ...res, username: user.username });
      alert(SUCCESS_MESSAGE);
      return router.push(routes.profile);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        return alert(e.response?.data);
      }
      return;
    } finally {
      setSending(false);
    }
  };

  const handleEdit = async (formData: EditPostDTO) => {
    try {
      setSending(true);
      await updateAd(formData);
      alert(messages.postUpdated);
      return router.push(routes.profile);
    } catch (e) {
      console.log(e);
      alert(messages.somethingWentWrong);
      return;
    } finally {
      setSending(false);
    }
  };

  const handleChange = (name: keyof Form, value: any) =>
    setData(prev => ({ ...prev, [name]: { ...prev[name], value } }));

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      return;
    }

    const isValidCategory = inputValidation(data.categoryId.value, data.categoryId.options);
    const isValidPrice = inputValidation(data.price.value, data.price.options);
    const isValidTitle = inputValidation(data.title.value, data.title.options);
    const isValidBody = inputValidation(data.description.value, data.description.options);

    if (!isValidCategory || !isValidPrice || !isValidTitle || !isValidBody) {
      return;
    }

    const form = {
      title: data.title.value.trim(),
      body: data.description.value.trim(),
      price: data.price.value,
      categoryId: data.categoryId.value,
    };

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
      };
      await handleEdit(editPostDto);
      return;
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
    };
    await handleCreate(createPostDto);
    return;
  };

  return (
    <form onSubmit={onSubmit} className="form" name={post ? 'Редактировать' : 'Добавить'}>
      <h1>Добавить объявление</h1>
      {Object.entries(data).map(([name, { label, value, type, options }]) => {
        switch (type) {
          case 'select': {
            return (
              // <Select
              //   label={label}
              //   name={name}
              //   value={categories.find(x => x.value === value)}
              //   onChange={(option: Option) => {
              //     handleChange(name as keyof Form, Number(option.value));
              //   }}
              //   options={categories}
              //   validations={options}
              //   key={name}
              // />
              <div key={name}>
                <label htmlFor={name}>{label}</label>
                <NewSelect
                  options={categories}
                  onChange={(option: Option) => {
                    handleChange(name as keyof Form, Number(option.value));
                  }}
                  value={categories.find(x => x.value === value)}
                />
                {!value && <span className="text-red">Поле обязательное</span>}
              </div>
            );
          }
          case 'number':
            return (
              <Input
                type="text"
                label={label}
                name={name}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(
                    name as keyof Form,
                    Number(event.target.value.replace(digitsRegex, ''))
                  );
                }}
                options={options}
                key={name}
              />
            );
          case 'text':
            return (
              <Input
                type="text"
                name={name}
                label={label}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(name as keyof Form, event.target.value);
                }}
                options={options}
                key={name}
              />
            );
          case 'textarea':
            return (
              <div className="grid" key={name}>
                <label htmlFor={name}>{label}</label>
                <textarea
                  rows={5}
                  cols={5}
                  name={name}
                  data-testid={name}
                  value={value}
                  {...options}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(name as keyof Form, event.target.value);
                  }}
                  // key={name}
                />
                {textAreaError && <span className="text-red">{textAreaError}</span>}
              </div>
            );
          default:
            return null;
        }
      })}
      <PostFormImages images={images} setImages={setImages} />
      <Button type="submit" disabled={sending} className="mx-auto">
        {post ? 'Редактировать' : 'Подать'}
      </Button>
    </form>
  );
}
