export const DEG = 40;

export const getImageByScore = (value: number) => {
  if (value > 50) {
    return '/assets/lizard.png';
  }
  if (value > 100) {
    return '/assets/crocodile.png';
  }
  return '/assets/frog.png';
};
