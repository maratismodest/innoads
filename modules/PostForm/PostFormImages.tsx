import Image from 'next/image'
import {useTranslation} from 'next-i18next'
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import {ACCEPTED_IMAGE_FORMAT, NO_IMAGE} from 'utils/constants'
import getCompressedImagesLinks from 'utils/image/getCompressedImagesLinks'
import {handleDeleteImage} from 'utils/image/handleDeleteImage'
import {MoveImage, moveImage} from 'utils/image/moveImage'

import Icon from 'components/Icon'

interface PostFormImagesProps {
    images: string[]
    setImages: Dispatch<SetStateAction<string[]>>
}

const imageErrors = {
    noImages: 'Добавить хотя бы одно фото!',
    manyImages: 'Не больше 4 фотографий!',
}

const PostFormImages = ({images, setImages}: PostFormImagesProps) => {
    const ref = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const {t} = useTranslation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!loading) {
            imagesValidate()
        }
    }, [loading])

    const imagesValidate = () => {
        if (images.length === 0) {
            setError(imageErrors.noImages)
        } else if (images.length > 4) {
            setError(imageErrors.manyImages)
        } else {
            setError('')
        }
    }

    const imageHandler = async (event: any) => {
        setLoading(true)
        try {
            if (event.target.files) {
                const imagesFromInput = event.target.files
                const length = imagesFromInput.length + images.length
                if (length > 4) {
                    return setError(imageErrors.manyImages)
                }
                await getCompressedImagesLinks(imagesFromInput, setImages)
            }
        } catch (e) {
            console.log('e', e)
        } finally {
            setLoading(false)
        }
    }

    const deleteImage = async (current: string) => {
        setLoading(true)
        try {
            const res = images.filter((image) => image !== current)
            setImages(res)
            return await handleDeleteImage(current)
        } catch (e) {
            console.log('e', e)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div>
                <div>
                    <h4>{t('addPhoto')}</h4>
                    <div
                        className='relative mb-2 aspect-square w-[48%] cursor-pointer hover:shadow lg:mr-2 lg:w-[150px]'
                        onClick={() => {
                            if (ref.current) {
                                ref.current.click()
                            }
                        }}
                    >
                        <Image
                            alt='image'
                            src={NO_IMAGE}
                            fill={true}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>
                <input
                    id='upload'
                    type='file'
                    onChange={imageHandler}
                    hidden
                    multiple
                    accept={ACCEPTED_IMAGE_FORMAT}
                    ref={ref}
                />
            </div>
            {!loading && error && <span className='text-red'>{error}</span>}
            <h4>{t('preview')}</h4>
            <ul
                className='grid grid-cols-2 gap-4'
            >
                {images.map((image: string, index: number) => {
                    return (
                        <li
                            key={image}
                            className='relative aspect-square cursor-pointer hover:shadow'
                        >
                            <Image
                                alt={image}
                                src={image}
                                style={{
                                    objectFit: 'cover',
                                }}
                                fill={true}
                                placeholder='blur'
                                blurDataURL={NO_IMAGE}
                            />
                            <Icon
                                className='absolute top-1/2 left-0 -translate-y-1/2'
                                onClick={(e) => {
                                    moveImage(
                                        e,
                                        images,
                                        index,
                                        MoveImage.left,
                                        setImages,
                                    )
                                }}
                            >
                                &larr;
                            </Icon>
                            <Icon
                                className='absolute top-1/2 right-0 -translate-y-1/2	'
                                onClick={(e) => {
                                    moveImage(
                                        e,
                                        images,
                                        index,
                                        MoveImage.right,
                                        setImages,
                                    )
                                }}
                            >
                                &rarr;
                            </Icon>
                            <Icon
                                className='absolute top-0 right-0'
                                onClick={async () => {
                                    await deleteImage(image)
                                }}
                            >
                                &times;
                            </Icon>
                        </li>
                    )
                })}
                {loading && (
                    <li
                        className='relative mb-2 aspect-square w-[48%] cursor-pointer hover:shadow lg:mr-2 lg:w-[150px]'
                    >
                        <p className='flex h-full w-full items-center justify-center rounded text-center text-red'
                        >
                            Загружаем изображение
                        </p>
                    </li>
                )}
            </ul>
        </>
    )
}

export default PostFormImages
