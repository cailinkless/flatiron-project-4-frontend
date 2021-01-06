const BASE_URL = 'http://localhost:3000'

let deck

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-reading").addEventListener('click', startReading)
    document.getElementById("dictionary").addEventListener('click', getCards)
    createDeck()
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
        <h3 id="first-card-id">${card.number}. ${card.name}</h3>
        <p>Keyword: ${card.keyword}<br><br>Details: ${card.description}</p>
    `
    let secondButton = document.getElementById('2nd-draw')
    secondButton.disabled = false
    secondButton.addEventListener('click', secondDraw)
}

function secondDraw() {
    // pick and display second card:
    let card1 = parseInt(document.getElementById("first-card-id").innerHTML.split(". ")[0])
    let card2 = document.getElementById("card-2")
    card2.innerHTML = ""
    let cardId = getRandomCardId()
    if (cardId === card1) {
        cardId === 36 ? cardId -= 1 : cardId += 1
    }
    let card = deck.find(card => card.id === cardId)
    card2.innerHTML = `
        <h3>Second Card:</h3>
        <h3 id="second-card-id">${card.number}. ${card.name}</h3>
        <p>Keyword: ${card.keyword}<br><br>Details: ${card.description}</p>
    `
    // display information on the pairings of cards 1 & 2:
    let possPairings = deck.find(i => i.id === card1).pairings
    let pairing = possPairings.find(pairing => pairing.card_2 === card.id)
    let main = document.querySelector("main")
    main.innerHTML += `
        <h4>First Pairing: ${pairing.name}</h4>
        <p>Possible Meanings: ${pairing.meaning}</p>
    `
    let thirdButton = document.getElementById('3rd-draw')
    thirdButton.disabled = false
    thirdButton.addEventListener('click', thirdDraw)
}

function thirdDraw() {
    // establish cards 1 & 2:
    let firstCardId = parseInt(document.getElementById("first-card-id").innerHTML.split(". ")[0])
    let secondCardId = parseInt(document.getElementById("second-card-id").innerHTML.split(". ")[0])
    // pick and display third card:
    let thirdCardSpot = document.getElementById('card-3')
    thirdCardSpot.innerHTML = ""
    let thirdCardId = getRandomCardId()
    if (thirdCardId === firstCardId || thirdCardId === secondCardId) {
        thirdCardId === 36 ? thirdCardId -= 1 : thirdCardId += 1
    }
    let thirdCard = deck.find(card => card.id === thirdCardId)
    thirdCardSpot.innerHTML += `
        <h3>Third Card:</h3>
        <h3 id="third-card-id">${thirdCard.number}. ${thirdCard.name}</h3>
        <p>Keyword: ${thirdCard.keyword}<br><br>Details: ${thirdCard.description}</p>
    `
    // display information on the pairings of cards 2 & 3:
    let possPairings = deck.find(card => card.id === secondCardId).pairings
    let pairing = possPairings.find(pairing => pairing.card_2 === thirdCardId)
    let main = document.querySelector("main")
    main.innerHTML += `
        <h4>Second Pairing: ${pairing.name}</h4>
        <p>Possible Meanings: ${pairing.meaning}</p>
        <h3>Reading this Vignette:</h3>
        <p>Info on reading vignettes</p>
    `
}

function createDeck() {
    fetch(BASE_URL + '/cards')
    .then(res => res.json())
    .then(cards => deck = cards)
}

function getCards() {
    let main = document.querySelector("main")
    main.innerHTML = ""
    main.innerHTML = `
        <h3>Card Dictionary</h3>
        <ul id="card-index"></ul>
    `
    let cardIndex = document.getElementById("card-index")
    deck.map(card => {
        cardIndex.innerHTML += `
            <li><a href="#" data-id="${card.id}">${card.number}. ${card.name}</a></li>
        `
        })
        attachClicksToCardLinks()
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
        `
    })
}


