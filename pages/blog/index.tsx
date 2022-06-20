import Header from 'components/Header/Header';
import {MainLayout} from 'components/MainLayout/MainLayout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import {titles} from '../../constants';

const Blog = () => {
    const seoTitle = 'Как выгодно продать на досках объявлений'
    const seoDescription = 'Для начала, постарайтесь сделать хорошое фото вашего товара. Найдите все аксесуары, чеки и упаковку.'
    const canonical = `${process.env.NEXT_PUBLIC_NODE_ENV}/blog`
    return (
        <>
            <Head>
                <title>{seoTitle}</title>
                <link rel="canonical" href={canonical}/>
                <meta name="description" content={seoDescription}/>
                <meta property="og:title" content={seoTitle}/>
                <meta property="og:description" content={seoDescription}/>
                <meta property="og:url" content={canonical}/>
            </Head>
            <MainLayout title={titles.blog}>
                <Header/>
                <h1>Как выгодно продать на досках объявлений</h1>
                <p>20 января 2019</p>
                <br/>
                <p>Наступает момент, когда надо продать вещь. Причины разные: некогда любимый вид спорта перестал
                    вас радовать и надо продать велосипед или гантели, купили новый телефон, переезд. Как выгодно
                    продать?
                </p>
                <br/>
                <p>
                    Для начала, постарайтесь сделать хорошое фото вашего товара. Найдите все аксесуары, чеки и упаковку.
                    Посмотрите сколько стоит такой же товар (яндекс маркет вам в помощь). Лучше ориентироваться на самую
                    низкую цену в сетевых магазинах (он-лайн магазины вам не конкуренты). Если товара уже нет в продаже,
                    постарайтесь найти последнюю цену на нее. Вроде все.
                </p>
                <br/>
                <p>Но на той стороне вас ждет покупатель и ему тоже хочется выгодной сделки. Считается, что
                    психологический барьер - 70 процентов от цены нового товара. Если вы будете продавать дороже, то
                    потенциальный покупатель сможет найти альтернативу в виде купонов, скидок и т.д. Но 30 процентов
                    скидки в магазине он уже вряд ли получит.
                </p>
                <br/>
                <p>Если вам позвонили по объявлению, то не соглашайтесь на просьбу скидки по телефону! Такое часто
                    встречается при продаже машин. Перекупы и просто обыкновенные люди с ходу, даже не увидев машины
                    и не предъявив объективные причины для скидки, ее просят. Если вы согласитесь сразу, то наверняка у
                    них будет соблазн еще скинуть цену при встрече. Если вы уверены в цене, то вы - хозяин ситуации и не
                    соглашайтесь на уступки. Процесс прощания с товаром должен быть приятным и вам, и покупателю.
                </p>
                <br/>
                <p>Если же звонков нет вообще, то попробуйте каждые пару недель скидывать цену с шагом в 5
                    процентов. И рано или поздно покупатель найдется, а возможно он уже приметил объявление, но пока
                    цена его не устраивала.
                </p>
                <br/>
                <p>Приятных сделок!</p>

            </MainLayout>
        </>

    );
};

export default Blog;

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string)),
            // Will be passed to the page component as props
        },
    };
}