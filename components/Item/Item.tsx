import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import cn from 'classnames'
import dayjs from 'dayjs'
import {useAuth} from 'hooks/useAuth'
import {PostInterface} from 'interfaces'
import useLocalStorageState from 'use-local-storage-state'
import {NO_IMAGE, Routes} from 'utils/constants'

import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import modal from 'components/Modal/Modal.module.scss'
import Price from 'components/Price/Price'
import postTelegram from "../../utils/api/postTelegram";
import putPost from "../../utils/api/putPost";

import {errors, ItemModalText, success} from './utils'

import classes from './Item.module.scss'

interface ItemInterface {
  post: PostInterface
  edit?: boolean
}

const sevenDays = 1000 * 60 * 60 * 24 * 7

const Item = ({post, edit = false}: ItemInterface): JSX.Element => {
  const [favourites, setFavourites] = useLocalStorageState<PostInterface[]>('favourites', {
    defaultValue: [],
  })
  const {id, slug, title, preview, price, updatedAt} = post
  const {t} = useTranslation('profile')
  const router = useRouter()
  const {token} = useAuth()
  const liked = useMemo(() => !!favourites.find(x => x.id === id), [favourites, id])

  const [visible, setVisible] = useState(false)
  const hideModal = useCallback(() => setVisible(false), [])

  const showModal = (text: ItemModalText) => {
    setModalText(text)
    setVisible(true)
  }

  const [modalText, setModalText] = useState<ItemModalText | undefined>()

  const handleFunction = useCallback(async () => {
    hideModal()
    try {
      switch (modalText) {
        case ItemModalText.edit: {
          await router.push(Routes.edit + '/' + slug)
          break
        }
        case ItemModalText.delete: {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/post/${id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          )
          alert(success.deleted)
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
            await postTelegram(post)
            await putPost({...post, createdAt: new Date().toString()})
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
  }, [modalText, post, router, token, hideModal, id, slug, updatedAt])

  const handleFavourite = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      const currentList = liked ? favourites.filter(x => x.id !== id) : [...favourites, post]
      setFavourites(currentList)
    },
    [id, favourites, liked, post, setFavourites],
  )

  return (
    <>
      <Modal visible={visible}>
        <div className={modal.modal}>
          <h4>{modalText}</h4>
          <hr/>
          <div className={modal.modalButtons}>
            <Button onClick={handleFunction}>Да</Button>
            <Button onClick={hideModal}>Нет</Button>
          </div>
        </div>
      </Modal>

      <li key={slug} className={classes.item}>
        {edit && (
          <>
            <Button
              className={cn(
                classes.itemBtn,
                classes.itemBtnDelete,
              )}
              transparent={true}
              onClick={() => {
                showModal(ItemModalText.delete)
              }}
            >
              &#10008;
            </Button>
            <Button
              title={t('edit') as string}
              className={cn(classes.itemBtn, classes.itemBtnEdit)}
              onClick={() => {
                showModal(ItemModalText.edit)
              }}
              transparent
            >
              &#10000;
            </Button>
            <Button
              title={t('publishAgain') as string}
              className={cn(
                classes.itemBtn,
                classes.itemBtnPromote,
              )}
              transparent
              onClick={() => {
                showModal(ItemModalText.republish)
              }}
            >
              &#8679;
            </Button>
          </>
        )}
        <Link href={`${Routes.post}/${slug}`} title={title}>
          <div className={classes.itemImage}>
            <Image
              fill={true}
              style={{objectFit: 'cover'}}
              sizes={'(max-width: 768px) 50vw,(max-width: 1024px) 25vw, 200px'}
              alt={title}
              src={preview || NO_IMAGE}
              placeholder='blur'
              blurDataURL={NO_IMAGE}
              title={title}
            />
          </div>

          <div className={classes.itemPrice}>
            <Price price={price}/>
            <h2 className={classes.itemTitle}>{title}</h2>
            <Image
              width={24}
              height={24}
              alt='favourite'
              src={liked ? '/svg/heart-red.svg' : '/svg/heart.svg'}
              onClick={handleFavourite}
              className={classes.itemFavourite}
            />
          </div>

        </Link>
      </li>
    </>
  )
}
export default Item
