
import * as config from 'config'

const sgMail = require('@sendgrid/mail');
const KEY_SENDGRID=config.get("sendgrid.key")
const DOMAIN=config.get("domain")


export const MailerService={
  send: (name,email,token)=>{
    console.log(name,email,token);
    sgMail.setApiKey(KEY_SENDGRID);
    let link=`${DOMAIN}/account?action=verifyy&tkt=${token}`
    let _html=`<h4>Hi ${name}</h4><p>please click <a href="${link}"> here </a>to confirm your account`
    const msg = {
      to: email,
      from: 'admin@marketplace.com',
      subject: 'Congratulation',
      text: 'you have just create new marketplace',
      html: _html,
    };
      sgMail.send(msg);
  }
}