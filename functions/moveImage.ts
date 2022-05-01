export enum MoveImage {
    left = "left",
    right = "right"
}

export const moveImage = (e: MouseEvent, images: string[], index: number, where: MoveImage, setImages: any) => {
    e.preventDefault()
    if (images.length < 2) {
        return console.log("Фото или нет или только одно");
    }
    if (
        (index === 0 && where === MoveImage.left) ||
        (index === images.length - 1 && where === MoveImage.right)
    ) {
        return console.log("Фото или первое или последнее");
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

// const moveImage = (e: any, index: number, where: string) => {
//     e.preventDefault();
//     if (images.length < 2) {
//         return console.log("Фото или нет или только одно");
//     }
//     if (
//         (index === 0 && where === "left") ||
//         (index === images.length - 1 && where === "right")
//     ) {
//         return console.log("Фото или первое или последнее");
//     }
//
//     const arr = [...images];
//     const current = arr[index];
//     if (where === "left") {
//         const previous = arr[index - 1];
//         arr[index] = previous;
//         arr[index - 1] = current;
//     }
//     if (where === "right") {
//         const next = arr[index + 1];
//         arr[index] = next;
//         arr[index + 1] = current;
//     }
//
//     setImages(arr);
// };
