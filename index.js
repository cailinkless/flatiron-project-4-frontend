const BASE_URL = 'http://localhost:3000'

let deck

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("welcome").addEventListener('click', welcomeMessage)
    document.getElementById("browse").addEventListener('click', displayVignetteIndex)
    document.getElementById("start-reading").addEventListener('click', startReading)
    document.getElementById("dictionary").addEventListener('click', getCards)
    createDeck()
    welcomeMessage()
})

// Basic Setup

function createDeck() {
    fetch(BASE_URL + '/cards')
    .then(res => res.json())
    .then(cards => deck = cards)
}

function welcomeMessage() {
    let main = document.querySelector("main")
    main.innerHTML = ""
    main.innerHTML = `
    <p><strong>Welcome to the Lenormand Phrasebook!</strong>
    <br><br>
    Here you can practice your Lenormand reading skills by drawing from our digital card deck to create a short sequence of cards (a <i>three card vignette</i> in Lenormand terminology).
    <br><br>
    Possible meanings of your card combination will be suggested, but since readings are highly dependent on your personal context and mental associations, we encourage you to share your own interpretation, and browse vignette interpretations by other community members.
    <br><br>Happy Reading!</p>
    `
}

// Feature: Vignette Index

function displayVignetteIndex() {
    let main = document.querySelector("main")
    main.innerHTML = ""
    main.innerHTML = `
        <h3>Community Vignettes:</h3>
        <ul id="vignette-index"></ul>
    `
    let vignetteIndex = document.getElementById("vignette-index")
    fetch(BASE_URL + '/vignettes')
    .then(res => res.json())
    .then(vignettes => {
        vignettes.map(vignette => {
            vignetteIndex.innerHTML += `
                <li><a href="#" data-id="${vignette.id}">${vignette.title}</a></li>
            `
        })
        attachClicksToVignettes()
    })
}

function attachClicksToVignettes() {
    let vignettes = document.querySelectorAll("li a")
    vignettes.forEach(vignette => {
        vignette.addEventListener('click', showVignette)
    })
}

function showVignette(e) {
    debugger
    let id = e.target.dataset.id
    let main = document.querySelector("main")
    main.innerHTML = ""
    fetch(BASE_URL + `/vignettes/${id}`)
    .then(res => res.json())
    .then(vignette => {
        main.innerHTML = `
            <h2>${vignette.title}</h2>
            <h4>Pairings:</h4>
            <ul id="pairings">
            </ul>
            <ol id="interpretations">
            </ol>
        `
        let pairList = document.getElementById("pairings")
        pairList.innerHTML += `
                <li>${vignette.first_pairing}</li>
                <li>${vignette.second_pairing}</li>
            `
        let interpretationList = document.getElementById("interpretations")
        vignette.interpretations.map(interpretation => {
            interpretationList.innerHTML += `
                <li>${interpretation.content}</li>
            `
        })
    })
}

// Feature: Card Dictionary

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
            <img src="img/${card.img_url}" alt="${card.name} Symbol"/>
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
                <li><a href="#" data-id="${pairing.id}" class="pairing">${card.name} + ${deck.find(card => card.number == pairing.card_2).name}</a></li>
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



// Practice Reading


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
        <div id="vignette-form"></div>
    `
    displayVignetteForm()
}

function displayVignetteForm() {
    let formDiv = document.getElementById("vignette-form")
    let possPairings1 = deck.find(card => card.id === parseInt(document.getElementById("first-card-id").innerHTML.split(". ")[0])).pairings
    let firstPairing = possPairings1.find(pairing => pairing.card_2 === parseInt(document.getElementById("second-card-id").innerHTML.split(". ")[0]))
    let possPairings2 = deck.find(card => card.id === parseInt(document.getElementById("second-card-id").innerHTML.split(". ")[0])).pairings
    let secondPairing = possPairings2.find(pairing => pairing.card_2 === parseInt(document.getElementById("third-card-id").innerHTML.split(". ")[0]))
    let html = `
        <form>
        <input type="hidden" id="first_card" name="first_card" value="${parseInt(document.getElementById("first-card-id").innerHTML.split(". ")[0])}"></input>
        <input type="hidden" id="second_card" name="second_card" value="${parseInt(document.getElementById("second-card-id").innerHTML.split(". ")[0])}"></input>
        <input type="hidden" id="third_card" name="third_card" value="${parseInt(document.getElementById("third-card-id").innerHTML.split(". ")[0])}"></input>
        <input type="hidden" id="first_pairing" name="first_pairing" value="${firstPairing.name}"></input>
        <input type="hidden" id="second_pairing" name="second_pairing" value="${secondPairing.name}"></input>
        <input type="submit" value="Add Your Interpretation"></input>
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', saveVignette)
}

//         <input type="text" id="user-interpretation" name="user-interpretation"></input>

function saveVignette(e) {
    e.preventDefault()
    let vignette = {
        title: `${e.target.querySelector('#first_card').value} + ${e.target.querySelector('#second_card').value} + ${e.target.querySelector('#third_card').value}`,
        first_card: e.target.querySelector('#first_card').value,
        second_card: e.target.querySelector('#second_card').value,
        third_card: e.target.querySelector('#third_card').value,
        first_pairing: e.target.querySelector('#first_pairing').value,
        second_pairing: e.target.querySelector('#second_pairing').value
    }
    let configObject = {
        method: 'POST',
        body: JSON.stringify(vignette),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + '/vignettes', configObject)
    .then(res => res.json())
    .then(vignette => {
        displayInterpretationForm(vignette)
    })
}

function displayInterpretationForm(vignette) {
    let main = document.querySelector("main")
    main.innerHTML += `
        <form id="interpretation">
            <input type="hidden" id="vignette" value="${vignette.id}"></input>
            <input type="text" id="content"></input>
            <input type="submit"></input>
        </form>
    `
    document.querySelector('#interpretation').addEventListener('submit', submitInterpretation)
}

function submitInterpretation(e) {
    e.preventDefault()
    let interpretation = {
        vignette_id: e.target.querySelector('#vignette').value,
        content: e.target.querySelector('#content').value
    }
    let configObject = {
        method: 'POST',
        body: JSON.stringify(interpretation),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + '/interpretations', configObject)
    .then(res => res.json())
    .then(interpretation => {
        showVignette(interpretation.vignette)
    })
}

// function showVignette(vignette) {
//     let main = document.querySelector("main")
//     main.innerHTML = ""
//     main.innerHTML += `
//         <h3>Vignette: ${vignette.title}</h3>
//         <div id="VC1"></div>
//         <div id="VC2"></div>
//         <div id="VC3"></div>
//         <h4>Combination of Pairings <i>${vignette.first_pairing}</i> and <i>${vignette.second_pairing}</i></h4>
//         <p><strong>Possible ${vignette.first_pairing} Meanings:</strong></p>
//         <p><strong>Possible ${vignette.second_pairing} Meanings:</strong></p>
//         <h4>Community Interpretations</h4>
//         <ul id="interpretations"></ul>
//     `
//     debugger
//     if (vignette.interpretations == null) {
//         main.innerHTML += "There are no community interpretations for this card yet."
//     } else {
//         let interpretationsList = document.getElementById('interpretations')
//         vignette.interpretations.forEach(interpretation =>
//             interpretationsList.innerHTML += `
//                 <li>${interpretation}</li>
//             `
//         )
//     }
// }

// function createOrUpdateVignette(e) {
//     e.preventDefault()
    // let vignette = {
    //     title: `${e.target.querySelector('#first_card').value} + ${e.target.querySelector('#second_card').value} + ${e.target.querySelector('#third_card').value}`,
    //     first_card: e.target.querySelector('#first_card').value,
    //     second_card: e.target.querySelector('#second_card').value,
    //     third_card: e.target.querySelector('#third_card').value,
    //     first_pairing: e.target.querySelector('#first_pairing').value,
    //     second_pairing: e.target.querySelector('#second_pairing').value,
    // }
//     // debugger
    // let configObject = {
    //     method: 'POST',
    //     body: JSON.stringify(vignette),
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }
//     let vignetteData
//     fetch(BASE_URL + '/vignettes', configObject).then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             return Promise.reject(response);
//         }
//     })
//     .then(data => {
//         // store vignette data
//         vignetteData = data
//         // post interpretation
//         let interpretation = {
//             foreign_key: vignetteData.id,
//             content: e.target.querySelector('#user-interpretation').value
//         }
//         // debugger
//         let configObject2 = {
//             method: 'POST',
//             body: JSON.stringify(interpretation),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'applications/json'
//             }
//         }
//         fetch(BASE_URL + '/interpretations', configObject2)    
//     })
//     .then(() => {
//         fetch(BASE_URL + `/vignettes/${vignetteData.id}`)
//         .then(res => res.json())
//     })
//     .then(vignette => {
//         let main = document.querySelector("main")
//         main.innerHTML = ""
//         main.innerHTML += `
        //     <h3>Vignette: ${vignette.title}</h3>
        //     <div id="VC1"></div>
        //     <div id="VC2"></div>
        //     <div id="VC3"></div>
        //     <h4>Combination of Pairings <i>${vignette.first_pairing}</i> and <i>${vignette.second_pairing}</i></h4>
        //     <p><strong>Possible ${vignette.first_pairing} Meanings:</strong></p>
        //     <p><strong>Possible ${vignette.second_pairing} Meanings:</strong></p>
        //     <h4>Community Interpretations</h4>
        //     <ul id="interpretations"></ul>
        // `
        // if (vignette.interpretations == null) {
        //     main.innerHTML += "There are no community interpretations for this card yet."
        // } else {
        //     let interpretationsList = document.getElementById('interpretations')
        //     vignette.interpretations.forEach(interpretation =>
        //         interpretationsList.innerHTML += `
        //             <li>${interpretation}</li>
//                 `
//             )
//         }
//     })
// }


