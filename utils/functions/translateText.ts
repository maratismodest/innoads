import axios from "axios";

export const googleTranslateText = async (text: string): Promise<string> => {
    const URL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t&q=${text}`;
    try {
        const {data} = await axios.get(URL)
        const res = data[0][0][0] as string
        return res
    } catch (e) {
        console.log('e', e)
        return ''
    }
};