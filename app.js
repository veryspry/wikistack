const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
const { db } = require('./models');

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser);
// app.use("/articles", require("./routes/articles"));

const articlesRoutes = require('./routes/articles');
app.use('/articles', articlesRoutes);

app.get("/", (req, res) => {
  res.redirect("/articles");
})

db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
