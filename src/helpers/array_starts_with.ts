export default function array_starts_with<T>(array: T[], ...params: T[]) {
  if (array.length < params.length)
    return false;

  for (let i = 0; i < params.length; i++) {
    if (array[i] != params[i]) {
      return false;
    }
  }

  return true;
}
