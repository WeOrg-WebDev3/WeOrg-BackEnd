//IMPORTANT NOTE!!!
//REMOVE API KEY BEFORE PUSHING TO GITHUB
const fs = require('fs');
var template = fs.readFileSync('./template.html');
template = template.toString();

let email = (receiver_email) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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"); 
    const msg = {
        to:receiver_email,
        from: 'weorg@protonmail.com',
        cc:   'princessjoy.duran@student.passerellesnumeriques.org',
        subject: 'WeOrg Inquiry Notification',
        text: 'You have received an inquiry. Visit your account to view more details.',
        html: template,
    };
    if (sgMail.send(msg)) {
        console.log("Inquiry Notification Sent");
    } else {
        console.log("Inquiry Notification Error");
        
    }
    sgMail.send(msg);
}

module.exports = { email }