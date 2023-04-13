const screen = document.getElementById('screen');

let numString = '';
let num1 = 0;
let num2 = 0;
let operation = '';

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
    return num1 / num2;
}

function operate(operation, num1, num2) {
    screen.textContent = window[operation](num1, num2);
    return (window[operation](num1, num2));
}

function setNum1() {
    num1 = parseInt(numString);
    numString = '';
}

function setNum2() {
    num2 = parseInt(numString);
    numString = '';
}

document.body.addEventListener('click', function (e) {
    if (!isNaN(e.target.textContent)) {
        numString += e.target.textContent;
        screen.textContent += e.target.textContent;
    }
    else if (e.target.id === 'add') {
        setNum1();
        operation = e.target.id;
        screen.textContent += ' + ';
        return [num1, operation];
    }
    else if (e.target.id === 'subtract') {
        setNum1();
        operation = e.target.id;
        screen.textContent += ' - ';
        return [num1, operation];
    }
    else if (e.target.id === 'multiply') {
        setNum1();
        operation = e.target.id;
        screen.textContent += ' * ';
        return [num1, operation];
    }
    else if (e.target.id === 'divide') {
        setNum1();
        operation = e.target.id;
        screen.textContent += ' / ';
        return [num1, operation];
    }
    else if (e.target.id === 'delete') {
        num1 = 0;
        num2 = 0;
        numString = '';
        screen.textContent = '';
        return [num1, num2];
    }
    else if (e.target.id === 'equals') {
        setNum2();
        operate(operation, num1, num2);
    }

});
