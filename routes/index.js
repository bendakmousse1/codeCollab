var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'codeCollab - une platform pour coder en collaboration.' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'codeCollab - une platform pour coder en collaboration.' });
});

router.route('/contact')
  .get(function (req, res, next) {
    res.render('contact', { title: 'codeCollab - une platform pour coder en collaboration.' });
  })
  .post(function (req, res, next) {
    req.checkBody('name', 'Nom vide').notEmpty();
    req.checkBody('email', 'Email non valide').isEmail();
    req.checkBody('message', 'Message vide').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
      res.render('contact', {
        title: "codeCollab - une platform pour coder en collaboration.",
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      res.render('merci', { title: 'codeCollab - une platform pour coder en collaboration' });
    }

  });

module.exports = router;
