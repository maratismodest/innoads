interface MediaProps {
    type: "photo",
    media: string
}

export const media = (images: string[]): MediaProps[] => {
    return images.map(image => {
        return {
            type: "photo",
            media: image
        }
    })
}
