require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { log } = require("console");
const ejs = require("ejs");


const app = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

module.exports = app;