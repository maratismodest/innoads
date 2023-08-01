export default function sortByCreatedAt<T>(list: Array<T & { createdAt: string }>) {
  return list.sort(function(a, b) {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else if (a.createdAt < b.createdAt) {
      return 1;
    } else return 0;
  });
}
