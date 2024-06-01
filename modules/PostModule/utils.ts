import axios from 'axios';
import imageCompression from 'browser-image-compression';

const formats = ['.jpg', '.jpeg', '.png'] as const;

const ACCEPTED_IMAGE_FORMAT = formats.join(', ');

const compressionOptions = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};

const handleImageResize = async (imageFile: File) => {
  return await imageCompression(imageFile, compressionOptions);
};

const handlePostImage = async (formData: FormData) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // secret: `${process.env.REACT_APP_SECRET}`,
      },
    });
    return data.link;
  } catch (e) {
    console.log(e);
  }
};

export { handlePostImage, ACCEPTED_IMAGE_FORMAT, compressionOptions, handleImageResize };
