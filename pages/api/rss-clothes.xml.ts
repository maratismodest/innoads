import {PostInterface} from "../../interfaces";
import axios from "axios";

const {Feed} = require('feed')
const moment = require('moment')

const baseUrl = 'https://innoads.ru';
const author = {
    name: 'Marat Faizer',
    email: 'maratismodest@gmail.com',
    link: 'https://t.me/maratfaizer',
};

const getDynamicPaths = async (count: number = 12) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?size=${count}&category=6`)
        const posts: PostInterface[] = res.data.content
        return posts
    } catch (e) {
        console.log(e)
        return []
    }

}


export default async (req: any, res: any) => {
    // An array with your links
    const posts: PostInterface[] = await getDynamicPaths(100)

    // Construct a new Feed object
    const feed = new Feed({
        title: 'Доска объявлений города Иннополиса',
        description: 'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи',
        id: baseUrl,
        link: baseUrl,
        language: 'ru',
        feedLinks: {
            rss2: `${baseUrl}/api/rss.xml`,
        },
        author,
    });

    // Add each article to the feed
    posts.forEach((post) => {
        const {
            body,
            slug,
            title,
            createdAt,
            preview
            // meta: { date, description, title },
        } = post;
        const url = `${baseUrl}/post/${slug}`;

        feed.addItem({
            title,
            id: url,
            link: url,
            description: body,
            content: body,
            author: [author],
            date: moment(createdAt).toDate(),
            image: preview.split('&')[0]
        });
    });

    res.writeHead(200, {
        "Content-Type": "application/xml",
    });


    res.end(feed.rss2());
};
