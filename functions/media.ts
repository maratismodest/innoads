export const media = (images: string[]) => {
    return images.map(image => {
        return {
            "type": "photo",
            "media": image
        }
    })
}
