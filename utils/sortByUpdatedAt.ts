import { PostInterface } from '../interfaces'

export const sortByUpdatedAt = (posts: PostInterface[]) => posts.sort(function(a, b) {
    if (a.updatedAt > b.updatedAt) {
        return -1
    }
    if (a.updatedAt < b.updatedAt) {
        return 1
    }
    return 0
})