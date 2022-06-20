import React, {ReactNode} from "react";
import Head from "next/head";
import Header from "components/Header/Header";

interface Props {
    title?: string;
    description?: string;
    image?: string;
    category?: string;
    price?: string;
    children: ReactNode;
    className?: string;
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

export const MainLayout: React.FC<Props> = ({
                                                children,
                                                title = "Доска объявлений города Иннополис",
                                                description = "Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи.",
                                                image = "/icons/icon-192x192.png",
                                                category,
                                                price,
                                                className
                                            }) => {

    return (
        <>
            <Head>
                <title>
                    {category} {title} {price}
                </title>
                <meta name="keywords" content="innoads, Иннополис, доска объявлений"/>
                <meta name="description" content={description}/>
                <meta name="image" content={image}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://innoads.ru/"/>
                <meta property="og:image" content={image}/>
                <meta name="author" content="InnoAds"/>
            </Head>
            <Header/>
            <main className={className}>{children}</main>
            <footer>
                <div>
                    {/*<Button onClick={scrollToTop}>Навeрх</Button>*/}
                </div>
            </footer>
        </>
    );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
        ...(await serverSideTranslations(locale as string)),
    },
  };
}
