'use client';
import type { Post } from '@prisma/client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { ComponentPropsWithoutRef } from 'react';

import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';

const onClick = async (slug: string) => {
  try {
    await navigator.share({
      title: process.env.NEXT_PUBLIC_APP_NAME,
      text: 'Поделиться ссылкой:',
      url: `${process.env.NEXT_PUBLIC_APP_URL}${routes.post}/${slug}`,
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};

interface ShareButtonProps extends ComponentPropsWithoutRef<'button'> {
  post: Post;
}

export default function ShareButton({ post, className, ...rest }: ShareButtonProps) {
  const t = useTranslations();
  const { slug } = post;

  if (typeof navigator === 'undefined' || !navigator.canShare) {
    return null;
  }

  return (
    <button className={clsx(buttonStyles(), className)} onClick={() => onClick(slug)} {...rest}>
      {t('Поделиться')}
    </button>
  );
}
