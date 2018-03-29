const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Formation = require('../models/formation');
const router = express.Router();

const fetch = require('node-fetch');

//API Key= 5edd98ce34fbd27acab549e7451bbafcf13f243565ebf20828fdf4625b7e2962

/*https://apifootball.com/api/?action=get_countries&APIkey=xxxxxxxxxxxxxx*/




router.get('/', (req, res) => {
    Formation.find().exec().then(formations => {
        res.render('index', {user: req.user, formations: formations});      
    }).catch(err => { throw err})
});

router.get('/register', (req, res) => {
    res.render('register', { });
});

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
router.post('/newFormation', (req, res) => {
    let formation = new Formation(req.body);
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

//load the formation based on id
router.get('/formation/:id', (req, res) => {
    console.log(req.params);
    //res.render('formation');

    Formation.findOne({ _id: req.params.id}).exec().then(f => {

            req.app.locals.dots = JSON.stringify(f.dots);
            //req.app.locals.test = [{'name':'hi'}];
          res.render('formation', {formation:f, user:req.user, dotArray: f.dots})
    }).catch(err => { throw err})
});




router.get('/profile', (req, res) => { 
    
    Formation.find({ author: req.user._id}).exec().then(f => {
        res.render('profile', {user: req.user, formations: f});      
    }).catch(err => { throw err})
});




//render login page
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


//Create new formation document on click of 'fork'
router.post('/formation/fork/:_id', (req, res) => {
    
});

module.exports = router;
