
const cardTable = document.querySelector('.cardTable')
const difficultyLevel = document.querySelector('.difficultyLevel')
const summaryTable = document.querySelector('.summaryTable')
const screens = document.querySelectorAll('.screen')

const stepCountTable = document.createElement('div')
stepCountTable.classList.add('stepCountTable')

const listOfCards = ['card_1', 'card_2', 'card_3', 'card_4', 'card_5', 'card_6', 'card_7', 'card_8', 'card_9', 'card_10', 'card_11', 'card_12', 'card_13', 'card_14', 'card_15', 'card_16']

let levels
let firstCard
let secondCard
let thirdCard
const arr = []
let countEndGame = 0
let stepCount = 0
screens[0].classList.add('up')

difficultyLevel.addEventListener('click', difficultyButton)

function difficultyButton (e) {
    screens[0].classList.remove('up')
    screens[1].classList.add('up')
    if (e.target.classList.contains('simpleBtn')) {
        resultLevel = listOfCards.slice( 0, 4 )
        definitionOfComplexity(resultLevel)
    }
    if (e.target.classList.contains('moderateBtn')) {
        resultLevel = listOfCards.slice( 0, 8 )
        definitionOfComplexity(resultLevel)
    }
    if (e.target.classList.contains('difficultBtn')) {
        resultLevel = listOfCards.slice( 0, 16 )
        definitionOfComplexity(resultLevel)
    }
    
    document.body.prepend(stepCountTable)
}

function definitionOfComplexity(complexity) {
    if (complexity.length === 4) {
        for (let i = 1; i <= 2; i++) {
            creatCards(complexity)
        }
    }
    if (complexity.length === 8) {
        for (let i = 1; i <= 2; i++) {
            creatCards(complexity)
        }
    }
    if (complexity.length === 16) {
        for (let i = 1; i <= 2; i++) {
            creatCards(complexity)
        }
    }
}

function creatCards(level) {

    level.forEach((card) => {
        let ramdomPos = Math.floor(Math.random() * 16)

        const memoryCard = document.createElement('div')
        memoryCard.classList.add('memory-card','hasFlopedCard')
        memoryCard.setAttribute(`data-uniquecard`, card)

        memoryCard.style.order = ramdomPos

        const imgFrontFace = document.createElement('img')
        imgFrontFace.classList.add('front-face')
        imgFrontFace.src = './img/' + card + '.png'
        
        const imgBackFace = document.createElement('img')
        imgBackFace.classList.add('back-face')
        imgBackFace.src = './img/card_front.png'
        memoryCard.append(imgFrontFace, imgBackFace)
        cardTable.append(memoryCard)

        memoryCard.addEventListener('click', flipCard )
        
    })
    levels = level.length
}

function flipCard () {
    if (this.classList.contains('hasFlopedCard')) {
        arr.push(this)
        this.classList.remove('hasFlopedCard')
    }
    this.classList.add('flip')
    checkForMatch()
}

function checkForMatch() {
    if (arr.length === 2) {
        firstCard = arr[0]
        secondCard = arr[1]
        if (firstCard.dataset.uniquecard === secondCard.dataset.uniquecard) {
            disableCards()
            countEndGame++
        }
    } else if (arr.length >= 3) {
        firstCard = arr[0]
        secondCard = arr[1]
        thirdCard = arr[2]
        if (firstCard.dataset.uniquecard !== secondCard.dataset.uniquecard) {
            unflipCards()
            stepCount++
            stepCountTable.textContent = `Шаги: ${stepCount}`
        }
    }
    outputOfResults (countEndGame, stepCount)
}

function disableCards(){
arr.splice(0,2)
firstCard.classList.add('reductionEffect')
secondCard.classList.add('reductionEffect')
setTimeout(() => {
    firstCard.classList.add('transparent')
    secondCard.classList.add('transparent')
}, 500)

}

function unflipCards() {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    firstCard.classList.add('hasFlopedCard')
    secondCard.classList.add('hasFlopedCard')
    arr.splice(0,2)
}

function outputOfResults (trigger, count) {
    if (trigger === levels) {
        stepCountTable.remove()
        summaryTable.textContent = `Вы прошли игру за ${count} шагов`
        const btn = document.createElement('button')
        btn.classList.add('btn')
        btn.textContent = 'Начать новую игру'
        summaryTable.after(btn)
        screens[1].classList.remove('up')
        screens[2].classList.add('up')
        btn.addEventListener('click', () => {
        window.location.reload()
        })
    }
}



