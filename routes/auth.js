const express= require('express')
const authRouter = express.Router()
const nodemailer= require('nodemailer')
const {google} = require('googleapis')
const OAuth2= google.auth.OAuth2
const client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

const {register, login} = require("../controllers/auth")


const mail= async(req, res, next)=>{
  await client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
  let {token} = await client.getAccessToken()
  
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        // clientSecret: process.env.CLIENT_SECRET,
        // refreshToken: process.env.REFRESH_TOKEN,
        accessToken:token,
        tls: {
          rejectUnauthorized: false,
        },
      },
    });
    try {
      
      const info = await transporter.sendMail({
        from: "Testing ",
        to: "sujan.baskota77@gmail.com",
        subject: "Testing",
      });
      res.json("mail sent")
      console.log('message sent')
    } catch (error) {
      console.log(error)
      next (error)
    }
}
    
    

authRouter.route('/auth/register').post(register)
authRouter.route('/auth/mail').get(mail)
authRouter.route('/auth/login').post(login)


module.exports = authRouter