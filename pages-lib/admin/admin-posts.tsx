import Posts from '@/components/Posts';
import { Checkbox, Field, Label } from '@headlessui/react';
import { Post } from '@prisma/client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type Props = {
  posts: Post[];
};

const AdminPosts = ({ posts }: Props) => {
  const t = useTranslations();
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <Field className="mb-2 flex items-center gap-1 hover:cursor-pointer">
        <Checkbox
          checked={enabled}
          onChange={setEnabled}
          className="group block size-4 rounded border bg-gray data-[checked]:bg-white"
        >
          {/* Checkmark icon */}
          <svg
            className="stroke-black opacity-0 group-data-[checked]:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
        <Label>{t('показать только активные')}</Label>
      </Field>
      <Posts
        posts={
          enabled
            ? posts.filter(x => x.published === true && x.categoryId === 1 && x.id < 1000)
            : posts
        }
        edit={true}
      />
    </>
  );
};

export default AdminPosts;
