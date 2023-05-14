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
    //update input textbox, accepts keystrokes or clicks
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
        //errors were not functional during testing 
        //alert('A')
        //console.log('fail: ',error)
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
    for (let x in isolatedParts) {
        //check if any of the parts are missing
        if(isolatedParts[x]===""||isolatedParts[x]===undefined){
            return;
        }
        //check if operator was entered too many times
        if((isolatedParts[x].length>1)&&(isolatedParts[x]*1!=isolatedParts[x])) {
            return;
        }
        //check if an input has multiple decimal points
        let j=0;
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
    $.ajax({ //ajax delete call
        type: `DELETE`,
        url: `/calculationHistory`
    }).then( function( response ){
        getResults();
    }).catch( function( err ){
        //errors were not functional during testing
        //console.log( err );
        //alert( `Unable to delete at this time. Try again later.` );
        getResults();
        }
    )
}

function isolateParts(string) {
    //function to split the string into 3 parts
    let object={};
    let input1 = 0;
    let input2 = 0;
    let operator = "";
    for(let i=0; i<string.length; i++) {
        //checks where operator is located and splits the string
        if (!(string[i]*1==string[i])){
            console.log(i);
            operator=string.slice(i,i+1);
            input1=string.slice(0,i);
            input2=string.slice(i+1);
        }
    }
    return {input1, input2, operator};
}

function isolateParts2(string2) {
    //converts the string into an array and returns the portion before the = sign
    let array2=string2.split(" ")
    return array2[0];
}


function repost() {
    $("#result").text($(this).data("value"))
    globalOperator=isolateParts2($(this).text())
    $("#input1").val(globalOperator);
}