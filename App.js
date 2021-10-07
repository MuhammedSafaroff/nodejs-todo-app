const express = require('express');
const app = express();

var mysql = require('./connection_sql');



app.get('/todos', (req, res) => {

});

app.get('/todos/:id', (req, res) => {
    

      res.send("finish");
});

app.post('/todos', (req, res) => {
    

    
});

app.delete('/todos/:id', (req, res) => {

});


app.listen(3000, (er) => console.log("connected"));