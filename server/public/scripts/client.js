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
    //include any previous calculations still on the server on the DOM 
    getResults();
}

function ops() {
    globalOperator=$(this).text();
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
    $.ajax( {
        method: 'POST',
        url: '/calculationHistory',
        data: {
            input1: $('#input1').val(),
            input2: $('#input2').val(),
            operator: globalOperator
        }
    }).then(function(req,res) {
        getResults();
    }).catch(function(error) {
        console.log("Error", error);
        alert('error');
    })
}

function renderToDOM(calculations) {
    //empty the most recent result
    $('#result').empty();
    //display the most recent result
    $('#result').append(calculations[calculations.length-1].result);
    //empty the history
    $('#history').empty();
    //display the updated history
    for (let x of calculations) {
        $('#history').append(`
        <li>${x.calculation}</li>
        `);
    }
    clearFields();
}

function clearFields() {
    //clear all the input fields
    $('#input1').val("");
    $('#input2').val("");
    $(".operator").css("background-color", "white");
}