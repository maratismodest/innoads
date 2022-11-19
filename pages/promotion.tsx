import MainLayout from 'components/MainLayout/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { GetStaticProps } from 'next/types'
import React from 'react'

const Promotion = () => {
    return (
        <MainLayout>
            <h1>Реклама</h1>
            <Image
                src="/promotion/preview.jpg"
                alt="preview"
                height={300}
                width={300}
                style={{ objectFit: 'cover' }}
            />
            <p>
                В боте https://t.me/innoadshelpbot появилась новая рекламная
                функция! После подачи объявления, пользователь будет видеть ваш
                уникальный рекламный пост. Пост включает в себя изображение и
                текст.
            </p>
            <br />
            <p>
                Особенность такой рекламы в том, что внимание пользователя при
                подаче объявления полностью сфокусировано на приложении и ваша
                реклама не останется незамеченной.
            </p>
            <br />
            <p>
                Такой формат рекламы в боте вызывает меньше раздражения и он
                показывается активной целевой аудитории.
            </p>
            <br />

            <p>
                Такую рекламу нельзя убрать при помощи блокировщика AdsBlocker и
                похожими инструментами
            </p>
            <br />
            <p>
                Для рекламы напишите @innoadsadmin Стоимость одного показа - 5
                рублей. Минимум 100 показов
            </p>
            <br />
        </MainLayout>
    )
}

export default Promotion

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
