import {PostInterface} from '../interfaces'

export const sortByUpdatedAt = (posts: PostInterface[]) => posts.sort(function (a, b) {
  if (a.updatedAt > b.updatedAt) {
    return -1
  }
  if (a.updatedAt < b.updatedAt) {
    return 1
  }
  return 0
})

export const sortByCreatedAt = (posts: PostInterface[]) => posts.sort(function (a, b) {
  if (a.createdAt > b.createdAt) {
    return -1
  }
  if (a.createdAt < b.createdAt) {
    return 1
  }
  return 0
})
