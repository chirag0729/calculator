const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false

function sendNumberValues(number) {
    //    replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }

}

function addDecimal() {
    if(awaitingNextValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

const calculate = {
'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
'=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator
        return;
    }
    // assign first value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

// reset all
const resetAll = () => {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false
    calculatorDisplay.textContent = '0'
}

// add event listners
inputBtns.forEach((inputbtn) => {
    if (inputbtn.classList.length === 0) {
        inputbtn.addEventListener('click', () => sendNumberValues(inputbtn.value))
    } else if (inputbtn.classList.contains('operator')) {
        inputbtn.addEventListener('click', () => useOperator(inputbtn.value))
    } else if (inputbtn.classList.contains('decimal')) {
        inputbtn.addEventListener('click', addDecimal)
    }
})

clearBtn.addEventListener('click', resetAll);