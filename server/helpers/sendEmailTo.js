const nodemailer = require('nodemailer');

function sendEmailTo(sender, recipients, articleId) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: recipients,
        subject: `New Article From ${sender}`,
        html: `    
        <h3>New Article Form ${sender}</h3>
        <a href="https://blog.fmurtadho.com/article/${articleId}" target="blank">
            Check This Out!
        </a>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Send Mail Error: ', error);
            console.log('Error Message: ', error.message);
        }

        console.log('Send Email Result: ', info);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = sendEmailTo;