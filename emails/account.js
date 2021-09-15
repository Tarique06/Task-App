const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = async (email, name) => {
    try {
        sgMail.send({
            to: email,
            from: 'tariquemd914@gmail.com',
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