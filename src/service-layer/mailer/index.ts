
import * as config from 'config'

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get("sendgrid.key"));
const msg = {
  to: 'abdelhak.akermi@gmail.com',
  from: 'Marketplace',
  subject: 'Congratulation',
  text: 'you have just create new marketplace',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);