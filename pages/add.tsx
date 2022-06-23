import {options} from "assets/options";
import axios, {AxiosError} from "axios";
import cn from "classnames";
import Button from "components/Button/Button";
import GoToProfile from "components/GoToProfile/GoToProfile";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import {MainLayout} from "components/MainLayout/MainLayout";
import SelectInno from "components/Select/Select";
import Spinner from "components/Spinner/Spinner";
import {useAuth} from "context/AuthContext";
import {getDictionary} from "functions/getDictionary";
import {handleDeleteImage} from "functions/handleDeleteImage";
import handleImageUpload from "functions/handleImageUpload";
import {handlePostImage} from "functions/handlePostImage";
import {MoveImage, moveImage} from "functions/moveImage";
import {onImageClick} from "functions/onImageClick";
import {HTMLInputEvent} from "interfaces";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import {useRouter} from "next/router";
import {GetStaticProps} from "next/types";
import React, {useMemo, useState} from "react";
import {isDesktop} from "react-device-detect";
import {Controller, useForm} from "react-hook-form";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
// @ts-ignore
import slug from "slug";
import classes from "styles/classes.module.scss";
import {ACCEPTED_IMAGE_FORMAT, ErrorProps, NO_IMAGE, routes, titles} from "../constants";
import {convertLinksToMedia} from "../functions/convertLinksToMedia";


export default function Add() {
    const router = useRouter()
    const {t, i18n} = useTranslation()
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const {control, register, handleSubmit, formState: {errors}} = useForm();
    const {user, token} = useAuth();
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    const translatedOptions = useMemo(() => options.map((option) => {
        return {
            ...option, label: t(option.label)
        }
    }), [t])


    if (!user || !user.username) {
        return (
            <GoToProfile/>
        )
    }

    const onSubmit = async (data: any) => {
        if (images.length === 0) {
            return setError("Добавить хотя бы одно фото!");
        }
        const {title, body, price, category} = data
        const slugTitle = slug(title) + "-" + Math.floor(Math.random() * 100)
        const categoryValue = category.value

        const formData = {
            title: title,
            body: body,
            price: Number(price),
            preview: images[0],
            images: images.join('||'),
            slug: slugTitle,
            telegram: user.username,
            tgId: user.id,
            categoryId: categoryValue
        }

        setSending(true)
        try {
            const token = localStorage.getItem('token')
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            const chat_id = "@innoads";
            const category = options.find((item) => item.value == categoryValue) || options[0]

            const text = `Категория: #${t(category.label)}\nЦена: ${price} \n\n${title} \n\n${body} \n\nПодробнее: https://innoads.ru/post/${slugTitle} \n\nавтор: @${user.username}`;

            const sendPhoto = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMediaGroup?chat_id=${chat_id}`;
            const media = convertLinksToMedia(images, text);
            await axios.post(sendPhoto, {media});

            alert("Ваше объявление создано!")

            return router.push(routes.profile);
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                return alert(e.response?.data)
            }
            return alert("Что-то пошло не так... Попробуйте отправить еще раз")
        } finally {
            setSending(false)
        }

    }

    const getCompressedImagesLinks = async (imagesFromInput: any) => {
        for (let i = 0; i < imagesFromInput.length; i++) {
            const initialImage = imagesFromInput[i];
            const resizedImage = await handleImageUpload(initialImage);
            if (resizedImage) {
                const formData = new FormData();
                formData.append("image", resizedImage, `${Date.now()}.jpg`);
                const link = await handlePostImage(formData)
                const {status, value} = link
                if (status === 'ok') {
                    setImages((prevState: string[]) => [...prevState, value]);
                    setError("");
                }
                if (status === 'error') {
                    setError(value);
                }
            }
        }
    }

    const imageHandler = async (event: HTMLInputEvent) => {
        if (event.target.files) {
            const imagesFromInput = event.target.files;
            const length = imagesFromInput.length + images.length;
            if (length > 4) {
                return setError("Не больше 4 фотографий!");
            }
            setLoading(true)
            await getCompressedImagesLinks(imagesFromInput);
            setLoading(false)
        }
        return
    };

    const deleteImage = async (current: string) => {
        const res = images.filter(image => image !== current)
        setImages(res);
        return await handleDeleteImage(current)
    };

    const ErrorBlock = ({name}: ErrorProps) => errors[name] && <span>{t('required')}</span>

    return (
        <>
            {sending &&
                <div className={classes.sending}>
                    <Spinner/>
                </div>
            }
            <MainLayout title={titles.add}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <Controller
                        name="category"
                        control={control}
                        rules={{required: true}}
                        render={({field}: any) => <SelectInno
                            placeholder={t('chooseCategory')}
                            {...field}
                            options={translatedOptions}/>}
                    />
                    <ErrorBlock name={'category'}/>
                    <div style={{marginBottom: 10}}></div>
                    <Input
                        type="number"
                        placeholder={t('price')}
                        register={register}
                        required={true}
                        name="price"
                    />
                    <ErrorBlock name={'price'}/>
                    <Input
                        type="text"
                        placeholder={t('header')}
                        register={register}
                        required={true}
                        name="title"
                    />
                    <ErrorBlock name={'title'}/>
                    <textarea
                        rows={5}
                        cols={5}
                        placeholder={t('description')}
                        {...register("body", {required: true})}
                        className={classes.textArea}
                    />
                    <ErrorBlock name={'body'}/>
                    <div>
                        <div>
                            <h4>{t('addPhoto')}</h4>
                            <div
                                className={cn({
                                    [classes.image]: isDesktop,
                                    [classes.imageMobile]: !isDesktop,
                                })}
                                onClick={onImageClick}
                            >
                                <Image
                                    alt="image"
                                    src={NO_IMAGE}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            </div>
                        </div>
                        <Input
                            id="upload"
                            type="file"
                            onChange={imageHandler}
                            hidden
                            multiple
                            accept={ACCEPTED_IMAGE_FORMAT}
                        />
                    </div>
                    <h4>{t('preview')}</h4>
                    <ul
                        className={cn({
                            [classes.images]: isDesktop,
                            [classes.imagesMobile]: !isDesktop,
                        })}
                    >
                        {images.map((image: string, index: number) => {
                            return (
                                <li
                                    key={image}
                                    className={cn({
                                        [classes.image]: isDesktop,
                                        [classes.imageMobile]: !isDesktop,
                                    })}
                                >
                                    <Image
                                        alt={image}
                                        src={image}
                                        objectFit="cover"
                                        layout={"fill"}
                                        placeholder="blur"
                                        blurDataURL={NO_IMAGE}
                                    />
                                    <Icon
                                        className={classes.leftArrow}
                                        onClick={(e: MouseEvent) => {
                                            moveImage(e, images, index, MoveImage.left, setImages);
                                        }}
                                    >
                                        &larr;
                                    </Icon>
                                    <Icon
                                        className={classes.rightArrow}
                                        onClick={(e: MouseEvent) => {
                                            moveImage(e, images, index, MoveImage.right, setImages);
                                        }}
                                    >
                                        &rarr;
                                    </Icon>
                                    <Icon
                                        className={classes.deleteIcon}
                                        onClick={async () => {
                                            await deleteImage(image);
                                        }}
                                    >
                                        &times;
                                    </Icon>
                                </li>
                            );
                        })}
                        {loading && (
                            <li
                                className={cn({
                                    [classes.image]: isDesktop,
                                    [classes.imageMobile]: !isDesktop,
                                })}
                            >
                                <p className={classes.loadingImage}>
                                    Загружаем изображение
                                </p>
                            </li>
                        )}
                    </ul>
                    {error}
                    <Button className={classes.mt40} type="submit"
                            disabled={sending || loading ? true : undefined}>{t('addAd')}</Button>
                </form>
            </MainLayout>
        </>

    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await getDictionary(locale)),
        },
    };
}

// await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, formData, {
//     headers: {
//         authorization: `Bearer ${token}`
//     }
// })
