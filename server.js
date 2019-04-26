const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require('./controllers/scrapeControl');

app.use(routes);


app.listen(PORT, () => {
    console.log("App listening at http://localhost:" + PORT);
});