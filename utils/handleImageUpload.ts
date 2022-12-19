import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true
}

const handleImageUpload = async (imageFile: File) => {
  try {
    return await imageCompression(imageFile, options);
  } catch (error) {
    console.log(error);
  }

}

export default handleImageUpload
