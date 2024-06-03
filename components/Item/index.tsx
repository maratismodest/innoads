'use client';
import ItemButtons from '@/components/Item/item-buttons';
import ItemLike from '@/components/Item/ItemLike';
import Price from '@/components/Price';
import Popup from '@/components/ui/Popup';
import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import fetchMessage from '@/utils/api/prisma/fetchMessage';
import updatePostPrisma from '@/utils/api/prisma/updatePost';
import commentPost from '@/utils/api/telegram/commentPost';
import postTelegram from '@/utils/api/telegram/postTelegram';
import { NO_IMAGE, routes } from '@/utils/constants';
import { Post, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { errors, ItemModalText, success } from './utils';

type ItemProps = {
  post: Post;
  edit?: boolean;
};

export default function Item({ post, edit = false }: ItemProps) {
  const { categories } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [modalText, setModalText] = useState<ItemModalText | undefined>();
  const { toast, setToast } = useToast();
  const { user } = useAuth();
  const { id, slug, title, preview, price, categoryId, body, images } = post;

  const hideModal = useCallback(() => setIsOpen(false), []);

  const showModal = (text: ItemModalText) => {
    setModalText(text);
    setIsOpen(true);
  };

  const handleFunction = async () => {
    try {
      if (modalText === ItemModalText.edit) {
        router.push(routes.edit + '/' + slug);
        return;
      }
      if (modalText === ItemModalText.telegram) {
        await postTelegram(post, user as User, categories);
        alert(success.telegram);
        router.push(routes.profile);
        return;
      }
      if (modalText === ItemModalText.delete) {
        // await deleteAd(id);

        const _updatedPost = await updatePostPrisma({ ...post, published: false });
        console.log('_updatedPost', _updatedPost);
        const message = await fetchMessage(post.id);
        if (message) {
          const res = await commentPost(message.id);
          console.log('res', res);
        }
        setToast(true);
        // revalidatePath('/profile');
        const refetchButton = document.getElementById('refetch-posts');
        if (refetchButton) {
          console.log('refetchButton', refetchButton);
          refetchButton.click();
        }
        alert(success.archive);
        return;
      }
    } catch (e) {
      console.log(e);
      alert(errors.wentWrong);
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  const buttons = useMemo(
    () => [
      { text: 'Да', onClick: handleFunction },
      { text: 'Нет', onClick: hideModal },
    ],
    [handleFunction]
  );

  return (
    <>
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={modalText ?? 'InnoAds'}
        buttons={buttons}
      />
      <Link
        href={`${routes.post}/${slug}`}
        title={title}
        className="relative flex flex-col overflow-hidden rounded-2xl shadow"
        data-testid={`item-${id}`}
        data-category={categoryId}
      >
        <div className="relative block aspect-square transition-all hover:scale-105">
          <Image
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 200px"
            alt={title}
            src={preview}
            placeholder="blur"
            blurDataURL={NO_IMAGE}
            title={title}
          />
        </div>

        <div className="relative mx-3 my-1 overflow-hidden whitespace-nowrap font-bold lg:mx-4 lg:my-2">
          <Price price={price} />
          <h2 className="mt-auto truncate font-normal">{title}</h2>
          <ItemLike post={post} />
        </div>
        {user && edit && <ItemButtons showModal={showModal} />}
      </Link>
    </>
  );
}
