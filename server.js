const express = require('express');
const bodyParser = require('body-parser');
const { createRoot } = require("react-dom/client");
const path = require('path');
const app = express();
const React = require('react');
const session = require('express-session');
const passport = require('passport');
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
// const connectDB = require("./config/db");
// const userSchema = require("./src/models/userSchema");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const url = require('url');




app.use(express.static(path.join(__dirname, '/build')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());




mongoose.connect("mongodb+srv://seoluke7203:POrNuRXJyevw44fO@cluster0.ztu7jxn.mongodb.net/FitPulse",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    googleId: String,
    fName: String,
    lName: String,

},{strict:false})  

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);


const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

app.get('/main', function (req, res) {
    console.log("connecting to main");
    // if (req.isAuthenticated()) {
    //     console.log("Authenticated");
    //     res.sendFile(path.join(__dirname + "/build/index.html"));
    // } else {
    //     console.log("Not authenticated");
    //     res.redirect('/');
    // }
    // res.redirect('/main');
    res.sendFile(path.join(__dirname + "/build/index.html"));
});



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});





app.post('/register', function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // console.log(req.body.useremail);
        const newUser = new User({
            email: req.body.useremail,
            password: hash,
            fName: req.body.userfName,
            lName: req.body.userlName,
        });

        newUser.save();
        console.log("New user saved!");

        res.redirect("/");
    });

});


app.post('/', function (req, res, next) {

    const email = req.body.useremail;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(function (foundUser) {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result === true) {
                        res.redirect(url.format({
                            pathname: "/main",
                            query:{
                                fName: foundUser.fName,
                                lName: foundUser.lName,
                                email: foundUser.email,
                            }
                        }));
                        console.log(foundUser);

                    } else {
                        console.log("wrong password");
                    }
                });
            } else {
                console.log("Wrong username");
            }
        });
});


app.post("/main", function(req, res) {
    const userId = req.body.id;
    
    User.findOneAndUpdate(
      { email: userId },
      // add new exercise in array form, sets, reps, weight, date...
      { $set: { Testing: "Test2" } },
      { new: true }
    )
      .then(updatedUser => {
        if (updatedUser) {
          console.log("Data updated successfully", updatedUser);
          // Handle the updated user data
        } else {
          console.log("User not found");
          // Handle the case where the user is not found
        }
      })
      .catch(err => {
        console.log(err);
        // Handle the error appropriately
      });
  });

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})

