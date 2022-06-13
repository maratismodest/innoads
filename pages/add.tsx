import {options} from "assets/options";
import axios from "axios";
import cn from "classnames";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import {MainLayout} from "components/MainLayout/MainLayout";
import SelectInno from "components/Select/Select";
import Spinner from "components/Spinner/Spinner";
import {useAuth} from "context/AuthContext";
import {handleDeleteImage, requestConfig} from "functions/handleDeleteImage";
import handleImageUpload from "functions/handleImageUpload";
import {handlePostImage} from "functions/handlePostImage";
import {MoveImage, moveImage} from "functions/moveImage";
import {onImageClick} from "functions/onImageClick";
import {HTMLInputEvent} from "interfaces";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {isDesktop} from "react-device-detect";
import {Controller, useForm} from "react-hook-form";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
// @ts-ignore
import slug from "slug";
import classes from "styles/classes.module.scss";
import {ACCEPTED_IMAGE_FORMAT, ErrorProps, NO_IMAGE, routes, titles} from "../constants";

export default function Add() {
    const router = useRouter()
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const {control, register, handleSubmit, formState: {errors}} = useForm();
    const {user} = useAuth();
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    if (!user || !user.username) {
        return (
            <MainLayout title={titles.add}>
                <div className={classes.center}>
                    <h2>Вы не авторизованы</h2>
                    <Link href={routes.profile} passHref>
                        <Button>Перейти на страницу авторизации</Button>
                    </Link>
                </div>
            </MainLayout>
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
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, formData, requestConfig)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, formData, requestConfig)
            alert("Ваше объявление создано!")
            setSending(false)
            return router.push(routes.profile);
        } catch (e) {
            console.log(e)
            setSending(false)
            return alert("Что-то пошло не так... Попробуйте отправить еще раз")
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

    const imageHandler = async (e: HTMLInputEvent) => {
        if (e.target.files) {
            const imagesFromInput = e.target.files;
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

    const Error = ({name}: ErrorProps) => errors[name] && <span>Поле обязательно для заполнения</span>

    return (
        <>
            {sending &&
                <div className={classes.sending}>
                    <Spinner/>
                </div>}
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
                            {...field}
                            options={options}/>}
                    />
                    <Error name={'category'}/>
                    <div style={{marginBottom: 10}}></div>
                    <Input
                        type="number"
                        placeholder="Цена"
                        register={register}
                        required={true}
                        name="price"
                    />
                    <Error name={'price'}/>
                    <Input
                        type="text"
                        placeholder="Заголовок"
                        register={register}
                        required={true}
                        name="title"
                    />
                    <Error name={'title'}/>
                    <textarea
                        rows={5}
                        cols={5}
                        placeholder={"Описание"}
                        {...register("body", {required: true})}
                        className={classes.textArea}
                    />
                    <Error name={'body'}/>
                    <div>
                        <div>
                            <h4>Добавить фото</h4>
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
                    <h4>Предварительный просмотр</h4>
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
                    <Button type="submit" disabled={sending || loading ? true : undefined}>Создать объявление</Button>
                </form>
            </MainLayout>
        </>

    );
}