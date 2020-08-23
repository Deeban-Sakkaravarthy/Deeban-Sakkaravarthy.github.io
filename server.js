var path = require('path')
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://ds245478.mlab.com:45478/sports',{user: 'sports', pass: 'chubby1928'},()=>console.log("database connected"));
const userSchema = mongoose.Schema({
    firstname: String,
    game: String,
    mobilenumber: String,
    email: String,
    password: String
}); 
const User = mongoose.model('User', userSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.get('/signup', function(req, res) {
    res.render('pro1');
app.listen(7000);       