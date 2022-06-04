import axios from "axios";

export const requestConfig = {
    headers: {
        secret: `${process.env.NEXT_PUBLIC_SECRET}`
    },
}

export const handleDeleteImage = async (link: string) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            ...requestConfig,
            data: {
                link: link
            }
        });
        return res.data
    } catch (e) {
        console.log(e)
    }
}
