const screenUpper = document.getElementById('screen-upper');
const screenLower = document.getElementById('screen-lower');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');

let numString = '';
let num1 = 0;
let num2 = 0;
let answer = null;
let operation = '';
let operationChar = '';
let operationClicked = false;
let shouldReset = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if(num2 === 0){
        return 'Cannot divide by zero';
    }
    else {
        return num1 / num2;
    }
    
}

function operate(operation, num1, num2) {
    answer = window[operation](num1, num2);
    screenLower.textContent = answer;
    num1 = answer;
    num2 = 0;
    numString = '';
}

function reset() {
    answer = 0;
    num1 = 0;
    num2 = 0;
    operation = '';
    operationChar = '';
    numString = '';
    screenUpper.textContent = '';
    screenLower.textContent = '0';
}

function backspace(){
    numString = numString.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    if (num1 != 0) {
        screenUpper.textContent = `${num1} ${operationChar}`;
    }
    if (numString !== '') {
        screenLower.textContent = numString;
    } 
}

numberButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        if (screenLower.textContent === '0' || shouldReset) {
            screenLower.textContent = '';
            shouldReset = false;
        }
        if (operationClicked) {
            screenLower.textContent = '';
            operationClicked = false;
        }
        if (e.target.textContent === '.' && numString.includes('.')) return;
        if (numString.length < 15) {
            numString += e.target.textContent;
            updateDisplay();
        }
    });
});

document.body.addEventListener('click', function (e) {
    switch (e.target.id) {
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            if (!answer) {
                if (numString !== '') {
                    num1 = parseFloat(numString);
                    numString = '';
                }
            }
            else if (answer) {
                num1 = answer;
                numString = '';
            }
            shouldReset = true;
            operation = e.target.id;
            operationChar = e.target.textContent;
            operationClicked = true;
            updateDisplay();
            break;
        case 'clear':
            reset();
            break;
        case 'delete':
            backspace();
            break;
        case 'equals':
            if (numString) {
                num2 = parseFloat(numString);
                numString = '';
                screenUpper.textContent = `${num1} ${operationChar} ${num2} =`
                operate(operation, num1, num2);
            }
            break;
        default:
            break;
    }
});

document.addEventListener('keydown', function(e){
    const key = e.key;
    if(!isNaN(key) && key != 0){
        numberButtons[key-1].click();
    }
    else if(key == 0){
        numberButtons[10].click();
    }
    else if(key == '.'){
        numberButtons[9].click();
    }
    else if(key == '+'){
        operatorButtons[0].click();
    }
    else if(key == '-'){
        operatorButtons[1].click();
    }
    else if(key == '*'){
        operatorButtons[2].click();
    }
    else if(key == '/'){
        operatorButtons[3].click();
    }
    else if(key == 'Delete'){
        document.querySelector('#clear').click();
    }
    else if(key == 'Backspace'){
        document.querySelector('#delete').click();
    }
    else if(key == '=' || key =='Enter'){
        document.querySelector('#equals').click();
    }
})
