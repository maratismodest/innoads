import React, {ReactNode} from "react";
import Head from "next/head";
import Header from "../Header/Header";

interface Props {
    title?: string;
    description?: string;
    image?: string;
    category?: string;
    price?: string;
    children: ReactNode
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
                                            }) => {

    return (
        <>
            <Head>
                <title>
                    InnoAds {category} {title} {price}
                </title>
                <meta name="keywords" content="innoads, Иннополис, доска объявлений"/>
                <meta name="description" content={description}/>
                <meta name="image" content={image}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://innoads.ru/"/>
                <meta property="og:image" content={image}/>
            </Head>
            <Header/>
            <main>{children}</main>
            <footer>
                <div>
                    {/*<Button onClick={scrollToTop}>Навeрх</Button>*/}
                </div>
            </footer>
        </>
    );
};

// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common", "footer"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
