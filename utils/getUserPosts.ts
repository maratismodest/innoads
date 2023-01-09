import axios from "axios";
import {PostInterface} from "interfaces";

export const getUserPosts = async (userId: number): Promise<PostInterface[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?userId=${userId}`)
        return response.data.content
    } catch (e) {
        console.log(e)
        return []
    }
}
