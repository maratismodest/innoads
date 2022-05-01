import axios from "axios";

export async function getUserPosts(tgId: number) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?tgId=${tgId}`)
        return response.data
    } catch (e) {
        console.log(e)
    }

}
