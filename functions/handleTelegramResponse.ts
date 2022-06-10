import axios from "axios";

export const handleTelegramResponse = async (response: any, login: any) => {
    try {
        login(response)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram`, response)
        console.log('res', res)
        return res
    } catch (e) {
        console.log(e)
    }

};
