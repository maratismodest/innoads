'use client';
import RedHeart from '@/assets/svg/heart-red.svg';
import TransparentHeart from '@/assets/svg/heart.svg';
import ItemButtons from '@/components/Item/item-buttons';
import Modal from '@/components/Modal';
import Price from '@/components/Price';
import Button from '@/components/ui/Button';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import useToast from '@/hooks/useToast';
import favouritesAtom from '@/state';
import type { PostDTO } from '@/types';
import deleteAd from '@/utils/api/deleteAd';
import postTelegram from '@/utils/api/postTelegram';
import { NO_IMAGE, routes } from '@/utils/constants';
import { useAtom } from 'jotai';
// import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { errors, ItemModalText, success } from './utils';

type Props = {
  post: PostDTO;
  edit?: boolean;
};

export default function Item({ post, edit = false }: Props) {
  const router = useRouter();
  const [modalText, setModalText] = useState<ItemModalText | undefined>();
  const { toast, setToast } = useToast();
  const { setModal, modal } = useModal();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const { user } = useAuth();
  const { id, slug, title, preview, price, categoryId, body, images } = post;

  const liked = useMemo(() => !!favourites.find(x => x.id === id), [favourites, id]);

  const hideModal = () => setModal(false);

  const showModal = (text: ItemModalText) => {
    setModalText(text);
    setModal(true);
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
        await deleteAd(id);
        setToast(true);
        // revalidatePath('/profile');
        window.location.reload();
        return;
      }
    } catch (e) {
      console.log(e);
      alert(errors.wentWrong);
    } finally {
      setModal(false);
    }
  };

  const handleFavourite = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const currentList = liked ? favourites.filter(x => x.id !== id) : [...favourites, post];
      setFavourites(currentList);
    },
    [id, favourites, liked, post, setFavourites]
  );

  useEffect(() => {
    return () => {
      setModal(false);
    };
  }, []);

  return (
    <>
      <Modal visible={modal}>
        <div className="flex flex-col text-center">
          <h4>{modalText}</h4>
          <hr />
          <div className="mt-12 flex justify-around">
            <Button onClick={handleFunction}>Да</Button>
            <Button onClick={hideModal}>Нет</Button>
          </div>
        </div>
      </Modal>
      <Link
        href={`${routes.post}/${slug}`}
        title={title}
        className="relative flex flex-col overflow-hidden rounded-2xl shadow"
        data-testid={`item-${id}`}
        data-category={categoryId}
      >
        <div className="relative aspect-square transition-all hover:scale-105">
          <Image
            fill
            style={{ objectFit: 'cover' }}
            sizes={'(max-width: 768px) 45vw,(max-width: 1024px) 25vw, 200px'}
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
