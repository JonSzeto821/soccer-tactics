const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Formation = require('../models/formation');
const Feedback = require('../models/feedback');
const router = express.Router();

const fetch = require('node-fetch');

//API Key= 5edd98ce34fbd27acab549e7451bbafcf13f243565ebf20828fdf4625b7e2962

/*https://apifootball.com/api/?action=get_countries&APIkey=xxxxxxxxxxxxxx*/



//load and display home page
router.get('/', (req, res) => {
    Formation.find().exec().then(formations => {
        res.render('index', {user: req.user, formations: formations});      
    }).catch(err => { throw err})
});

//load and display register page
router.get('/register', (req, res) => {
    res.render('register', { });
});

//Create a new user account
router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

//GET API data - do not use
router.get('/soccer', (req, res) => {
  fetch('https://apifootball.com/api/?action=get_countries&APIkey=5edd98ce34fbd27acab549e7451bbafcf13f243565ebf20828fdf4625b7e2962')
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.render('soccer', {'beans': '10', teams: json});

    });
});

//submit new formation post
router.post('/newFormation', isLoggedIn, (req, res) => {
    let formation = new Formation(req.body);
    console.log('penguin');
    console.log(req.body, req.user._id);
    formation['date'] = new Date();
    formation['author'] = req.user._id;
    formation['authorName'] = req.user.username;
    formation.save((err, f) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        console.log(f);
        res.redirect(`/formation/${f._id}`);
  });  
});

//submit a comment
router.post('/submitComment', isLoggedIn, (req, res) => {
    let comment = new Feedback();
    console.log('Giraffe');
    console.log(req.body);
    comment['feedback'] = req.body.userFeedback;
    comment['author'] = req.user._id;
    comment['authorName'] = req.user.username;
    comment['date'] = new Date();
    comment.save((err, f) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.redirect(`back`);
    });
});

//load the formation based on id
router.get('/formation/:id', (req, res) => {
    console.log(req.params);
    //res.render('formation');
    Feedback.find().exec().then(pigeons => {
        Formation.findOne({ _id: req.params.id}).exec().then(frog => {

            req.app.locals.dots = JSON.stringify(frog.dots);
            console.log(frog.dots);
            let team1 = [];
            let team2 = [];
            let team1Name = frog.dots[0].team

            frog.dots.forEach(function(dot, i) {
                if(team1Name == dot.team) {
                    team1.push(dot);
                }else{
                    team2.push(dot);
                }

            });
            res.render('formation', {formation:frog, user:req.user, team1: team1, team2: team2, comments: pigeons})
        }).catch(err => { throw err})

    
            
    }).catch(err => { throw err})

});

//load and display user profile page
router.get('/profile', (req, res) => { 
    
    Formation.find({ author: req.user._id}).exec().then(f => {
        res.render('profile', {user: req.user, formations: f});      
    }).catch(err => { throw err})
});

//load and display login page
router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

//log in the user
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/profile');
    });
});

//logout and redirect user to home page
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

//Express test client to server-side connection
router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

//Save formation
router.post('/formation/:_id', (req, res) => {
    console.log(req.body, req.params);
    let b = {dots: JSON.parse(req.body.dots) }
    Formation.findOneAndUpdate(req.params, {$set: b}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
    });
});

//Fork a formation
router.post('/forkForm', (req, res) => {
    let formation = new Formation(req.body);

    console.log('Fork Form actually works!')
    console.log(req.body, req.user._id);

    formation['date'] = new Date();
    formation['author'] = req.user._id;
    formation['authorName'] = req.user.username;  
    formation['name'] = req.body.name;
    formation['dots'] = JSON.parse(req.body.dots);
    formation.save((err, f) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        console.log(f);
        // res.redirect('/profile');
  });

 });

//get deleteForm
router.get('/deleteForm/:_id', (req, res) => {
    console.log(req.body, req.params);
    console.log(`Deleted formation`);
    res.status(200).send("pong!");
});

//Delete a formation
router.delete('/formation/:_id', (req, res) => {
    console.log(req.body, req.params);
    console.log(`Deleted formation SERVER SIDE!!!`);
    // enter mongo call to delete formation, then res.redirect
    res.status(200).send("Formation deleted through ajax!").redirect("/");
});


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;
