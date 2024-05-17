'use client';
import Button from '@/components/ui/Button';
import type { CommonPost, PostDTO } from '@/types';
import React from 'react';

interface ShareButtonProps {
  post: CommonPost;
}

const ShareButton = ({ post }: ShareButtonProps) => {
  const { slug } = post;

  const onClick = async () => {
    await navigator.share({
      title: process.env.NEXT_PUBLIC_APP_NAME,
      text: 'Поделиться ссылкой:',
      url: process.env.NEXT_PUBLIC_APP_URL + '/post/' + slug,
    });
  };

  return (
    <Button className="mt-8" onClick={onClick}>
      Поделиться
    </Button>
  );
};

export default ShareButton;
