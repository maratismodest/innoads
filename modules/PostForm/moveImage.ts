export enum MoveImage {
    left = 'left',
    right = 'right'
}

export const moveImage = (e: any, images: string[], index: number, where: MoveImage, setImages: (value: string[]) => void) => {
    e.preventDefault()
    // console.log('images', images)
    if (images.length < 2 || (index === 0 && where === MoveImage.left) || (index === images.length - 1 && where === MoveImage.right)) {
        return
    }

    const arr = [...images]

    if (where === MoveImage.left) {
        arr[index] = images[index - 1]
        arr[index - 1] = images[index]
    }
    if (where === MoveImage.right) {
        arr[index] = images[index + 1]
        arr[index + 1] = images[index]
    }

    setImages(arr)
}
