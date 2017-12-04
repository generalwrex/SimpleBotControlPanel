var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {

    if (username != "admin" && password != "admin") { 
      return cb(null, false); 
    }
    return cb(null, username);

}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
    
passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

var router = express.Router();

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

var env = {

};

router.get('/', function(req, res, next) {
  res.render('index', { env: env, user: req.user});
});

router.get('/login',function(req, res){
  res.render('login', { env: env });
});

router.post('/login',
passport.authenticate('local', { successRedirect: '/sbcp',
                                 failureRedirect: '/login',
                                 failureFlash: true })
);

router.get('/logout', function(req, res){ 
  req.logout();
  res.redirect('/');
});

router.get('/sbcp', 
  ensureLoggedIn, 
  function(req, res, next) {
  // Same thing for our
  res.render('sbcp', {env: env, user: req.user });
});

module.exports = router;
