const express = require("express");
const bodyParser = require('body-parser');
const calculationHistory = require("./modules/calculationHistory");
const calculator = require('.modules/calculator')
const app = express();
const port = 5000;
app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended : true }));
//some module based variables

// Route to get quotes
app.get('/quotes', function(req, res) {
    console.log('Request for /quotes was made');

    // send back list of quotes to client
    res.send(calculationHistory);
})

// Route to post quotes
app.post('/calculationHistory', function(req,res) {
    // req.body is the data the client has sent
console.log(req);

    // Push the quote into our array
    calculationHistory.push(calculator(req));

    // Send back a status code of 201
    res.sendStatus(201);
});




app.listen(port, () => {
    console.log("listening on port", port);
});