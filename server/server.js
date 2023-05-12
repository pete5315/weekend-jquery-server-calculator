const express = require("express");
const bodyParser = require('body-parser');
let calculationHistory = [];
const isolateParts = require("./modules/isolateParts");
const calculator = require("./modules/calculator");
const app = express();
const port = 5000;
app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended : true }));

//route to get history of calculations
app.get('/calculationHistory', function(req, res) {
    console.log(calculationHistory);
    res.send(calculationHistory);
    res.sendStatus(200);
})

//route to post a new calculation
app.post('/calculationHistory', function(req,res) {
    //isolate the parts, store the final result
    let result=calculator(isolateParts(req.body.input1));
    //store a string of the calculation
    let calculation=`${req.body.input1} = ${result}`
//push the new calculation into the history array
    calculationHistory.push({calculation, result});
    // Send back a status code of 201
    res.sendStatus(201);
});

//enable server listening
app.listen(port, () => {
    console.log("listening on port", port);
});
//delete a chosen entry in the history array
app.delete( `/calculationHistory/:index`, ( req, res )=>{
    calculationHistory=[];
    res.sendStatus( 200 );
})