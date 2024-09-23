// @ts-nocheck
export function closest(arr: number[], target: number) {
  return arr.reduce((pre, cur) =>
    Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur
  );
}
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean
) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }
    return ret;
  }, {} as Writeable<Pick<T, U>>);
}