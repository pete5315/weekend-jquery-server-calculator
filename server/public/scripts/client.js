$(onReady);
//initialize a variable to remember the current operator selected by the client
let globalOperator = "";

function onReady() {
    //EVENT LISTENERS
    //when a button is pressed, update the global operator and button styling
    $('.operator').on('click', ops);
    //when the = sign is clicked, it should send the info to the server
    $('#calculate').on('click', storeCalculation);
    //clear the input fields
    $('#clear').on('click', clearFields);
    //clear the history
    $('#clearHistory').on('click', clearHistory);
    //repost a result 
    $('#history').on('click', '.history', repost);
    //include any previous calculations still on the server on the DOM 
    getResults();
}

function ops() {
    //update input textbox
    globalOperator=$('#input1').val();
    globalOperator+=$(this).text();
    $('#input1').val(globalOperator);
}

function getResults() { //ajax get call
    $.ajax( {
        method: 'GET',
        url: '/calculationHistory'
    }).then(function(response) {
        if(response===[]){
            console.log('undefined result');
            return;
        }
        console.log(response);
        renderToDOM(response);
    }
    ).catch(function(error) {
        // alert('A')
        // console.log('fail: ',error)
        }
    )
}

//send the data inputted on the DOM to the server
function storeCalculation(event) {
    //check if any inputs are blank
    if($('#input1').val()===""||$('#input2').val()===""||globalOperator==="") {
        alert('Input field blank, please retry');
        return;
    }
    //split the string into two input objects and an operator
    let isolatedParts = isolateParts($('#input1').val());
    console.log(isolatedParts);
    for (let x in isolatedParts) {
        console.log(isolatedParts[x]);
        if(isolatedParts[x]===""||isolatedParts[x]===undefined){
            alert("Missing input and/or too many operators");
            return;
        }
    }
console.log("63")
    for (let x in isolatedParts) {
        //check if operator was entered too many times
        if((isolatedParts[x].length>1)&&(isolatedParts[x]*1!=isolatedParts[x])) {
            console.log("58 fail", isolatedParts[x])
            return;
        }
        //check if an input has multiple decimal points
        let j=0;
        console.log("72");
        if (isolatedParts[x]===".") {
            if(j===1) {
                return;
            }
            j++;

        }

    }



    $.ajax( {
        method: 'POST',
        url: '/calculationHistory',
        data: {
            input1: $('#input1').val(),
        }
    }).then(function(req,res) {
        getResults();
    }).catch(function(error) {
        // console.log("Error", error);
        // alert('error');
    })
}

function renderToDOM(calculations) {
    //empty the most recent result
    $('#result').empty();
    //empty the history
    $('#history').empty();
    //empty array would error, so end early if so
    if(calculations===undefined) {
        return;
    }
    //display the most recent result
        $('#result').append(calculations[calculations.length-1].result);
    //display the updated history
    for (let i=0; i<calculations.length; i++) {
        $('#history').append(`
        <li class="history" data-value="${calculations[i].result}" data-index="${i}">${calculations[i].calculation}</li>
        `);
    }
    clearFields();
}

function clearFields() {
    //clear all the input fields
    $('#input1').val("");
    globalOperator="";
//    $('#input2').val("");
    $(".operator").css("background-color", "white");
}

function clearHistory() {
    console.log("131")
    $.ajax({
        type: `DELETE`,
        url: `/calculationHistory`
    }).then( function( response ){
        getResults();
    }).catch( function( err ){
        // console.log( err );
        // alert( `Unable to delete at this time. Try again later.` );
        getResults();
        }
    )
}

function isolateParts(string) {
    console.log(string)
    let object={};
    let input1 = 0;
    let input2 = 0;
    let operator = "";
    for(let i=0; i<string.length; i++) {
        console.log(string[i]);
        if (!(string[i]*1==string[i])){
            console.log(i);
            operator=string.slice(i,i+1);
            input1=string.slice(0,i);
            input2=string.slice(i+1);
        }
    }
    object={input1, input2, operator}
    console.log(object);
    return object;
}

function isolateParts2(string2) {
    console.log(string2);
    let array2=string2.split(" ")
    let string=array2[0]
    console.log(string)
    return string;
}


function repost(event) {
    $("#result").text($(this).data("value"))
    globalOperator=isolateParts2($(this).text())
    $("#input1").val(globalOperator);
}