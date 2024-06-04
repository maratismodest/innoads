export const enum MoveImage {
  left = 'left',
  right = 'right',
}

export default function moveImage(images: string[], index: number, where: MoveImage) {
  if (
    images.length < 2 ||
    (index === 0 && where === MoveImage.left) ||
    (index === images.length - 1 && where === MoveImage.right)
  ) {
    return images;
  }

  const arr = [...images];

  if (where === MoveImage.left) {
    arr[index] = images[index - 1];
    arr[index - 1] = images[index];
  }
  if (where === MoveImage.right) {
    arr[index] = images[index + 1];
    arr[index + 1] = images[index];
  }

  return arr;
}
