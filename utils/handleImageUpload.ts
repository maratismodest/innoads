import imageCompression from 'browser-image-compression'

const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
}

const handleImageResize = async (imageFile: File) => await imageCompression(imageFile, options)

export default handleImageResize
