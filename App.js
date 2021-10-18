const express = require('express');
const app = express();
const mysql = require('./connection_sql');




app.use(express.json());

app.use(express.urlencoded({
      extended: true
}));

app.get('/todos', (req, res) => {
      var select_id = "SELECT * FROM todos";
      mysql.query(select_id, function (err, result) {
            if (err) {
                  res.status(404).json({
                        message: err
                  });
                  throw err;
            }
            if (result.length > 0) {
                  res.status(200).json(result);
            } else {
                  res.status(404).json({
                        message: "not found"
                  });
            }
      });
});

app.get('/todos/:id', (req, res) => {
      var select_id = "SELECT * FROM todos WHERE id = ?";
      mysql.query(select_id, [req.params.id], function (err, result) {
            if (err) {
                  res.status(404).json({
                        message: err
                  });
                  throw err;
            }
            if (result.length > 0) {
                  res.status(200).json(result);
            } else {
                  res.status(404).json({
                        message: "not found"
                  });
            }
      });
});

app.post('/todos', (req, res) => {
      let td = req.body;
      var insert = "INSERT INTO todos (text, date) values (?, ?) ";
      var date = new Date();
      let value = [td.text, date.toISOString().split('T')[0]];
      mysql.query(insert, value, (err) => {
            if (err) {
                  res.status(404).json({
                        message: err
                  });
                  throw err;
            }
            res.status(200).json({
                  message: 'success'
            });
      });
});

app.delete('/todos/:id', (req, res) => {
      var delete_s = "DELETE FROM todos WHERE id = ?";
      mysql.query(delete_s, [req.params.id], function (err) {
            if (err) {
                  res.status(404).json({
                        message: err
                  });
                  throw err;
            }
            res.status(200).json({ message: "Success" });
      });
});


app.listen(3000, (er) => console.log("connected"));