import imageCompression from 'browser-image-compression'

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
}

export default async function handleImageResize(imageFile: File) {
  return await imageCompression(imageFile, options)
}

