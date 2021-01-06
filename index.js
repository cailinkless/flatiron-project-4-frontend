const BASE_URL = 'http://localhost:3000'

let deck

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-reading").addEventListener('click', startReading)
    getCards()
})

function startReading() {
    let main = document.querySelector("main")
    main.innerHTML = ""
    main.innerHTML = `
        <div id="card-1">
            <input type="button" value="Draw Card 1" id="1st-draw">
        </div>

        <div id="card-2">
            <input type="button" value="Draw Card 2" id="2nd-draw" disabled>
        </div>

        <div id="card-3">
            <input type="button" value="Draw Card 3" id="3rd-draw" disabled>
        </div>
    `
    attachClicksToReading()
}

function attachClicksToReading() {
    let firstButton = document.getElementById('1st-draw')
    firstButton.addEventListener('click', firstDraw)
}

function getRandomCardId() {
    return Math.floor(Math.random() * Math.floor(35)) + 1;
}

function firstDraw() {
    let card1 = document.getElementById("card-1")
    card1.innerHTML = ""
    let cardId = getRandomCardId()
    let card = deck.find(card => card.id == cardId)
    card1.innerHTML = `
        <h3>First Card:</h3>
        <h3>${card.number}. ${card.name}</h3>
        <p>Keyword: ${card.keyword}<br><br>Details: ${card.description}</p>
    `
    let secondButton = document.getElementById('2nd-draw')
    secondButton.disabled = false
    // secondButton.addEventListener('click', secondDraw)
}

function getCards() {
    let cardIndex = document.getElementById("card-index")
    // do i need to blank card index here?
    fetch(BASE_URL + '/cards')
    .then(res => res.json())
    .then(cards => {
        deck = cards
        deck.map(card => {
            cardIndex.innerHTML += `
            <li><a href="#" data-id="${card.id}">${card.number}. ${card.name}</a></li>
            `
        })
        attachClicksToCardLinks()
    })
}

function attachClicksToCardLinks() {
    let cards = document.querySelectorAll("li a")
    cards.forEach(card => {
        card.addEventListener('click', showCard)
    })
}

function showCard(e) {
    let id = e.target.dataset.id
    let main = document.querySelector("main")
    main.innerHTML = ""
    fetch(BASE_URL + `/cards/${id}`)
    .then(res => res.json())
    .then(card => {
        main.innerHTML = `
            <h2>${card.number}. ${card.name}</h2>
            <h4>Keyword: ${card.keyword}</h4>
            <h4>Common Card: ${card.common_card}</h4>
            <p>Description: ${card.description}</p>
            <h4>Pairings:</h4>
            <ul id="pairings">
            </ul>
        `
        let pairList = document.getElementById("pairings")
        card.pairings.forEach(pairing => {
            pairList.innerHTML += `
                <li><a href="#" data-id="${pairing.id}" class="pairing">+ ${deck.find(card => card.number == pairing.card_2).name}</a></li>
            `
        })
        attachClicksToPairingLinks()
    })
}

function attachClicksToPairingLinks() {
    let pairings = document.querySelectorAll('.pairing')
    pairings.forEach(pairing => {
        pairing.addEventListener('click', showPairing)
    })
}

function showPairing(e) {
    let id = e.target.dataset.id
    let main = document.querySelector("main")
    main.innerHTML = ""
    fetch(BASE_URL + `/pairings/${id}`)
    .then(res => res.json())
    .then(pairing => {
        main.innerHTML = `
            <h2>${pairing.name}</h2>
            <h4>Common Interpretations:</h4>
            <p>${pairing.meaning}</p>
            <h4>User Interpretations:</h4>
        `
    })
}


