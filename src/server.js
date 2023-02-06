const express = require('express')
const bodyParser = require('body-parser')

const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database("./src/db/database.db");

const app = express()
const port = 3004

app.use(bodyParser.json());

database.serialize(() => {
  database.run("CREATE TABLE IF NOT EXISTS movies (name varchar(255))");

  database.run(`
    INSERT INTO movies (name)
    VALUES('The Dark Knight');
`);

});

app.get('/', (req, res) => {

  database.get(`SELECT * FROM movies`,(err, row) => {
    res.json(row);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

