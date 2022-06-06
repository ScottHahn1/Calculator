const display = document.querySelector('.display')
const numberBtns = document.querySelectorAll('.number')
const operatorBtns = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('.clear')
const equalBtn = document.querySelector('.equal')
const displayTop = document.querySelector('.display-top')
const displayBottom = document.querySelector('.display-bottom')

function add(x, y) {
    return x + y
}
function subtract(x, y) {
    return x - y
}
function multiply(x, y) {
    return x * y
}
function divide(x, y) {
    return x / y
}

function operate(x, op, y) {
    if (op === '+') {
        return add(x, y)
    }
    else if (op === '-') {
        return subtract(x, y)
    }
    else if (op === '\xD7') {
        return multiply(x, y)
    }
    else if (op === '\xF7') {
        return divide(x, y)
    }
}

let previousOp
let nextOp
let firstNum
let secondNum
let maxCharacters

function getNums() {
    firstNum = parseInt(displayTop.innerHTML.split(' ')[0])
    secondNum = parseInt(displayTop.innerHTML.split(' ')[2])
}

function getOperator() {
    previousOp = displayTop.innerHTML.split(' ')[1]
    nextOp = displayTop.innerHTML.split(' ')[3]
    return previousOp, nextOp
}

numberBtns.forEach(num => num.addEventListener('click', e => {
    displayTop.innerHTML += `${e.target.innerText}`
    maxCharacters = displayTop.innerText.length
    if (maxCharacters === 20) {
        displayTop.innerText = ''
    }
}))

operatorBtns.forEach(op => op.addEventListener('click', e => {
    displayTop.innerHTML += ` ${e.target.innerText} `
    getNums()
    getOperator()

    if (e.target.innerHTML === nextOp) {
        displayTop.innerHTML = operate(firstNum, previousOp, secondNum) + ' ' + nextOp + ' '
    }
}))

equalBtn.addEventListener('click', () => {
    getNums()
    getOperator()
    displayBottom.innerHTML = operate(firstNum, previousOp, secondNum)
})

function clearDisplay() {
    displayTop.innerText = ''
    displayBottom.innerText = ''
}
clearBtn.addEventListener('click', clearDisplay)