'use client';
import { Post, Role } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useCallback, useMemo, useState } from 'react';

import Price from '@/components/Price';
import Popup from '@/components/ui/Popup';
import useApp from '@/hooks/provider/useApp';
import useAuth from '@/hooks/provider/useAuth';
import useToast from '@/hooks/provider/useToast';
import updatePostPrisma from '@/utils/api/prisma/updatePost';
import postTelegramPost from '@/utils/api/telegram/postTelegramPost';
import { NO_IMAGE } from '@/utils/constants';

import { DAYS } from './Item.constants';
import { checkIsOld, handleArchive, handleEdit } from './Item.helpers';
import { ItemButtons } from './ItemButtons';
import { ItemLike } from './ItemLike';
import { ItemModalText } from './types';

type ItemProps = {
  post: Post;
  edit?: boolean;
};

export function Item({ post, edit = false }: ItemProps) {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const { categories } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState<ItemModalText | undefined>();
  const { title, preview, price } = post;

  const showModal = (text: ItemModalText) => {
    setModalText(text);
    setIsOpen(true);
  };

  const hideModal = useCallback(() => setIsOpen(false), []);

  const handleFunction = useCallback(async () => {
    try {
      if (modalText === ItemModalText.edit) {
        await handleEdit(post, router);
        return;
      }
      if (modalText === ItemModalText.republish) {
        if (user) {
          const isOldEnough = checkIsOld(post.updatedAt, DAYS);
          if (isOldEnough) {
            await updatePostPrisma({ ...post, updatedAt: new Date() });
            await postTelegramPost(post, user, categories);
            alert('Объявление подано в канал повторно!');
          } else {
            alert(`Объявление подано меньше чем ${DAYS} дней назад!`);
          }
        } else {
          alert('Кажется, вы не авторизованы!');
        }
        return;
      }
      if (modalText === ItemModalText.archive) {
        await handleArchive(post, toast);
        return;
      }
    } catch (e) {
      console.error(modalText, e);
      toast(t('Что-то пошло не так'));
    } finally {
      setIsOpen(false);
    }
  }, [categories, modalText, post, router, t, toast, user]);

  const buttons = useMemo(
    () => [
      { text: 'Да', onClick: handleFunction },
      { text: 'Нет', onClick: hideModal },
    ],
    [handleFunction, hideModal]
  );

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl shadow dark:border">
      <div className="relative block aspect-square transition-all hover:scale-105">
        <Image
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 128px"
          alt={title}
          src={preview}
          placeholder="blur"
          blurDataURL={NO_IMAGE}
        />
      </div>

      <div className="relative mx-3 my-1 overflow-hidden whitespace-nowrap font-bold lg:mx-4 lg:my-2">
        <Price price={price} />
        <h2 className="mt-auto truncate font-normal">{title}</h2>
        <ItemLike post={post} className="absolute right-0 top-0" />
      </div>
      {user && (user.role === Role.ADMIN || user.id === post.userId) && edit && (
        <>
          <Popup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text={modalText ?? 'InnoAds'}
            buttons={buttons}
          />
          <ItemButtons showModal={showModal} />
        </>
      )}
    </div>
  );
}
