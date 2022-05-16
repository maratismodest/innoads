import React, {useEffect, useState} from 'react';
import axios from "axios";
import {isMobile} from 'react-device-detect';
import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {PostInterface} from '../../interfaces';
import Item from '../Item/Item';
import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from './../../styles/Home.module.scss'

import {orderBy} from "lodash";

const getPremiums = async () => {
    try {
        const getPremium = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?category=5`)
        const premium = orderBy(getPremium.data.content, ['createdAt'], ['desc'])
        return premium
    } catch (e) {
        console.log(e)
        return []
    }
}

const temp: PostInterface[] = [{
    "id": 613,
    "title": "Сдам квартиру",
    "body": "Сдаётся 1 комнатная квартира в п. Пустые Моркваши, 5 км от Иннополиса. В квартире есть все необходимое. Подробнее в личку\n\n👤 @Yuliya_Sergeevna_U",
    "price": 10000,
    "preview": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652608691686?alt=media&token=47a49dbf-dd65-4269-94c4-f6958acc7079",
    "images": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652608691686?alt=media&token=47a49dbf-dd65-4269-94c4-f6958acc7079||https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652608691615?alt=media&token=8fb044d5-52bf-44d8-ad10-fcfc19f09266",
    "slug": "sdam-kvartiru-80",
    "telegram": "Yuliya_Sergeevna_U",
    "vector": null,
    "createdAt": "2022-05-15T09:58:12.958Z",
    "updatedAt": "2022-05-15T09:58:12.958Z",
    "tgId": 268078296,
    "categoryId": 5
}, {
    "id": 577,
    "title": "Продам однокомнатную квартиру",
    "body": "Продам однокомнатную квартиру в Иннополисе, Спортивная, 106, кв. 5 с необходимой техникой и мебелью \nСобственник +79172448315 \nЦена 6900000 рублей",
    "price": 6900000,
    "preview": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652361506268?alt=media&token=720d714d-c7f0-473d-a769-edfbf322b769",
    "images": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652361506268?alt=media&token=720d714d-c7f0-473d-a769-edfbf322b769",
    "slug": "prodam-odnokomnatnuyu-kvartiru-46",
    "telegram": "Ayzile_Il",
    "vector": "'+79172448315':16 '106':7 '5':9 '6900000':18 'иннополис':5 'кв':8 'квартир':3,22 'мебел':14 'необходим':11 'однокомнатн':2,21 'прод':1,20 'рубл':19 'собственник':15 'спортивн':6 'техник':12 'цен':17",
    "createdAt": "2022-05-12T13:18:27.756Z",
    "updatedAt": "2022-05-13T06:21:17.969Z",
    "tgId": 815332081,
    "categoryId": 5
}, {
    "id": 559,
    "title": "Продам таунхаус в Зи",
    "body": "Продам таунхаус в Зионе.\n\n101,7 кв.м. 16,3 млн. Детальная информация и больше фото на Авито",
    "price": 16300000,
    "preview": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652283801572?alt=media&token=5f1c4ba5-e4af-48f3-b235-41cf23fa0476",
    "images": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652283801572?alt=media&token=5f1c4ba5-e4af-48f3-b235-41cf23fa0476||https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652283801584?alt=media&token=5cff0343-1664-429f-9868-5159026e319b||https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652283801622?alt=media&token=7d468e24-c3a3-4354-97a1-03ee66df00b4",
    "slug": "prodam-taunhaus-v-zi-73",
    "telegram": "Sergey_Kormilitsin",
    "vector": "'101':5 '16':9 '3':10 '7':6 'авит':18 'детальн':12 'зи':22 'зион':4 'информац':13 'кв':7 'м':8 'млн':11 'прод':1,19 'таунхаус':2,20 'фот':16",
    "createdAt": "2022-05-11T15:43:23.188Z",
    "updatedAt": "2022-05-13T06:21:17.770Z",
    "tgId": 143911983,
    "categoryId": 5
}, {
    "id": 483,
    "title": "https://crm.topnlab.",
    "body": "https://crm.topnlab.ru/object/23217712/ODU5MDI\n\nПродаётся 2-я квартира в Вахитовский район на 2-м этаже 10-этажного кирпичного дома с видом во двор и на р. Волга, Портовая д 37 стр.3.1. надежный застройщик Камастройинвест в ЖК «Живи на Портовой». \n\nДом сдается в июне.",
    "price": 9800000,
    "preview": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1651832810901?alt=media&token=9dbc42a1-45f2-4a59-9cc8-545da34c2dbb",
    "images": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1651832810901?alt=media&token=9dbc42a1-45f2-4a59-9cc8-545da34c2dbb||https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1651832810818?alt=media&token=1e4aeedf-29ad-4004-985d-6992247e4952",
    "slug": "httpscrmtopnlab-83",
    "telegram": "Allavira",
    "vector": "'/object/23217712/odu5mdi':3 '10':15 '2':5,12 '3.1':31 '37':29 'crm.topnlab':44 'crm.topnlab.ru':2 'crm.topnlab.ru/object/23217712/odu5mdi':1 'вахитовск':9 'вид':20 'волг':26 'д':28 'двор':22 'дом':18,40 'жив':37 'жк':36 'застройщик':33 'июн':43 'камастройинвест':34 'квартир':7 'кирпичн':17 'м':13 'надежн':32 'портов':27,39 'продаёт':4 'р':25 'район':10 'сдает':41 'стр':30 'этаж':14 'этажн':16",
    "createdAt": "2022-05-06T10:26:52.508Z",
    "updatedAt": "2022-05-13T06:21:21.942Z",
    "tgId": 51379585,
    "categoryId": 5
}, {
    "id": 423,
    "title": "Сдаю однокомнатную квартиру 53 кв.м. ",
    "body": "Сдаю однокомнатную квартиру 53 кв.м (Спортивная д.114) всё необходимое есть, все вопросы в личку ",
    "price": 1,
    "preview": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/%D0%A4%D0%9E%D0%A2%D0%9E%20%D0%9A%D0%92%D0%90%D0%A0%D0%A2%D0%98%D0%A0%D0%AB.jpg?alt=media&token=40d4264d-169b-4116-b4ff-3a08c72374af",
    "images": "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/%D0%A4%D0%9E%D0%A2%D0%9E%20%D0%9A%D0%92%D0%90%D0%A0%D0%A2%D0%98%D0%A0%D0%AB.jpg?alt=media&token=40d4264d-169b-4116-b4ff-3a08c72374af",
    "slug": "sdayu-odnokomnatnuyu-kvartiru-53-kvm-38",
    "telegram": "OlgaGuseva2020",
    "vector": "'114':9 '53':4,20 'вопрос':14 'всё':10 'д':8 'кв':5,21 'квартир':3,19 'личк':16 'м':6,22 'необходим':11 'однокомнатн':2,18 'сда':1,17 'спортивн':7",
    "createdAt": "2022-04-26T08:22:28.618Z",
    "updatedAt": "2022-05-13T06:21:22.430Z",
    "tgId": 955447686,
    "categoryId": 5
}]
const Premium = () => {
    const [premium, setPremium] = useState<PostInterface[]>(temp)

    useEffect(() => {
        getPremiums().then((res) => setPremium(res))
    }, [])

    return (
        <div>
            <h2 className={classes.title}>Недвижимость</h2>
            <CarouselProvider
                naturalSlideWidth={200}
                naturalSlideHeight={270}
                totalSlides={premium.length}
                visibleSlides={isMobile ? 2 : 4}
                isPlaying={true}
                interval={5000}
                infinite={true}
                hasMasterSpinner={premium.length === 0}
            >
                <Slider>
                    {premium.map((item, index) => {
                        return (
                            <Slide index={index} key={item.id} tabIndex={index}>
                                <Item post={item} margin={5}/>
                            </Slide>
                        )
                    })}
                </Slider>
            </CarouselProvider>
        </div>
    );
};

export default Premium;