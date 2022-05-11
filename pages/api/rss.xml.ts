import {PostInterface} from "../../interfaces";

const {Feed} = require('feed')
const moment = require('moment')

const {SitemapStream, streamToPromise} = require("sitemap");
const axios = require('axios');
const {Readable} = require("stream");

const getDynamicPaths = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?size=100`)
        const posts: PostInterface[] = res.data.content
        return posts
    } catch (e) {
        console.log(e)
        return []
    }

}

const baseUrl = 'https://innoads.ru';
const author = {
    name: 'Marat Faizer',
    email: 'maratismodest@gmail.com',
    link: 'https://t.me/maratfaizer',
};


export default async (req: any, res: any) => {
    // An array with your links
    const posts: PostInterface[] = await getDynamicPaths()

    // Construct a new Feed object
    const feed = new Feed({
        title: 'Доска объявлений города Иннополиса',
        description: 'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи',
        id: baseUrl,
        link: baseUrl,
        language: 'ru',
        feedLinks: {
            rss2: `${baseUrl}/rss.xml`,
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
        console.log('preview', preview.toString())

        feed.addItem({
            title,
            id: url,
            link: url,
            description: body,
            content: body,
            author: [author],
            date: moment(createdAt).toDate(),
            image: preview.split('&')[0]
            // image: 'https://resheto.net/images/mater/pozitivnye_kartinki_2.jpg'
            // date: new Date(date),
        });
    });

    // Create a stream to write to
    // const stream = new SitemapStream({hostname: `https://${req.headers.host}`});
    // const stream = feed.rss2();

    // rss2()

    res.writeHead(200, {
        "Content-Type": "application/xml",
    });

    // const xmlString = await streamToPromise(
    //     Readable.from(links).pipe(feed.rss2())
    // ).then((data: any) => data.toString());

    res.end(feed.rss2());
};