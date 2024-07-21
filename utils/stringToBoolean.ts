export default function convertToBoolean(value: unknown) {
  if (typeof value === 'string') {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return null;
}
