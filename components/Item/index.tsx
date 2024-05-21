'use client';
import RedHeart from '@/assets/svg/heart-red.svg';
import TransparentHeart from '@/assets/svg/heart.svg';
import ItemButtons from '@/components/Item/item-buttons';
import Index from '@/components/Price';
import Button from '@/components/ui/Button';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import favouritesAtom from '@/state';
import type { PostDTO } from '@/types';
import postTelegram from '@/api/backend/postTelegram';
import fetchMessage from '@/api/prisma/fetchMessage';
import updatePostPrisma from '@/api/prisma/updatePost';
import commentPost from '@/api/telegram/commentPost';
import { NO_IMAGE, routes } from '@/utils/constants';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Post } from '@prisma/client';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { errors, ItemModalText, success } from './utils';

type Props = {
  post: PostDTO | Post;
  edit?: boolean;
};

export default function Item({ post, edit = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const [modalText, setModalText] = useState<ItemModalText | undefined>();
  const { toast, setToast } = useToast();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const { user } = useAuth();
  const { id, slug, title, preview, price, categoryId, body, images } = post;

  const liked = useMemo(() => !!favourites.find(x => x.id === id), [favourites, id]);

  const hideModal = () => setIsOpen(false);

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
        await postTelegram({
          title,
          body,
          price,
          slug,
          username: user?.username as string,
          categoryId,
          images,
        });
        alert(success.telegram);
        router.push(routes.profile);
        return;
      }
      if (modalText === ItemModalText.delete) {
        // await deleteAd(id);

        await updatePostPrisma({ ...post, published: false });
        const message = await fetchMessage(post.id);
        console.log('message', message);
        if (message) {
          const res = await commentPost(message.id);
          console.log('res', res);
        }
        setToast(true);
        // revalidatePath('/profile');
        window.location.reload();
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

  const handleFavourite = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const currentList = liked ? favourites.filter(x => x.id !== id) : [...favourites, post];
      setFavourites(currentList as any);
    },
    [id, favourites, liked, post, setFavourites]
  );

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 w-screen overflow-y-auto">
          {/* Container to center the panel */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="mx-auto max-w-sm rounded bg-white p-4">
              <DialogTitle>{modalText}</DialogTitle>
              <hr />
              <div className="mt-12 flex justify-around">
                <Button onClick={handleFunction}>Да</Button>
                <Button onClick={hideModal}>Нет</Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
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
          <Index price={price} />
          <h2 className="mt-auto truncate font-normal">{title}</h2>
          <button
            className="absolute right-0 top-0 z-10 cursor-pointer"
            onClick={handleFavourite}
            aria-label="Добавить в избранное"
          >
            {liked ? <RedHeart /> : <TransparentHeart />}
          </button>
        </div>
        {user && edit && <ItemButtons showModal={showModal} />}
      </Link>
    </>
  );
}
