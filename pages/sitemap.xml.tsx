import axios from 'axios'
import * as fs from 'fs'
import {GetServerSideProps} from "next"
import {PostInterface} from '../interfaces'

const Sitemap = () => {
    return null
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    const BASE_URL = 'https://innoads.ru'

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?size=1000`)

    const posts: PostInterface[] = response.data.content


    const dynamicPaths = posts.map(post => {
        return `${BASE_URL}/post/${post.slug}`
    })

    const staticPaths = fs
        .readdirSync("pages")
        .filter(staticPage => {
            return ![
                "api",
                "_app.tsx",
                "_document.tsx",
                "404.tsx",
                "sitemap.xml.tsx",
            ].includes(staticPage)
        })
        .map(staticPagePath => {
            return `${BASE_URL}/${staticPagePath.split('.')[0]}`
        })

    const allPaths = [...staticPaths, ...dynamicPaths]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths.map(url => (
        `<url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>`
    )).join("")}
    </urlset>
  `

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
        props: {}
    }
}

export default Sitemap