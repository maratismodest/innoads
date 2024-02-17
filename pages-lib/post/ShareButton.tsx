'use client';
import Button from '@/components/ui/Button';
import { PostDTO } from '@/types';
import React from 'react';

interface ShareButtonProps {
  post: PostDTO;
}
const ShareButton = ({ post }: ShareButtonProps) => {
  const { slug } = post;
  return (
    <Button
      className="mt-8"
      onClick={async () => {
        await navigator.share({
          title: process.env.NEXT_PUBLIC_APP_NAME,
          text: 'Поделиться ссылкой:',
          url: process.env.NEXT_PUBLIC_APP_URL + '/post/' + slug,
        });
      }}
    >
      Поделиться
    </Button>
  );
};

export default ShareButton;
