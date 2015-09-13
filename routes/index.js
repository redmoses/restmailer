'use strict';

var express = require('express'),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
  async = require('async'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/sendmail', function(req, res) {
  // get the request body
  var emails = req.body;

  //set up transporter
  var transporter = nodemailer.createTransport(smtpTransport({
    host: req.app.locals.HOST,
    port: req.app.locals.PORT,
    auth: {
      user: req.app.locals.USER,
      pass: req.app.locals.PASS
    }
  }));
  //send email
  var mailCount = 0;
  async.each(emails, function(email, callback) {
      transporter.sendMail({
        from: req.app.locals.FROM,
        to: email.to,
        subject: email.subject,
        text: email.message
      }, function(err) {
        callback(err);
      });
    },
    function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send('Email(s) sent successfully.');
      }
    });
});

module.exports = router;
