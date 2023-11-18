const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  REDIRECT_URI
);
const REFRESH_TOKEN = process.env.REFRESH_TOKEN.toString();
// console.log(REFRESH_TOKEN);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
console.log("oAuth2Client credentials set");
exports.mailSender = async (email, title, body) => {
  try {
    console.log("Before fetching accesstokens");
    const accessToken = await oAuth2Client.getAccessToken();
    // console.log(accessToken)
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "sundram.smn@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "sundram.smn@gmail.com",
      to: email,
      subject: title,
      // text: `${body}`,
      html: body,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};
