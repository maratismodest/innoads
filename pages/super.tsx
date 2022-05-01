import React, {useState} from "react";
import {MainLayout} from "components/MainLayout";
import {storage} from "firebaseConfig";
import {useRouter} from "next/router";
import Input from "components/Input/Input";
import Image from "next/image";
import Button from "components/Button/Button";
import SelectInno from "components/Select/Select";
// @ts-ignore
import slug from "slug";
import Icon from "components/Icon/Icon";
import {isDesktop} from "react-device-detect";
import cn from "classnames";
import classes from "styles/classes.module.scss";
import axios from "axios";
import {Controller, useForm} from "react-hook-form";
import {options} from 'assets/options'
import {MoveImage, moveImage} from "functions/moveImage";
import {media} from "functions/media";
import {onImageClick} from "functions/onImageClick";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import handleImageUpload from "../functions/handleImageUpload";

export default function Super() {
    const router = useRouter()
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState("");
    const {control, register, handleSubmit, watch, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    const onSubmit = async (data: any) => {
        if (images.length === 0) {
            return setError("Добавить хотя бы одно фото!");
        }
        const {title, body, price, category, telegram} = data
        const slugTitle = slug(title) + "-" + Math.floor(Math.random() * 100)
        const categoryValue = category.value

        const formData = {
            title: title,
            body: body,
            price: Number(price),
            preview: images[0],
            images: images.join('||'),
            slug: slugTitle,
            telegram: telegram,
            tgId: 71233480,
            categoryId: categoryValue
        }

        setSending(true)
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, formData)
        alert("Пожалуйста, подождите немного: передача объявления в канал InnoAds занимает до 10 секунд!")
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, formData)
        alert("Ваше объявление отправлено в канал InnoAds, а скоро появится на сайте!")
        setSending(false)
        return router.push("/profile");
        // return router.push("/profile");
    }

    async function getCompressedImagesLinks(imagesFromInput: any) {
        for (let i = 0; i < imagesFromInput.length; i++) {
            const initialImage = imagesFromInput[i];
            const resizedImage = await handleImageUpload(imagesFromInput[i]);
            if (resizedImage) {
                const image = storage.ref().child(initialImage.name);
                await image.put(resizedImage);
                const imageLink = await image.getDownloadURL();
                setImages((prevState: string[]) => [...prevState, imageLink]);
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
        const res = images.filter((image: string) => image !== current);
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
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'red',
                                height: '100%',
                                width: '100%',
                                textAlign: 'center',
                                border: '1px solid grey',
                                borderRadius: 4
                            }}><p>
                                Загружаем изображение
                            </p></div>
                        </li>
                    )}
                </ul>
                <Input
                    type="text"
                    placeholder="Ссылка на telegram @username"
                    register={register}
                    required={true}
                    name="telegram"
                />
                {errors.telegram && <span>Поле обязательно для заполнения</span>}
                {error}
                <Button type="submit" disabled={sending}>Создать объявление</Button>
            </form>
        </MainLayout>
    );
}




