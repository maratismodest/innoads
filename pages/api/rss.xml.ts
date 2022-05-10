import {PostInterface} from "../../interfaces";
const {Feed} = require('feed')
const moment = require('moment')

const {SitemapStream, streamToPromise} = require("sitemap");
const axios = require('axios');
const {Readable} = require("stream");

const getDynamicPaths = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?size=1000`)
        const posts: PostInterface[] = res.data.content
        return posts
    } catch (e) {
        console.log(e)
        return []
    }

}

const baseUrl = 'https://innoads.ru';
const author = {
    name: 'Ashlee Boyer',
    email: 'hello@ashleemboyer.com',
    link: 'https://twitter.com/ashleemboyer',
};




export default async (req: any, res: any) => {
    // An array with your links
    const posts: PostInterface[] = await getDynamicPaths()

    const links = posts.map((post) => {
        return {url: `/post/${post.slug}`, changefreq: "daily", priority: 0.3}
    });

    // Construct a new Feed object
    const feed = new Feed({
        title: 'Articles by Ashlee M Boyer',
        description:
            "You can find me talking about issues surrounding Disability, Accessibility, and Mental Health on Twitter, or you can find me regularly live-knitting or live-coding on Twitch. I'm @AshleeMBoyer on all the platforms I use.",
        id: baseUrl,
        link: baseUrl,
        language: 'en',
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
            createdAt
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