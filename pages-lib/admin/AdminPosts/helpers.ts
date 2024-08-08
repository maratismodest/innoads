export const validateCheckboxes = (published: boolean, unpublished: boolean) => {
  if (published && !unpublished) return true;
  if (!published && unpublished) return false;
  return undefined;
};
