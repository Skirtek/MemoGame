let cards = []
const cardsAmount = 12

let click = 0;
let previousCard = null;
let guessBlocked = false

function init() {
    initializeCards()

    cards = document.querySelectorAll('.card')

    initializeEvents()
    shuffleCards()
}

function initializeEvents() {
    // Najpierw było tu
    //const cards = document.querySelectorAll('.card')
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function flipCard() {
    if (this.classList.contains('guessed') || guessBlocked) {
        return
    }

    this.classList.toggle('flip')

    if (this.classList.contains('flip')) {
        click++;
    }
    else {
        click--;
    }

    togglePicture(this)
    handleClick(this)
}

function handleClick(currentCard) {
    switch (click) {
        case 0:
            previousCard = null;
            break;
        case 1:
            previousCard = currentCard;
            break;
        case 2:
            handleGuess(currentCard)
            break;
    }
}

function handleGuess(currentCard) {
    if (isMatch(currentCard)) {
        previousCard.classList.add('guessed')
        currentCard.classList.add('guessed')

        previousCard = null;
        click = 0

        checkWin()
    }
    else {
        guessBlocked = true

        setTimeout(() => {
            unFlipCards(currentCard)
            previousCard = null;
            click = 0
            guessBlocked = false
        }, 1000)
    }

    // najpierw daj tu
    // previousCard = null;
    // click = 0
}

function unFlipCards(currentCard) {
    // odwracamy kartę
    previousCard.classList.remove('flip')
    currentCard.classList.remove('flip')

    // zmieniamy obrazek
    togglePicture(previousCard)
    togglePicture(currentCard)
}

function isMatch(currentCard) {
    const previousCardBack = previousCard.querySelector('.back');
    const currentCardBack = currentCard.querySelector('.back');

    return previousCardBack.src === currentCardBack.src
}

function togglePicture(card) {
    const cardFront = card.querySelector('.front');
    const cardBack = card.querySelector('.back');

    cardFront.classList.toggle('hide')
    cardBack.classList.toggle('show')
}

function initializeCards() {
    const cardsContainer = document.querySelector('.cards')

    for (let i = 0; i < cardsAmount / 2; i++) {
        const card = createCard(i + 1)

        cardsContainer.appendChild(card)
        cardsContainer.appendChild(card.cloneNode(true))
    }
}

function createCard(imageNumber) {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card')

    const frontImg = createImg('front', 'img/mountaing.png')
    cardDiv.appendChild(frontImg)

    const backImg = createImg('back', `img/${imageNumber}.png`)
    cardDiv.appendChild(backImg)

    return cardDiv
}

function createImg(className, src) {
    const img = document.createElement('img')
    img.setAttribute('class', className)
    img.setAttribute('src', src)

    return img
}

function shuffleCards() {
    cards.forEach(card => {
        const order = Math.floor(Math.random() * cardsAmount)
        card.style.order = order
    })
}

function checkWin() {
    const playerWon = [...cards].every(card => card.classList.contains('guessed'))

    if(!playerWon){
        return
    }

    setTimeout(() => {
        alert('Wygrałeś iPhone 64GB biały wpisz numer konta i hasło do banku, aby wykonać przelew iPhone na Twoje konto')
    }, 1000)
}

init()