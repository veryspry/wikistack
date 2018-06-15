const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
const { db } = require('./models');
const PORT = 1337;


app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser);
// app.use("/articles", require("./routes/articles"));

// const articlesRoutes = require('./routes/articles');
// app.use('/articles', articlesRoutes);

const wiki = require('./routes/wiki');
const users = require('./routes/users');

function makeSlug(str) {
  let regex = /[^A-Za-z0-9-]+/
  str.replace(regex, '_');
}

makeSlug('hello you')

app.use('/wiki', wiki)
app.use('/users', users)

app.get("/", (req, res) => {
  //  res.redirect("/wiki");
  res.send('home page')
})

db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  const dbPORT = 5432;
  await db.sync({force : true});
  app.listen(dbPORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    });
}

init();

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
