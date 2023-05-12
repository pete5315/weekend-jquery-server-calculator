$(onReady);
let globalOperator = "";

function onReady() {
    console.log("DOM is loaded")
    getResults();
    $('#addButton').on('click', addButton);
    $('#subtractButton').on('click', subtractButton);
    $('#multiplyButton').on('click', multiplyButton);
    $('#divideButton').on('click', divideButton);
    $('#calculate').on('click', storeCalculation)
    $('#clear').on('click', clearFields)
}

function getResults() {
    $.ajax( {
        method: 'GET',
        url: '/calculationHistory'
    }).then(function(response) {
        renderToDOM(response);
    }
    ).catch(function(error) {
        alert('A')
        console.log('fail: ',error)
        }
    )
}

function renderToDOM(calculations) {
    $('#result').empty();
    $('#result').append(calculations[calculations.length-1].result)
    $('#history').empty();
    for (let x of calculations) {
        $('#history').append(`<li>${x.calculation}</li>`);
    }
    clearFields();
}

function storeCalculation(event) {
    event.preventDefault();
    const input1=$('#input1').val();
    const input2=$('#input2').val();
    const operator=globalOperator;
    $.ajax( {
        method: 'POST',
        url: '/calculationHistory',
        data: {
            input1,
            input2,
            operator
        }
    }).then(function(req,res) {
        getResults();
    }).catch(function(error) {
        console.log("Error", error);
        alert('error');
    })
}

function addButton() {
    globalOperator="+";
    $(".operator").css("background-color", "white")
    $("#addButton").css("background-color", "red")
}

function subtractButton() {
    globalOperator="-";
    $(".operator").css("background-color", "white")
    $("#subtractButton").css("background-color", "red")
}

function multiplyButton() {
    globalOperator="*";
    $(".operator").css("background-color", "white")
    $("#multiplyButton").css("background-color", "red")
}

function divideButton() {
    globalOperator="/";
    $(".operator").css("background-color", "white")
    $("#divideButton").css("background-color", "red")
}

function clearFields() {
    $('#input1').val("");
    $('#input2').val("");
    $(".operator").css("background-color", "white");
}