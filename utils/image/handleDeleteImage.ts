import axios from 'axios'

export const handleDeleteImage = async (filename: string) => {
    // console.log('filename', filename)
    try {
        const { data } = await axios.delete(filename)
        return data
    } catch (e) {
        console.log(e)
    }
}
