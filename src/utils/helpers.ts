/* eslint-disable no-param-reassign */
import { Props } from "src/layout/block/types";

// Checking for an empty field
export const isEmptyField = (data: { [x: string]: string }) => {
  const empty = Object.keys(data).find((key) => data[key] === "");
  return empty;
};

// Sorting an array
export const sorting = (
  array: any[],
  path: string,
  increase: boolean = true
) => {
  function resolve(path: string, obj: string, separator: string = ".") {
    const properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr as any], obj);
  }
  const copyArray = array.slice();
  const sortArray = copyArray.sort((a, b) => {
    if (resolve(path, a) > resolve(path, b)) {
      return increase ? -1 : 1;
    }
    if (resolve(path, a) < resolve(path, b)) {
      return increase ? 1 : -1;
    }
    return 0;
  });
  return sortArray;
};

export const isEmpty = (obj: Props) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};

export const merge = (lhs: Props, rhs: Props) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p], rhs[p]);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};

export const set = (object: Props, path: string, value: any) => {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }
  if (typeof object !== "object") {
    return object;
  }
  const result = path.split(".").reduceRight(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(object, result);
};
