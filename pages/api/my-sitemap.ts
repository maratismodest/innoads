import {PostInterface} from "../../interfaces";

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

const Sitemap = async (req: any, res: any) => {
    // An array with your links
    const posts: PostInterface[] = await getDynamicPaths()

    const links = posts.map((post) => {
        return {url: `/post/${post.slug}`, changefreq: "daily", priority: 0.3}
    });

    // Create a stream to write to
    const stream = new SitemapStream({hostname: `https://${req.headers.host}`});

    res.writeHead(200, {
        "Content-Type": "application/xml",
    });

    const xmlString = await streamToPromise(
        Readable.from(links).pipe(stream)
    ).then((data: any) => data.toString());

    res.end(xmlString);
};

export default Sitemap