document.addEventListener('DOMContentLoaded', function() {
    let display = document.getElementById('display');
    let currentNumber = '';
    let firstNumber = '';
    let operation = null;
    let shouldResetDisplay = false;

    function updateDisplay(value) {
        display.value = value;
    }

    function clear() {
        currentNumber = '';
        firstNumber = '';
        operation = null;
        updateDisplay('0');
    }

    function handleNumber(number) {
        if (shouldResetDisplay) {
            currentNumber = '';
            shouldResetDisplay = false;
        }
        currentNumber = currentNumber === '0' ? number : currentNumber + number;
        updateDisplay(currentNumber);
    }

    function handleOperator(op) {
        if (operation !== null) {
            calculate();
        }
        firstNumber = currentNumber;
        operation = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (operation === null || firstNumber === '') return;
        
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(currentNumber);
        let result;

        switch(operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : 'Error';
                break;
        }

        currentNumber = result.toString();
        updateDisplay(currentNumber);
        operation = null;
        shouldResetDisplay = true;
    }

    // Event Listeners
    document.querySelectorAll('.calculator button').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            
            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                clear();
            }
        });
    });
});