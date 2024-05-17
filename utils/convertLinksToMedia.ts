export const convertLinksToMedia = (images: string[], caption: string) =>
  images.map((media, index) =>
    index === 0
      ? {
          type: 'photo',
          media,
          caption,
        }
      : {
          type: 'photo',
          media,
        }
  );
