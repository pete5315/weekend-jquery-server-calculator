function isolateParts(string) {
    let object={}
    let input1 = 0;
    let input2 = 0;
    let operator = "";
    for(let i=0; i<string.length; i++) {
        console.log(string[i]);
        if (!(string[i]*0===0)){
            operator=string.slice(i,i+1);
            input1=string.slice(0,i);
            input2=string.slice(i+1);
        }
    }
    object={input1, input2, operator}
    console.log(object);
    return object;
}

module.exports = isolateParts;