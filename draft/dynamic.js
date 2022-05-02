const {configureSitemap} = require("@sergeymyssak/nextjs-sitemap");
const axios = require("axios")

async function getDynamicPaths() {
    try {
        const res = await axios.get("https://innoads-backend-two.herokuapp.com/post?size=1000")
        const posts = res.data.content
        return posts.map((post) => `/post/${post.slug}`);
    } catch (e) {
        console.log(e)
    }

}

getDynamicPaths().then((paths) => {
    const Sitemap = configureSitemap({
        domains: [{domain: 'innoads.ru', defaultLocale: 'ru'}],
        include: paths,
        exclude: ['/post/*'],
        excludeIndex: true,
        pagesConfig: {
            '/post/*': {
                priority: '0.5',
                changefreq: 'daily',
            },
        },
        trailingSlash: true,
        targetDirectory: __dirname + '/public',
        pagesDirectory: __dirname + '/pages',
    });

    Sitemap.generateSitemap();
});