import React, {useEffect, useState} from "react";
import {MainLayout} from "components/MainLayout";
import {storage} from "firebaseConfig";
import {useRouter} from "next/router";
import Input from "components/Input/Input";
import Image from "next/image";
import Button from "components/Button/Button";
import SelectInno from "components/Select/Select";
// import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Icon from "components/Icon/Icon";
import {isDesktop} from "react-device-detect";
import cn from "classnames";
import axios from "axios";
import {Controller, useForm} from "react-hook-form";
import {options} from 'assets/options'
import addClasses from "styles/classes.module.scss";
import {useAuth} from "../context/AuthContext";
import {MoveImage, moveImage} from "functions/moveImage";
import {onImageClick} from "functions/onImageClick";
import {PostInterface} from "../interfaces";
import handleImageUpload from "../functions/handleImageUpload";

export default function Edit() {
    const router = useRouter();
    const {user, login, logout} = useAuth();
    const [post, setPost] = useState<PostInterface>()
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState("");
    const {control, register, handleSubmit, watch, formState: {errors}} = useForm();

    useEffect(() => {
        const getPost = localStorage.getItem("post")
        if (getPost) {
            const currentPost = JSON.parse(getPost)
            setPost(currentPost)
            const images = currentPost.images.split("||")
            setImages(images);
        }
    }, [])

    if (!post) {
        return (
            <MainLayout title="Доска объявлений города Иннополис">
                <div>Загрузка ...</div>
            </MainLayout>
        )
    }
    const {
        title,
        body,
        preview,
        categoryId,
        price,
        createdAt,
        telegram,
        tgId
    } = post;

    const defaultValues = {
        title: title,
        body: body,
        preview: preview,
        categoryId: categoryId,
        price: price,
        createdAt: createdAt,
        telegram: telegram,
        tgId: tgId
    };

    const onSubmit = async (data: any) => {
        if (images.length === 0) {
            return setError("Добавить хотя бы одно фото!");
        }
        const {title, body, price, category, telegram, slug} = data
        // const slugTitle = slugF(title) + "-" + Math.floor(Math.random() * 100)
        const categoryValue = category.value

        const formData = {
            id: post.id,
            title: title,
            body: body,
            price: Number(price),
            tgId: tgId,
            preview: images[0],
            images: images.join('||'),
            slug: slug,
            categoryId: categoryValue,
            telegram: telegram,
        };

        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post`, formData)
        localStorage.removeItem("post")
        alert("Ваше объявление обновится на сайте через 10 секунд!")
        return router.push("/profile");
    }

    const imageHandler = async (e: any) => {
        const imagesFromInput = e.target.files;
        const length = imagesFromInput.length + images.length;
        if (length > 4) {
            return setError("Не больше 4 фотографий!");
        }
        const list: any[] = [];

        async function Res() {
            for (let i = 0; i < imagesFromInput.length; i++) {
                const initialImage = imagesFromInput[i];
                const resizedImage = await handleImageUpload(initialImage);
                if (resizedImage) {
                    const image = storage.ref().child(initialImage.name);
                    await image.put(resizedImage);
                    const imageLink = await image.getDownloadURL();
                    list.push(imageLink);
                }

            }
            setImages((prevState: any) => [...prevState, ...list]);
            setError("");
        }

        Res();
    };

    const deleteImage = (current: string) => {
        const res = images.filter((image: string) => image !== current);
        setImages(res);
    };


    return (
        <MainLayout title={"Редактировать объявление"}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    maxWidth: 400,
                    position: "relative",
                }}
            >
                <Controller
                    name="category"
                    control={control}
                    rules={{required: true}}
                    render={({field}: any) => <SelectInno
                        {...field}
                        options={options}
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
                    defaultValue={defaultValues.price}
                />
                {errors.price && <span>Поле обязательно для заполнения</span>}
                <Input
                    type="text"
                    placeholder="Заголовок"
                    register={register}
                    required={true}
                    name="title"
                    defaultValue={defaultValues.title}
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
                    defaultValue={defaultValues.body}
                />
                {errors.body && <span>Поле обязательно для заполнения</span>}
                <div>
                    <div>
                        <h4>Добавить фото</h4>
                        <div
                            className={cn({
                                [addClasses.image]: isDesktop,
                                [addClasses.imageMobile]: !isDesktop,
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
                    />
                </div>
                Предварительный просмотр
                <ul
                    className={cn({
                        [addClasses.images]: isDesktop,
                        [addClasses.imagesMobile]: !isDesktop,
                    })}
                >
                    {images.map((image: any, index: number) => {
                        return (
                            <li
                                key={image}
                                className={cn({
                                    [addClasses.image]: isDesktop,
                                    [addClasses.imageMobile]: !isDesktop,
                                })}
                            >
                                <Image
                                    alt={image}
                                    src={image}
                                    objectFit="cover"
                                    layout={"fill"}
                                />
                                <Icon
                                    style={{position: "absolute", top: "40%", left: 0}}
                                    onClick={(e: any) => {
                                        moveImage(e, images, index, MoveImage.left, setImages);
                                    }}
                                >
                                    &larr;
                                </Icon>
                                <Icon
                                    style={{position: "absolute", top: "40%", right: 0}}
                                    onClick={(e: any) => {
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
                </ul>
                {/*<Input*/}
                {/*    type="text"*/}
                {/*    placeholder="Ссылка на telegram @username"*/}
                {/*    register={register}*/}
                {/*    required={true}*/}
                {/*    name="telegram"*/}
                {/*    defaultValue={defaultValues.telegram}*/}
                {/*/>*/}
                {/*{errors.telegram && <span>Поле обязательно для заполнения</span>}*/}
                {error}
                <Button type={"submit"}>Сохранить изменения</Button>
            </form>
        </MainLayout>
    );

}

// export async function getStaticProps({locale}: any) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ["translate"])),
//             // Will be passed to the page component as props
//         },
//     };
// }
