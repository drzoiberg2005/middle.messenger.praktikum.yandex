export const sorting = (array, path, increase = true) => {
    function resolve(path, obj = self, separator = '.') {
        const properties = Array.isArray(path) ? path : path.split(separator)
        return properties.reduce((prev, curr) => prev && prev[curr], obj)
    }
    const copyArray = array.slice()
    const sortArray = copyArray.sort(function (a, b) {
        if (resolve(path, a) > resolve(path, b)) {
            return increase ? -1 : 1;
        }
        if (resolve(path, a) < resolve(path, b)) {
            return increase ? 1 : -1;
        }
        return 0;
    })
    return sortArray
}