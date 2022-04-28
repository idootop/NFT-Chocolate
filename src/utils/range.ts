export function range<T = any>(
  length: number,
  generate?: (v: any, k: number) => T
) {
  //@ts-ignore
  return Array.from<T, T>({ length }, generate ?? ((_, i) => i));
}
