const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getCards()
})

let deck

function getCards() {
    let cardIndex = document.getElementById("card-index")
    fetch(BASE_URL + '/cards')
    .then(res => res.json())
    .then(cards => {
        deck = cards
        deck.map(card => {
            cardIndex.innerHTML += `
            <li><a href="#" data-id="${card.id}">${card.number}. ${card.name}</a></li>
            `
        })
    })
}