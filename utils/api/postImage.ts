import { messages } from '../constants'

import client from './createRequest'

interface PostImageProps {
    status: 'ok' | 'error'
    value: string
}

const postImage = async (formData: FormData): Promise<PostImageProps> => {
    try {
        const res = await client.post('/uploads',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
        return {
            status: 'ok',
            value: res.data.link as string,
        }
    } catch (e) {
        console.log(e)
        return {
            status: 'error',
            value: messages.somethingWentWrong,
        }
    }
}

export default postImage
