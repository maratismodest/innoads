import axios from "axios";

export const handleDeleteImage = async (link: string) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            data: {
                link: link
            }
        });
        return res.data
    } catch (e) {
        console.log(e)
    }
}
