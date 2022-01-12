export const generateavatar = (object, size = 10, user = true, color = '#ffffff', background = '#000000') => {
    const text = (user ? object.first_name[0] + object.second_name[0] : object.title[0]).toUpperCase()

    const content = () => {
        if (object.avatar) {
            const image = document.createElement('img')
            image.setAttribute('src', object.avatar)
            image.style.borderRadius = '50%'
            return image
        } else {
            const canvas = document.createElement('canvas')
            canvas.width =
                canvas.height = 10 * size
            const context = canvas.getContext('2d')

            context.fillStyle = background
            context.fillRect(0, 0, canvas.width, canvas.height)

            context.font = `${size/2}rem Montserrat-regular`
            context.fillStyle = color
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(text, canvas.width / 2, canvas.height / 2)
            return canvas
        }
    }

    const avatar = content()
    avatar.style.borderRadius = '50%'
    avatar.style.height = `${size}rem`
    avatar.style.width = `${size}rem`

    return avatar
}