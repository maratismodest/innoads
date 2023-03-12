import {NextApiRequest, NextApiResponse} from 'next'
import dayjs from 'dayjs'
import {Feed} from 'feed'
import fetchPosts from '@/utils/api/fetchAds'
import {seo} from '@/utils/constants'

const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}`

const author = {
  name: 'Marat Faizer',
  email: 'maratismodest@gmail.com',
  link: 'https://t.me/maratfaizer',
}

const RSS = async (req: NextApiRequest, res: NextApiResponse) => {
  // An array with your links
  const {content: posts} = await fetchPosts({size: 100})

  // Construct a new Feed object
  const feed = new Feed({
    copyright: 'InnoAds',
    title: seo.default.title,
    description: seo.default.description,
    id: baseUrl,
    link: baseUrl,
    language: 'ru',
    feedLinks: {
      rss2: `${baseUrl}/api/rss.xml`,
    },
    author,
  })

  // Add each article to the feed
  posts.forEach((post) => {
    const {
      body,
      slug,
      title,
      createdAt,
      preview,
      // meta: { date, description, title },
    } = post
    const url = `${baseUrl}/posts/${slug}`

    feed.addItem({
      title,
      id: url,
      link: url,
      description: body,
      content: body,
      author: [author],
      date: dayjs(createdAt).toDate(),
      image: preview.split('&')[0],
    })
  })

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  })


  res.end(feed.rss2())
}

export default RSS
