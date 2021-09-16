const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    try {
        sgMail.send({
            to: email,
            from: 'cu.16bcs1652@gmail.com',
            subject: 'First integration for email!',
            text: `Be glad you recieve it ${name}..`
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    sendWelcomeEmail
}