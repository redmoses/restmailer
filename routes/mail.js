'use strict';

var express = require('express'),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
  async = require('async'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(
    'You\'ve reached the restmailer app.' +
    'For more information please visit ' +
    'http://gitlab.iappdragon.com/dev/restmailer/blob/master/README.md'
  );
});

router.post('/sendmail', function(req, res) {
  // get the request body
  var emails = req.body;
  var result = {};
  result.emails = [];
  var processed = 0,
    success = 0;
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
  async.each(emails, function(email, callback) {
      transporter.sendMail({
        from: email.from || req.app.locals.FROM,
        to: email.to,
        subject: email.subject,
        text: email.message
      }, function(err) {
        var resultEmail = {
          to: email.to,
          from: email.from || req.app.locals.FROM,
          subject: email.subject,
          time: Date(),
          status: 'success'
        };
        if (!err) {
          success++;
        } else {
          resultEmail.status = 'failure';
          resultEmail.error = err;
        }
        result.emails.push(resultEmail);
        processed++;
        if (processed >= emails.length) {
          result.status = success + ' out of ' + processed +
            ' request(s) processed successfully. ' +
            (processed - success) + ' request(s) failed.';
          res.send(result);
        }
        callback(err);
      });
    },
    function(err) {
      if (err) console.error(err);
    });

});

module.exports = router;
