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
    $('#history').on('click', repost);
    //include any previous calculations still on the server on the DOM 
    // getResults();
}

function ops() {
    globalOperator+=$(this).text();
    $('#input1').val(globalOperator);
    $(".operator").css("background-color", "white");
    $(this).css("background-color", "red");
}

function getResults() {
    //ajax get call
    $.ajax( {
        method: 'GET',
        url: '/calculationHistory'
    }).then(function(response) {
        renderToDOM(response);
    }
    ).catch(function(error) {
        alert('Server error')
        console.log('fail: ',error);
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
    
    let isolatedParts = isolateParts($('#input1').val());
    for (let x in isolatedParts) {
        console.log(isolatedParts[x]);
        if(isolatedParts[x]===""||isolatedParts[x]===undefined){
            console.log("51 return");
            return;
        }
    }

    for (let x in isolatedParts) {
        if((isolatedParts[x].length>1)&&(isolatedParts[x]*1!==isolatedParts[x])) {
            console.log("58 fail")
            return
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
        console.log("Error", error);
        alert('error');
    })
}

function renderToDOM(calculations) {
    if(calculations===undefined) {
        return;
    }
    //empty the most recent result
    $('#result').empty();
    //display the most recent result
    if (calculations.length!==1) {
        $('#result').append(calculations[calculations.length-1].result);
    }
    //empty the history
    $('#history').empty();
    //display the updated history
    for (let i=0; i<calculations.length; i++) {
        $('#history').append(`
        <li data-index="${i}">${calculations[i].calculation}</li>
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

function isolateParts(string) {
    console.log(string)
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

function clearHistory() {
    console.log("131")
    let index = 0;
    $.ajax({
        type: `DELETE`,
        url: `/calculationHistory/` + index
    }).then( function( response ){
        getResults();
    }).catch( function( err ){
        console.log( err );
        alert( `Unable to delete at this time. Try again later.` );
    }
    )
}

function repost() {

}