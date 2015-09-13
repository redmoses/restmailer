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
    host: 'smtp.hosts.co.uk',
    port: 25,
    auth: {
      user: 'iappdragon.com',
      pass: 'GfMDOyv836o'
    }
  }));
  //send email
  var mailCount = 0;
  async.each(emails, function(email, callback) {
      if (email.to === '') callback();
      transporter.sendMail({
        from: 'musa.nasrullah@iappdragon.com',
        to: email.to,
        subject: email.subject,
        text: email.message
      }, function(err) {
        if (!err)
          mailCount++;
        callback();
      });
    },
    function(err) {
      if (err) res.send(err);
      var msg = 'Could not send any email(s).';
      if (mailCount > 0)
        msg = 'Successfully sent ' + mailCount + ' email(s).';
      res.send(msg);
    });
});

module.exports = router;
