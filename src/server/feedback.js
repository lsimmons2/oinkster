import express from 'express'
import nodemailer from 'nodemailer'
import config from '../../config/config'

const router = express();
const transporter = nodemailer.createTransport(config.gmail);


function mailMe(req, res, next){

  let html = '<p>Contact: ' + req.body.contact + '</p>' + '<p>Feedback: ' + req.body.feedback + '</p>';


  let mail = {
    from: req.body.email,
    to: 'leooscar.simmons@gmail.com',
    subject: 'Oinkster Feedback',
    html: html
  };

  return transporter.sendMail(mail, function(err, data){
    if(err){
      console.error(err);
      return res.status(500).send(err);
    }
    return res.status(200).json({
      message: 'Feedback successfully sent.'
    });
  })

};

router.post('/', (req, res, next) => {
  if (typeof req.body.contact !== 'string' || typeof req.body.feedback !== 'string'){
    return res.status(400).json({
      message: 'Bad request. Please make request from http://oinkster.net/feedback.'
    })
  }
  return mailMe(req, res, next);
});

export default router
