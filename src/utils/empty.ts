export function isEmpty(e?: string) {
  return e == null || e.length < 1 || !/\S/.test(e);
}
