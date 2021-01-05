const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getCards()
})

let deck

function getCards() {
    fetch(BASE_URL + '/cards')
    .then(res => res.json())
    .then(cards => {
        deck = cards
    })
}