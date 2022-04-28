/**
 * clamp(-1,0,1)=0
 */
export function clamp(num: number, min: number, max: number): number {
  return num < max ? (num > min ? num : min) : max;
}
