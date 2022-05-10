import {Feed} from "feed";
import * as fs from "fs";
import moment from 'moment'

const generateRSSFeed = (articles) => {
    const baseUrl = 'https://innoads.ru';
    const author = {
        name: 'Ashlee Boyer',
        email: 'hello@ashleemboyer.com',
        link: 'https://twitter.com/ashleemboyer',
    };

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
    articles.forEach((post) => {
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

    // Write the RSS output to a public file, making it
    // accessible at ashleemboyer.com/rss.xml
    fs.writeFileSync('public/rss.xml', feed.rss2());
};

export default generateRSSFeed