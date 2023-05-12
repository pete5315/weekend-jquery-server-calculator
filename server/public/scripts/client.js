$(onReady);

function onReady() {
    console.log("DOM is loaded")
    getQuotes();
    $('#addButton').on('click', addQuote);
}

function getResults() {
    $.ajax( {
        method: 'GET',
        url: '/calculatorHistory'
    }).then(function(response) {
        console.log(response);
        renderToDOM(response);
    }
    ).catch(function(error) {
        alert('A')
        console.log('fail: ',error)
        }
    )
}

function renderToDOM(calculations) {
    $('#calculationsContainer').empty();
    $('#result').append(calculations[calculations.length-1].result)
    for (let x of calculations) {
        $('#history').append(`<li>${x.calculation}"</li>`);
    }
}

function storeCalculation(event) {
    event.preventDefault();
    const input1=$('#input1').val();
    const input2=$('#input2').val();
    const operator=$('#')
    $.ajax( {
        method: 'POST',
        url: '/calculationInput',
        data: {
            input1,
            input2,
            operator
        }
    }).then(function(req,res) {
        calculationHistory.push(req);
        res.sendStatus(201);
        renderToDOM(req);
    }).catch(function(error) {
        console.log("Error", error);
        alert('error');
    })
}