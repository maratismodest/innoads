import axios from "axios";
import {SECRET} from "../pages/add";

export const handleDeleteImage = async (link: string) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            headers: {
                secret: SECRET
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
