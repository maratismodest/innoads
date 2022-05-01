import axios from 'axios'
import * as fs from 'fs'
import {GetServerSideProps} from "next"
import {PostInterface} from '../interfaces'

type Product = {
    id: string
    name: string
    price: number
}

async function getDynamicPaths() {
    try {
        const res = await axios.get("https://innoads-backend-two.herokuapp.com/post?size=1000")
        const posts: PostInterface[] = res.data.content
        return posts
        // return posts.map((post) => `/post/${post.slug}`);
    } catch (e) {
        console.log(e)
        return []
    }

}

// function getAllProducts() : Product[] {
//     return [{
//         id: '1',
//         name: 'MacBook Pro',
//         price: 129900
//     }, {
//         id: '2',
//         name: 'iPhone 13 Mini',
//         price: 79490
//     }, {
//         id: '3',
//         name: 'iPhone 13 Pro',
//         price: 99990
//     }]
// }

const Sitemap = () => {
    return null
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    const BASE_URL = 'https://innoads.ru'

    const products: PostInterface[] = await getDynamicPaths() // Здесь может быть вызов с любого API

    const dynamicPaths = products.map(post => {
        return `${BASE_URL}/product/${post.slug}`
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