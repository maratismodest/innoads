const dayjs = require('dayjs')
import {getDynamicPaths} from "functions/getDynamicPaths";
import {PostInterface} from "interfaces";
import {NextApiRequest, NextApiResponse} from "next";

const TR = require('turbo-rss');

const RSSTurbo = async (req: NextApiRequest, res: NextApiResponse) => {
    const posts: PostInterface[] = await getDynamicPaths(5000)

    const feed = new TR({
        title: 'Доска объявлений города Иннополиса',
        description: 'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи',
        link: 'https://innoads.ru'
    });

    feed.item({
        url: 'https://innoads.ru',
        turboEnabled: false
    })

    posts.forEach((post) => {
        feed.item(
            {
                url: 'https://innoads.ru/post/' + post.slug,
                turboEnabled: false
            }
        )
    })

    const xml = feed.xml();

    res.writeHead(200, {
        "Content-Type": "application/xml",
    });

    res.end(xml);
}

export default RSSTurbo
