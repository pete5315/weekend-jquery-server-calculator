function calculator(inputs) {
    if(inputs.operator==="+") {
        return inputs.input1 + inputs.input2;
    }
    if(inputs.operator==="-") {
        return inputs.input1 - inputs.input2;
    }
    if(inputs.operator==="*") {
        return inputs.input1 * inputs.input2;
    }
    if(inputs.operator==="/") {
        return inputs.input1 / inputs.input2;
    }
}

module.exports = calculator