const express = require("express");
const bodyParser = require('body-parser');
const calculationHistory = require("./modules/calculationHistory");
const calculator = require("./modules/calculator");
const app = express();
const port = 5000;
app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended : true }));
//some module based variables

// Route to get quotes
app.get('/calculationHistory', function(req, res) {
    console.log('Request for /quotes was made');

    // send back list of quotes to client
    res.send(calculationHistory);
})

// Route to post quotes
app.post('/calculationHistory', function(req,res) {
    // req.body is the data the client has sent
    let sentInformation = req.body
    console.log(sentInformation);
    let result=calculator(sentInformation);
    let calculation=`${sentInformation.input1} ${sentInformation.operator} ${sentInformation.input2} = ${result}`
    // Push the quote into our array
    calculationHistory.push({calculation, result});

    // Send back a status code of 201
    res.sendStatus(201);
});




app.listen(port, () => {
    console.log("listening on port", port);
});