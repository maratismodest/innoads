import {PostDTO} from '@/types'

export default function sortByCreatedAt(posts: PostDTO[]) {
  return posts.sort(function (a, b) {
    if (a.createdAt > b.createdAt) {
      return -1
    } else if (a.createdAt < b.createdAt) {
      return 1
    } else return 0
  })
}
