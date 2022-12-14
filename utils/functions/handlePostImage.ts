import axios from 'axios'

interface PostImageProps {
    status: 'ok' | 'error'
    value: string
}

export const handlePostImage = async (
    formData: FormData
): Promise<PostImageProps> => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        return {
            status: 'ok',
            value: res.data.link as string,
        }
    } catch (e) {
        console.log(e)
        return {
            status: 'error',
            value: 'Что-то пошло не так, попробуйте повторить',
        }
    }
}
