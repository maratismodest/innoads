import {PostDTO} from '@/types'

import client, {beRoutes} from './createRequest'

export type FetchAdsProps = {
  content: PostDTO[]
  totalPages: number
}

const fetchAds = async (options: Record<string, number>) => {
  const keys = Object.keys(options)
  const params = keys.length > 0 ? ('/?' + keys.map(key => `${key}=${options[key]}`).join('&')) : ''

  const {data} = await client.get<FetchAdsProps>(beRoutes.ads + params)
  return data
}
export default fetchAds
