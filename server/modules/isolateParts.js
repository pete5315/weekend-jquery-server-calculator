function isolateParts(string) {
    let object={}
    let input1 = 0;
    let input2 = 0;
    let operator = "";
    for(let i=0; i<string.length; i++) {
        console.log(string[i]);
        if (!(string[i]*1===string[i])){
            operator=string.slice(i-1,i);
            input1=string.slice(0,i-1);
            input2=string.slice(i);
        }
    }
    object={input1, input2, operator}
    console.log(object);
    return object;
}

module.exports = isolateParts;