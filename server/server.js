const express = require("express");
const bodyParser = require('body-parser');
const calculationHistory = require("./modules/calculationHistory");
const calculator = require("./modules/calculator");
const app = express();
const port = 5000;
app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended : true }));

//route to get history of calculations
app.get('/calculationHistory', function(req, res) {
    if (calculationHistory===[]) {
        res.send("oh?");
    }
    res.send(calculationHistory);
})

//route to post a new calculation
app.post('/calculationHistory', function(req,res) {
    //store the final result
    let result=calculator(req.body);
    //store a string of the calculation
    let calculation=`${req.body.input1} ${req.body.operator} ${req.body.input2} = ${result}`
//push the new calculation into the history array
    calculationHistory.push({calculation, result});
    // Send back a status code of 201
    res.sendStatus(201);
});

//enable server listening
app.listen(port, () => {
    console.log("listening on port", port);
});