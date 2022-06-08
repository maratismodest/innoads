import React, {useMemo} from 'react';
import {isMobile} from 'react-device-detect';
import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import Item from '../Item/Item';
import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from './../../styles/Home.module.scss'

const posts = [
    {
        body: "Индивидуальные занятия онлайн для детей и взрослых.\n\nДля вас:\n-💎определение уровня \n-💎постановка цели\n-💎индивидуальная программа и длительность курса\n-💎помощь с домашними заданиями \n-💎развитие разговорной речи\n-💎результат\n- 💎помощь в поддержании уровня \n\nПервая консультация 15 мин. бесплатно. 💡\n\n#iSpeaker",
        categoryId: 3,
        createdAt: "2022-05-27T07:38:51.062Z",
        id: 800,
        images: "https://chamala.tatar/uploads/1653637130801-1653637129701.jpg",
        preview: "https://chamala.tatar/uploads/1653637130801-1653637129701.jpg",
        price: 700,
        slug: "individualnye-zanyatiya-po-anglijskomu-yazyku-70",
        telegram: "ispeaker_innopolis",
        tgId: 264222567,
        title: "Индивидуальные занятия по английскому языку.",
        updatedAt: "2022-06-03T14:14:24.808Z"
    },
    {
        body: "работает c HDMI, VGA\nсветовой поток 2500 ANSI лм\nконтрастность 4000 : 1\n\n",
        categoryId: 3,
        createdAt: "2022-05-31T15:11:07.328Z",
        id: 917,
        images: "https://chamala.tatar/uploads/1654009760423-1654009760398.jpg",
        preview: "https://chamala.tatar/uploads/1654009760423-1654009760398.jpg",
        price: 400,
        slug: "arenda-proektora-benq-ms502-4",
        telegram: "maratfaizer",
        tgId: 71233480,
        title: "Аренда Проектора BenQ MS502",
        updatedAt: "2022-06-03T14:14:14.235Z"
    },
    {
        body: "✅ 1.Массаж:💆🏻‍♀️💆🏼‍♂️\n🔆Точечный\n🔆Шиацу\n🔆Рэйки \n🔆Баночный \n ❗️Выпрямление, разделение\n позвоночника входит\nв каждый сеанс\n\n    ✍🏻Сеансы провожу\n        ежедневно\nпо предварительной записи\n\n✅ 2. Практические сеансы\n        🙆🏻‍♂️ 🙆🏼‍♀️\n В них входят:\n🔆Практический курс\nпо развитию сознательного\nвнутреннего голоса\n🔆Рефлекторная мануальная гимнастика\n🔆Тайцзицуань\n⏰Длительность\nсеанса:1,5-2ч\n❗️При себе иметь\nбутылочку с водой\nи полотенце средних\nразмеров (примерно 35×70)\n\n✅ 3.Теоретико-практический\n    курс массажа💆🏼‍♀️🙆🏻‍♂\n  Программа курса включает\nизучение техник массажа:\n🔆Точечного \n🔆Шиацу \n🔆Рэйки \n🔆Баночного\n⏰Длительность\nсеанса:1,5-2ч\n     Количество необходимых\n  сеансов будет зависеть\nот практикующего.\n❗️Моделей для проведения\n сеансов по возможности\nприводите с собой.\n Сертификатов не выдаю,\n   могу оставить автограф 😎\n\n    Адрес: Спортивная 128\n    ZIMALETTO правая дверь\n    ✨Массажный кабинет✨\n            (ИОС)\nhttps://t.me/massageinnopolis",
        categoryId: 3,
        createdAt: "2022-05-13T09:10:53.301Z",
        id: 581,
        images: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/20220417_171001.jpg?alt=media&token=9dd3708b-a099-4e9f-a095-d25f16ca5673",
        preview: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/20220417_171001.jpg?alt=media&token=9dd3708b-a099-4e9f-a095-d25f16ca5673",
        price: 1500,
        slug: "predlagaemye-procedury-94",
        telegram: "NEIJO",
        tgId: 744555501,
        title: "❇️Предлагаемые процедуры:",
        updatedAt: "2022-06-03T14:14:29.613Z",
    },
    {
        body: "Подробности в нашем чате https://t.me/ult_ramen",
        categoryId: 3,
        createdAt: "2022-05-18T12:14:08.253Z",
        id: 651,
        images: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652876046486?alt=media&token=543e4d1c-c704-4d50-bb4f-e8242cd08b24",
        preview: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652876046486?alt=media&token=543e4d1c-c704-4d50-bb4f-e8242cd08b24",
        price: 0,
        slug: "novoe-menyu-v-ultramen-66",
        telegram: "TimurYussupov",
        tgId: 55080988,
        title: "Новое меню в ultramen!",
        updatedAt: "2022-06-03T14:14:21.062Z",
    }
]
const Premium = () => {
    // const [premium, setPremium] = useState<PostInterface[]>(posts)
    const premium = useMemo(() => posts, [])
    // useEffect(() => {
    //     getPremiums().then((res) => setPremium(res))
    // }, [])

    return (
        <div>
            <h2 className={classes.title}>Премиум объявления</h2>
            <CarouselProvider
                naturalSlideWidth={200}
                naturalSlideHeight={270}
                totalSlides={premium.length}
                visibleSlides={isMobile ? 2 : 4}
                isPlaying={true}
                interval={4000}
                infinite={true}
                hasMasterSpinner={premium.length === 0}
            >
                <Slider>
                    {premium.map((item, index) => {
                        return (
                            <Slide key={index} index={index} tabIndex={index}>
                                <div style={{margin: 4}}>
                                    <Item post={item}/>
                                </div>
                            </Slide>
                        )
                    })}
                </Slider>
            </CarouselProvider>
        </div>
    );
};

export default Premium;