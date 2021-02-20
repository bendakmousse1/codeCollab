var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/login')
  .get(function (req, res, next) {
    res.render('login', { title: 'Connectez-vous à votre compte' });
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/login'
  }), function (req, res) {
    res.redirect('/');
  });

router.route('/register')
  .get(function (req, res, next) {
    res.render('register', { title: 'Créer un nouveau compte' });
  })
  .post(function (req, res, next) {
    req.checkBody('name', 'Nom vide').notEmpty();
    req.checkBody('email', "Email n'est pa valide").isEmail();
    req.checkBody('password', 'Mot de passe vide').notEmpty();
    req.checkBody('password', "Mot de passe ne correspondent pas").equals(req.body.confirmPassword).notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.render('register', {
        name: req.body.name,
        email: req.body.email,
        errorMessages: errors
      });
    } else {
      var user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.setPassword(req.body.password);
      user.save(function (err) {
        if (err) {
          res.render('register', { errorMessages: err });
        } else {
          res.redirect('/login');
        }
      })
    }
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
