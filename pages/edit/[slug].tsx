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
import {HTMLInputEvent, PostInterface} from "interfaces";
import type {GetServerSideProps} from "next";
import Image from "next/image";
import {useRouter} from "next/router";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {isDesktop} from "react-device-detect";
import {Controller, useForm} from "react-hook-form";
import classes from "styles/classes.module.scss";
import {ACCEPTED_IMAGE_FORMAT, NO_IMAGE, routes, titles} from "../../constants";

interface PostProps {
    post: PostInterface
}

export default function Edit({post: serverPost}: PostProps) {
    const {
        title,
        body,
        categoryId,
        price,
        telegram,
        tgId,
        id
    } = serverPost;
    const router = useRouter()
    const [images, setImages] = useState<string[]>(() => serverPost.images.split('||'));
    const [error, setError] = useState("");
    const defaultValues = {
        category: options.find(x => x.value === categoryId),
        title,
        price,
        body
    };
    const {control, register, handleSubmit, formState: {errors}} = useForm({defaultValues});
    const {user} = useAuth();
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)


    const inputEl = useRef();

    const redirect = useCallback(async () => {
        await router.push(routes.profile)
    }, [router])

    useEffect(() => {
        const res = document.getElementById('hidden')
        if (res && (!user || !user.username)) {
            res.click()
        }
    }, [user])

    if (!user || !user.username) {
        return (
            <MainLayout title={"Добавить объявление"}>
                <div className={classes.center}>
                    <Spinner/>
                    <Button id='hidden' onClick={redirect}>Hidden</Button>
                </div>
            </MainLayout>
        )
    }


    const onSubmit = async (data: any) => {
        if (images.length === 0) {
            return setError("Добавить хотя бы одно фото!");
        }
        const {title, body, price, category} = data
        const categoryValue = category.value

        const formData = {
            title: title,
            body: body,
            price: Number(price),
            preview: images[0],
            images: images.join('||'),
            telegram,
            tgId,
            categoryId: categoryValue,
            id,
        }

        setSending(true)
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post`, formData, requestConfig)
        alert("Ваше объявление отправлено в канал InnoAds, а скоро появится на сайте!")
        setSending(false)

        return router.push(routes.profile);
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

    return (
        <MainLayout title={titles.edit}>
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
                        options={options}
                        defaultValue={options.find(x => x.value === categoryId)}
                    />}
                />
                {errors.category && <span>Поле обязательно для заполнения</span>}
                <div style={{marginBottom: 10}}></div>
                <Input
                    type="number"
                    placeholder="Цена"
                    register={register}
                    required={true}
                    name="price"
                    defaultValue={price}
                />
                {errors.price && <span>Поле обязательно для заполнения</span>}
                <Input
                    type="text"
                    placeholder="Заголовок"
                    register={register}
                    required={true}
                    name="title"
                    defaultValue={title}
                />
                {errors.title && <span>Поле обязательно для заполнения</span>}
                <textarea
                    style={{
                        borderRadius: 4,
                        marginBottom: 10,
                        padding: 15,
                    }}
                    rows={5}
                    cols={5}
                    placeholder={"Описание"}
                    {...register("body", {required: true})}
                    defaultValue={body}
                />
                {errors.body && <span>Поле обязательно для заполнения</span>}
                <div>
                    <div>
                        <h4>Добавить фото</h4>
                        <div
                            className={cn({
                                [classes.image]: isDesktop,
                                [classes.imageMobile]: !isDesktop,
                            })}
                            onClick={onImageClick}
                            style={{cursor: "pointer"}}
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
                <Button type="submit" disabled={sending}>Сохранить изменения</Button>
            </form>
        </MainLayout>
    );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${context.query.slug}`)
    if (!query) {
        return {
            notFound: true,
        };
    }
    const snapshot = query.data;
    return {
        props: {post: snapshot, slug: snapshot.slug},
    };
}
