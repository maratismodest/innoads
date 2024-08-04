export const DEG = 40;

export const getImageByScore = (value: number) => {
  if (value > 50) {
    return '/assets/lizard.png';
  }
  return '/assets/frog.png';
};
