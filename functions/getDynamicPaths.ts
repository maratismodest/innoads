import axios from "axios";
import {PostInterface} from "interfaces";

export const getDynamicPaths = async (count: number = 12) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?size=${count}`)
        const posts: PostInterface[] = res.data.content
        return posts
    } catch (e) {
        console.log(e)
        return []
    }

}