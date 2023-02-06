const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database("./src/db/database.db");

const app = express()
const port = 3004

app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json());

database.serialize(() => {
  database.run("CREATE TABLE IF NOT EXISTS movies (name varchar(255))");

  database.run(`
    INSERT INTO movies (name)
    VALUES('The Dark Knight');
`);

});

// controlieris kurš atbild par to, kad tiks prasīts GET piepeasījums uz root, 
// jeb šajā gadījumā http://localhost:3004/
app.get('/', (req, res) => {

  database.get(`SELECT * FROM movies`,(err, row) => {
    res.json(row);
  })
})

// controlieris kurš atbild par to, kad tiks prasīts GET piepeasījums uz root, 
// jeb šajā gadījumā http://localhost:3004/
app.get('/hello-world', (req, res) => {

  res.json({message: "hello back"});
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

