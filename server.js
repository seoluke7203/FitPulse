const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session');
const passport = require('passport');
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const url = require('url');




app.use(express.static(path.join(__dirname, '/build')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());


console.log(path.join(__dirname, '/build'));

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

}, { strict: false })

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    sets: Number,
    reps: Number,
    weight: Number,
    email: String,
    date: String,
});



userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);


const User = new mongoose.model("User", userSchema);
const Note = new mongoose.model("Note", noteSchema);
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
    res.sendFile(path.join(__dirname + "/build/index.html"));

});


app.get("/savedNote", (req, res) => {

    Note.find({})
      .then(foundNotes => {
        console.log("Found notes:", foundNotes);
        res.json(foundNotes);
      })
      .catch(error => {
        console.log("Error retrieving notes:", error);
        res.status(500).json({ error: "Failed to retrieve notes" });
      });
  });


app.get('/logout', function (req, res) {
    req.logOut(function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
})


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});



app.post("/saveNote", function (req, res) {
    const { title, content, sets, reps, weight, email, date } = req.body;

    console.log(req.body.sets);

    // Save the note to the database using your Mongoose model
    const newNote = new Note({
        title: title,
        content: content,
        sets: sets,
        reps: reps,
        weight: weight,
        email: email,
        date: date
    });

    console.log("New note:", newNote);

    newNote.save()
        .then((savedNote) => {
            console.log("Note saved to the database", savedNote);
            res.sendStatus(200);
        })
        .catch(error => {
            console.log("Error saving note to the database:", error);
            res.sendStatus(500);
        });
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
                            query: {
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


app.post("/main", function (req, res) {
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


app.delete('/saveNote/:id', (req,res) =>{
    const noteID = req.params.id;

    Note.findByIdAndRemove(noteID)
    .then(() => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error("Error: ", error);
        console.log("Hello", noteID);
        res.status(500).json({error: "Failed to Delete Note"});
    })
})



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})
