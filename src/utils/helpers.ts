

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
