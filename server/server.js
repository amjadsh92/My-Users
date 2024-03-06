const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

const mysql = require('mysql');

// Create a connection to mySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cSOFpkPW_aabb',
    database: 'crud_api'
});
// Connect to it     
connection.connect((error) => {
    if (error) {
    console.error(error);
    } else {
    console.log('Connected to the database');
    var sql = "UPDATE tasks SET email = 'amjad@email.com' WHERE email = 'task1'";
   connection.query(sql, (err,data) => {
   if (err) throw err;
   console.log(data.affectedRows + " record(s) updated");
   
});
    }
});     




    
// Create a route and an API endpoint


app.get('/tasks', (request, response) => {
  connection.query('SELECT * FROM tasks', (error, data) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error retrieving users');
    } else {
      response.send(data);
    }
  });
});






// Create a server that listens on a port
app.listen(PORT, () => {
console.log('Server listening on port', PORT);
                });  


