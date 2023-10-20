let currentInput = '';
let currentOperator = '';
let previousInput = '';

function updateDisplay(value) {
   $('#display').text(value);
}

function handleNumber(number) {
   if (currentInput === '0') {
      currentInput = number.toString();
   } else {
      currentInput += number.toString();
   }
   updateDisplay(currentInput);
}

function handleOperator(operator) {
   if (currentInput === '') return;

   if (currentOperator) {
      handleEquals();
   }

   currentOperator = operator;
   previousInput = currentInput;
   currentInput = '';
}

function handleEquals() {
   if (currentOperator) {
      let result = 0;

      switch (currentOperator) {
         case '+':
            result = parseFloat(previousInput) + parseFloat(currentInput);
            break;
         case '-':
            result = parseFloat(previousInput) - parseFloat(currentInput);
            break;
         case '*':
            result = parseFloat(previousInput) * parseFloat(currentInput);
            break;
         case '/':
            result = parseFloat(previousInput) / parseFloat(currentInput);
            break;
         default:
            break;
      }

      currentInput = result.toString();
      currentOperator = '';
      previousInput = '';
      updateDisplay(currentInput);
   }
}

function handleClear() {
   currentInput = '';
   currentOperator = '';
   previousInput = '';
   updateDisplay('0');
}

function handleDecimal() {
   if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay(currentInput);
   }
}

$(document).ready(function () {
   updateDisplay('0');
});