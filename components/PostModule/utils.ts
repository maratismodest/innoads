import axios from 'axios';
import imageCompression from 'browser-image-compression';

const formats = ['.jpg', '.jpeg', '.png'] as const;

const ACCEPTED_IMAGE_FORMAT = formats.join(', ');

const compressionOptions = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};

const handleImageResize = async (imageFile: File) =>
  await imageCompression(imageFile, compressionOptions);

const localUploadApi = '/api/uploads';
const externalUploadApi = `${process.env.NEXT_PUBLIC_API_URL}/uploads`;

const handlePostImage = async (formData: FormData) => {
  const isVds = false;
  console.log('isVds', isVds);
  try {
    const { data } = await axios.post(isVds ? localUploadApi : externalUploadApi, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // secret: `${process.env.REACT_APP_SECRET}`,
      },
    });
    if (data.hasOwnProperty('link')) {
      return data.link;
    }
  } catch (e) {
    console.log(e);
  }
};

export { ACCEPTED_IMAGE_FORMAT, compressionOptions, handleImageResize,handlePostImage };
