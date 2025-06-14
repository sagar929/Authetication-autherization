const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const userModel = require('./models/user');


app.set("view engine", "ejs");
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});


app.listen(3000);