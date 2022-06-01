import { getDynamicPaths } from "../../functions/getDynamicPaths";
import {PostInterface} from "../../interfaces";

const {SitemapStream, streamToPromise} = require("sitemap");
const {Readable} = require("stream");


export default async (req: any, res: any) => {
    // An array with your links
    const posts: PostInterface[] = await getDynamicPaths(1000)

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