const nodemailer = require('nodemailer')
const  { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const sendVerification = async (email, string) => {
    const myOAuth2Client = new OAuth2 (
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )

    myOAuth2Client.setCredentials({
    refresh_token:  process.env.GOOGLE_REFRESHTOKEN
    })
    const accessToken =  myOAuth2Client.getAccessToken()
    const transporter = nodemailer.getAccessTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            type: "OAuth2",
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refrechToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "verify account",
        html: ` <a href=http://localhost:3000/api/verify/${string}>CLICK!</a>
        <h3>to confirm!</h3>`
    }
    await transporter.sendMail(mailOptions, function (error, response){
        if(error){
            console.log(error)
        }
        else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendVerification