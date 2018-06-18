const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
// const { db } = require('./models');
const models = require('./models');
// const server = http.createServer()
const path = require('path');

const PORT = 1337;


app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
// app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

app.use('/wiki', wikiRouter)
app.use('/users', usersRouter)

app.get("/", (req, res) => {
   res.redirect("/wiki");
  // res.send('home page')
})

// db.authenticate().then(() => {
//   console.log('connected to the database');
//   // console.log(models.Page, models.User, models.db);
// });

module.exports = app;
