import imageCompression from 'browser-image-compression';

const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 600,
    useWebWorker: true
}

async function handleImageUpload(imageFile: any) {
    try {
        return await imageCompression(imageFile, options);
    } catch (error) {
        console.log(error);
    }

}

export default handleImageUpload
