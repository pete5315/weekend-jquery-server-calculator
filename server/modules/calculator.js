//Switch function to evaluate based on the operator
function calculator(inputs) {
    switch(inputs.operator) {
        case "+":
            return inputs.input1*1 + inputs.input2*1;
            break;
        case "-":
            return inputs.input1 - inputs.input2;
            break;
        case "*":
            return inputs.input1 * inputs.input2;
            break;
        case "/":
            return inputs.input1 / inputs.input2;
            break;
    }
}

module.exports = calculator;