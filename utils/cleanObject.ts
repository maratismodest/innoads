export default function cleanObject(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null && value !== 0 && value !== '')
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, any>
    );
}
