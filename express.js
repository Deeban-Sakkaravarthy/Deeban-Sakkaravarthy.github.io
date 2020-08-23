var path = require('path')
var express = require('express');
var bodyParser = require("body-parser");
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:7001/magencies';
var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://ds133353.mlab.com:33353/magencies',{user: 'magencies', pass: 'kingchakku@vit2'},()=>console.log("database connected"));
const userSchema = mongoose.Schema({
    firstname: String,
    companyname: String,
    mobilenumber: String,
    email: String,
    password: String
}); 
const User = mongoose.model('User', userSchema);

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', function(req, res){
    var firstname = req.body.firstname;
    var companyname = req.body.companyname;
    var mobilenumber = req.body.mobilenumber;
    var email = req.body.email;
    var password = req.body.password;
    User.find({email}, function(err, docs){
        if(docs.length >= 1)
            {
                res.send(500,'showAlert'); 
            }
        else
            {
                const userx = new User ({
        firstname,
        companyname,
        mobilenumber, 
        email,
        password
    })
    userx.save().then(function(){
        console.log('signup saved')
        res.end(JSON.stringify({"status":200,"msg":"signup success"}))
    }).catch(err => {
        res.end(JSON.stringify({status:400,msg:"database error"}))
    });
                
            }
    });
    console.log('signup passed')
    
});
app.get('/login', function(req, res) {
    res.render('login');
});
app.get('/home', function(req, res) {
    res.render('home', {username:''});
});
app.post('/home', function(req, res) {
    console.log('home requested', res)
    var user = req.body.user;
    User.find({email: user}, (err, docs) =>{
        console.log(docs);
        res.end(JSON.stringify({data: docs}))
    })
});


app.get('/', function(req, res) {
    res.render('index');
});

app.post('/login', function(req, res){
//    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
//    console.log('login requested from front end',username,password)
    User.find({email: username}, function(err, docs){
        if(docs[0].password == password)
            {
                res.render('home',{username})
            }
        
    });
    
});
app.get('/placeorder', function(req, res){
    res.render('placeorder')
});
const placeorderSchema = mongoose.Schema({
    date: String,
    smNoofbox: String,
    smweight: String,
    bgNoofbox: String,
    bgweight: String,
    user: String
});

const Placeorder = mongoose.model('Placeorder', placeorderSchema);

app.post('/placeorder', function(req, res){
    var smNoofbox = req.body.smNoofbox;
    var smweight = req.body.smweight;
    var bgNoofbox = req.body.bgNoofbox;
    var bgweight = req.body.bgweight;
    var user = req.body.user;
    var dt = new Date()
    var date = dt.getDate() + "/" + parseInt(dt.getMonth()+1) + "/" + dt.getFullYear();
    console.log('placeorder passed')
    
    const placeorderx = new Placeorder({
        date,
        smNoofbox,
        smweight,
        bgNoofbox,
        bgweight,
        user
    })
    placeorderx.save().then(function(){
        console.log('order saved')
        res.end(JSON.stringify({"status":200,"msg":"order success"}))
    }).catch(err => {
        res.end(JSON.stringify({status:400,msg:"database error"}))
    });
});
app.get('/vieworder', function(req, res){
    res.render('vieworder');
});
app.post('/vieworder', function(req, res){
//    console.log('vieworedr requested', req)
    var user = req.body.user;
    Placeorder.find({user}, (err, docs) =>{
        console.log(docs);
        res.end(JSON.stringify({data: docs}))
    })

});
var port = process.env.PORT || "7001"
app.listen(port);

// Static file serving
// Templating
// Session variable