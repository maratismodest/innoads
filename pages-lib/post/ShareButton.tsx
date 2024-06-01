'use client';
import buttonStyles from '@/styles/buttonStyles';
import type { Post } from '@prisma/client';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';

interface ShareButtonProps extends ComponentPropsWithoutRef<'button'> {
  post: Post;
}

const onClick = async (slug: string) => {
  await navigator.share({
    title: process.env.NEXT_PUBLIC_APP_NAME,
    text: 'Поделиться ссылкой:',
    url: process.env.NEXT_PUBLIC_APP_URL + '/post/' + slug,
  });
};

export default function ShareButton({ post, className }: ShareButtonProps) {
  const { slug } = post;

  if (!navigator.canShare) {
    return null;
  }

  return (
    <button className={clsx(buttonStyles(), className)} onClick={() => onClick(slug)}>
      Поделиться
    </button>
  );
}
