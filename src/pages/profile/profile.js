avatar.onclick = function() {
    const modal = document.body.querySelector('.profile__modal')
    modal.style.display = modal.style.display === 'none' ? 'flex' : 'none'
}

logout.onclick = function() {
    console.log('LOGout')
}

const input = document.getElementById('file-input')

const load = document.body.querySelector('.modal_button_choice')
load.onclick = function () {
    input.click()
}

input.addEventListener('change', () => {
    let file = input.files[0]
    console.log(file)
})

const save = document.body.querySelector('.modal_button_save')
save.onclick = function () {
    const modal = document.body.querySelector('.modal')
    modal.style.display = modal.style.display === 'none' ? 'flex' : 'none'
}
const url = 'auth/user'
const method = 'GET'
fetch('https://ya-praktikum.tech/api/v2/' + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => console.log(res))