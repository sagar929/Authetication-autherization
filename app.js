const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');


app.set("view engine", "ejs");
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/create', async(req, res) => {
    let {username, email, password, age} = req.body;

   bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password, salt, async(err, hash) => {
       // Here you would typically save the user with the hashed password
        let createdUser = await userModel.create({
            username,
            email,
            password: hash,
            age
        });

      let token =   jwt.sign({email},"shhhhhhhhhhhhhhhhhhhsss");
        res.cookie("token",token);


        res.send(createdUser)

      
    })
    })
        
       
    });

app.get('/login', (req, res) => {
  res.render('login');
}) ; 

app.post('/login', async(req, res) => {
    // let {email, password} = req.body;
    let user = await userModel.findOne({email: req.body.email});
    if(!user){
        return res.send("User not found");
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result){
           res.send("Login successful");
        }else{
            res.send("Invalid credentials");
        }
    })
});
    
app.get("/logout", (req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})


app.listen(3000);