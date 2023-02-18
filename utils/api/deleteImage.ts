import client from './createRequest'

const deleteImage = async (filename: string) => {
    try {
        const { data } = await client.delete(filename)
        return data
    } catch (e) {
        console.log(e)
    }
}

export default deleteImage
