import axios from "axios";

export const handleDeleteImage = async (link: string) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            headers: {
                secret: `${process.env.NEXT_PUBLIC_SECRET}`
            },
            data: {
                link: link
            }
        });
        return res.data
    } catch (e) {
        console.log(e)
    }
}
