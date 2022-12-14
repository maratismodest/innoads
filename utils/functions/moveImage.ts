export enum MoveImage {
    left = "left",
    right = "right"
}

export const moveImage = (e: MouseEvent, images: string[], index: number, where: MoveImage, setImages: (value: string[]) => void) => {
    e.preventDefault()
    if (images.length < 2 || (index === 0 && where === MoveImage.left) || (index === images.length - 1 && where === MoveImage.right)) {
        return
    }

    const arr = [...images];
    const current = arr[index];

    if (where === MoveImage.left) {
        const previous = arr[index - 1];
        arr[index] = previous;
        arr[index - 1] = current;
    }
    if (where === MoveImage.right) {
        const next = arr[index + 1];
        arr[index] = next;
        arr[index + 1] = current;
    }

    setImages(arr)
};
