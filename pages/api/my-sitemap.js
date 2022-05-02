const {SitemapStream, streamToPromise} = require("sitemap");
const axios = require('axios');
const {Readable} = require("stream");

async function getDynamicPaths() {
    try {
        const res = await axios.get("https://innoads-backend-two.herokuapp.com/post?size=1000")
        const posts = res.data.content
        return posts.map((post) => `/post/${post.slug}`);
    } catch (e) {
        console.log(e)
    }

}

export default async (req, res) => {
    // An array with your links
    const posts = await getDynamicPaths()

    const links = posts.map((link) => {
        return {url: link, changefreq: "daily", priority: 0.3}
    });

    // const links = [
    //     {url: "/blog/my-first-blog-post/", changefreq: "daily", priority: 0.3},
    //     {url: "/blog/my-second-blog-post", changefreq: "daily", priority: 0.3},
    //     {url: "/blog/my-third-blog-post/", changefreq: "daily", priority: 0.3},
    // ];

    // Create a stream to write to
    const stream = new SitemapStream({hostname: `https://${req.headers.host}`});

    res.writeHead(200, {
        "Content-Type": "application/xml",
    });

    const xmlString = await streamToPromise(
        Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    res.end(xmlString);
};