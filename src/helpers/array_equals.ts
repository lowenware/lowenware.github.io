export default function array_equals<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((val, index) => {
    return val === b[index];
  });
}
