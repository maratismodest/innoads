import React, {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
// @ts-ignore
import slug from "slug";
import {isDesktop} from "react-device-detect";
import cn from "classnames";
import classes from "../styles/classes.module.scss";
import axios from "axios";
import {Controller, useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import handleImageUpload from "../functions/handleImageUpload";
import {routes} from "../constants";
import Spinner from "../components/Spinner/Spinner";
import {MainLayout} from "../components/MainLayout/MainLayout";
import Button from "../components/Button/Button";
import {storage} from "../firebaseConfig";
import Input from "../components/Input/Input";
import {options} from "../assets/options";
import SelectInno from "../components/Select/Select";
import {onImageClick} from "../functions/onImageClick";
import Icon from "../components/Icon/Icon";
import {MoveImage, moveImage} from "../functions/moveImage";

export default function Add() {
    const router = useRouter()
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState("");
    const {control, register, handleSubmit, watch, formState: {errors}} = useForm();
    const {user} = useAuth();
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    const inputEl = useRef();

    const redirect = useCallback(() => {
        router.push(routes.profile)
    }, [router, inputEl.current])

    useEffect(() => {
        const res = document.getElementById('hidden')
        if (res && (!user || !user.username)) {
            res.click()
        }
    }, [user])

    // if (!user || !user.username) {
    //     return (
    //         <MainLayout title={"Добавить объявление"}>
    //             <div className={classes.center}>
    //                 <Spinner/>
    //                 <Button id='hidden' onClick={redirect}>Hidden</Button>
    //             </div>
    //         </MainLayout>
    //     )
    // }

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
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, formData)
        alert("Пожалуйста, подождите немного: передача объявления в канал InnoAds занимает до 10 секунд!")
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, formData)
        alert("Ваше объявление отправлено в канал InnoAds, а скоро появится на сайте!")
        setSending(false)

        return router.push("/profile");
    }

    async function getCompressedImagesLinks(imagesFromInput: any) {
        for (let i = 0; i < imagesFromInput.length; i++) {
            const initialImage = imagesFromInput[i];
            const resizedImage = await handleImageUpload(imagesFromInput[i]);
            if (resizedImage) {
                const formData = new FormData();
                formData.append("image", resizedImage);
                const res = await axios.post('https://innoads-fileserver.herokuapp.com', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                // const image = storage.ref().child(initialImage.name);
                // await image.put(resizedImage);
                // const imageLink = await image.getDownloadURL();
                setImages((prevState: string[]) => [...prevState, res.data.link]);
            }
        }
        setError("");
    }

    const imageHandler = async (e: any) => {
        const imagesFromInput = e.target.files;
        const length = imagesFromInput.length + images.length;
        if (length > 4) {
            return setError("Не больше 4 фотографий!");
        }
        setLoading(true)
        await getCompressedImagesLinks(imagesFromInput);
        setLoading(false)
    };

    const deleteImage = (current: string) => {
        const res = images.filter(image => image !== current)
        setImages(res);
    };

    return (
        <MainLayout title={"Добавить объявление"}>
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
                        // defaultValue={options[0]}
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
                />
                {errors.price && <span>Поле обязательно для заполнения</span>}
                <Input
                    type="text"
                    placeholder="Заголовок"
                    register={register}
                    required={true}
                    name="title"
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
                                src={"/no-image.jpeg"}
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
                        accept=".jpg, .jpeg, .png"
                    />
                </div>
                Предварительный просмотр
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
                                    blurDataURL="/no-image.jpeg"
                                />
                                <Icon
                                    style={{position: "absolute", top: "40%", left: 0}}
                                    onClick={(e: MouseEvent) => {
                                        moveImage(e, images, index, MoveImage.left, setImages);
                                    }}
                                >
                                    &larr;
                                </Icon>
                                <Icon
                                    style={{position: "absolute", top: "40%", right: 0}}
                                    onClick={(e: MouseEvent) => {
                                        moveImage(e, images, index, MoveImage.right, setImages);
                                    }}
                                >
                                    &rarr;
                                </Icon>
                                <Icon
                                    style={{position: "absolute", top: 0, right: 0}}
                                    onClick={() => {
                                        deleteImage(image);
                                    }}
                                >
                                    X
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
                            <div className={classes.loadingImage}>
                                <p>Загружаем изображение</p>
                            </div>
                        </li>
                    )}
                </ul>

                {error}
                <Button type="submit" disabled={sending}>Создать объявление</Button>
            </form>
        </MainLayout>
    );
}