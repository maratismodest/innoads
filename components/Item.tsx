import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'
import React, {useCallback, useContext, useEffect, useMemo} from 'react'
import {clsx} from 'clsx'
import {FavouriteContext} from '@/context/FavouritesContext'
import dayjs from 'dayjs'
import {useAuth} from "@/hooks/useAuth";
import {useModal} from '@/hooks/useModal'
import TransparentHeart from '@/public/svg/heart.svg'
import RedHeart from '@/public/svg/heart-red.svg'
import {PostDTO} from '@/types/PostDTO'
import client from '@/utils/api/createRequest'
import postTelegram from '@/utils/api/postTelegram'
import updatePost from '@/utils/api/updatePost'
import {NO_IMAGE} from '@/utils/constants'
import {Routes} from '@/utils/routes'

import Price from '@/components/Price'
import Button from '@/components/ui/Button'

const sevenDays = 1000 * 60 * 60 * 24 * 7

type Props = {
  post: PostDTO
  edit?: boolean
}

const Item = ({post, edit = false}: Props): JSX.Element => {
  const {setModal, setModalValue} = useModal()
  const {favourites, setFavourites} = useContext(FavouriteContext)
  const {user} = useAuth()
  const {id, slug, title, preview, price, updatedAt, categoryId} = post

  const {t} = useTranslation()
  const router = useRouter()
  const liked = useMemo(() => !!favourites.find(x => x.id === id), [favourites, id])

  const hideModal = () => {
    setModalValue(null)
    setModal(false)
  }

  const showModal = (text: ItemModalText) => {
    setModalValue(
      <div className='flex flex-col text-center'>
        <h4>{text}</h4>
        <hr/>
        <div className='mt-12 flex justify-around'>
          <Button onClick={async () => await handleFunction(text)}>{t('yes')}</Button>
          <Button onClick={hideModal}>{t('no')}</Button>
        </div>
      </div>,
    )
    setModal(true)
  }

  const handleFunction = async (modalText: string) => {
    try {
      switch (modalText) {
        case ItemModalText.edit: {
          await router.push(Routes.edit + '/' + slug)
          break
        }
        case ItemModalText.delete: {
          await client.delete(`/posts/${id}`)
          alert(success.deleted)
          await router.push(Routes.profile)
          break
        }
        case ItemModalText.republish: {
          const now = new Date().getTime()
          const updated = new Date(updatedAt).getTime()

          if (now - updated < sevenDays) {
            alert(
              `Объявление можно публиковать повторно не чаще раз в неделю! Можно подать повторно ${dayjs(
                updated + sevenDays,
              ).format('DD.MM.YYYY')}`,
            )
          } else {
            await postTelegram({...post, username: user?.username as string})
            await updatePost({...post, createdAt: new Date().toString()})
            alert(success.updated)
          }
          break
        }
        default:
          alert(errors.noCase)
      }
    } catch (e) {
      console.log(e)
      alert(errors.wentWrong)
    }
  }

  const handleFavourite = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      const currentList = liked ? favourites.filter(x => x.id !== id) : [...favourites, post]
      localStorage.setItem('favourites', JSON.stringify(currentList))
      setFavourites(currentList)
    },
    [id, favourites, liked, post, setFavourites],
  )

  useEffect(() => {
    return () => {
      setModalValue(null)
      setModal(false)
    }

  }, [setModalValue, setModal])

  return (
    <li key={slug} className='relative flex-col overflow-hidden rounded-2xl shadow'
        data-testid="item"
        data-category={categoryId}
    >
      {edit && (
        <>
          <Button
            className={clsx('absolute z-10', 'right-0 top-0')}
            onClick={() => {
              showModal(ItemModalText.delete)
            }}
          >
            &#10008;
          </Button>
          <Button
            title={t('edit')}
            className={clsx('absolute z-10', 'left-0 top-0')}
            onClick={() => {
              showModal(ItemModalText.edit)
            }}
          >
            &#10000;
          </Button>
          <Button
            title={t('publishAgain')}
            className={clsx('absolute z-10', 'right-0 bottom-0')}
            onClick={() => {
              showModal(ItemModalText.republish)
            }}
          >
            &#8679;
          </Button>
        </>
      )}
      <Link href={`${Routes.post}/${slug}`} title={title}>
        <div className='relative aspect-square transition-all hover:scale-105'>
          <Image
            fill={true}
            style={{objectFit: 'cover'}}
            sizes={'(max-width: 768px) 45vw,(max-width: 1024px) 25vw, 200px'}
            alt={title}
            src={preview || NO_IMAGE}
            placeholder='blur'
            blurDataURL={NO_IMAGE}
            title={title}
          />
        </div>

        <div className='relative mx-3 my-1 overflow-hidden whitespace-nowrap font-bold lg:mx-4 lg:my-2'>
          <Price price={price}/>
          <h2 className='mt-auto text-ellipsis whitespace-nowrap font-normal'>{title}</h2>
          <button className='absolute top-0 right-0 z-10 cursor-pointer'
                  onClick={handleFavourite} aria-label='add to favorites'>
            {liked ? <RedHeart/> : <TransparentHeart/>}
          </button>
        </div>

      </Link>
    </li>
  )
}

const success = {
  updated: 'Объявление поднято в поиске!',
  deleted: 'Объявление удалено! Перезагрузите страницу, чтобы вы увидели изменения',
}
const errors = {
  wentWrong: 'Что-то пошло не так!',
  noCase: 'Нет таких значений',
}

enum ItemModalText {
  edit = 'Редактировать объявление?',
  republish = 'Опубликовать повторно объявление в канале и поднять его на сайте?',
  delete = 'Удалить объявление?',
}

export default Item
