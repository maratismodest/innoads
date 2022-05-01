import axios from "axios";

export const handleTelegramResponse = async (response: any, login: any) => {
    login(response)
    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram`, response)
};
