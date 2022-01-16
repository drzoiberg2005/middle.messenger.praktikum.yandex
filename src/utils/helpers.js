// Adding class to element
export const addClass = (element, className) => {
    element.classList.add(className)
}

// Removing class to element
export const removeClass = (element, className) => {
    element.classList.remove(className)
}

// Adding attributes to element
export const setAttributes = (element, attributes) => {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Checking for an empty field
export const isEmptyField = (data) => {
    const empty = Object.keys(data).find(key => data[key] === '')
    return empty
}

// Sorting an array
export const sorting = (array, path, increase = true) => {
    const resolve = (path, obj = self, separator = '.') => {
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