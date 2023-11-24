exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Update Confirmation</title>
    <style>
      body {
        background-color: whitesmoke;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        /* color: #333333; */
        margin: 0;
        padding: 0;
      }

      .container {
        /* background-color: rgb(255, 250, 250); */
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        /* position: absolute; */
      }
      .logo {
        max-width: 150px;
        margin-bottom: -16px;
        margin-left: auto;
        padding-top:30px;
      }
      .message {
        font-size: 18px;
        font-weight: bold;
        padding-top: 3%;
        margin-bottom: 10px;
      }

      .body {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
      }

      .highlight {
        font-weight: bold;
      }
      .header {
        background-color: darkblue;
        /* color: aliceblue; */
        height: 100px;
        width: auto;
        margin-top: 0%;
        /* position: relative; */
      }
      .titlee {
        margin-top: -32px;
        height: 50%;
        padding-top: 5%;
        color: white;
      }
      .middle {
        background-color: rgb(236, 233, 233);
        /* position: relative; */
      }
      .card {
        background-color: white;
        margin-left: 10%;
        height: auto;
        width: auto;
        margin-right: 10%;
        margin-top: -10px;

        /* position: absolute; */
      }
      .line {
        margin-top: 1%;
        border: solid darkblue;
      }
      .lt {
        height: auto;
        width: auto;
        white-space: nowrap;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <div class="lt">
          <a href=""
            ><img
              class="logo"
              src="https://ibb.co/kmkXVZK"
              alt="EatEasy Logo"
          /></a>
       
        </div>

        <div class="middle">
          <div class="card">
            <div class="message">Password Update Confirmation</div>
            <div class="line"></div>
            <div class="body">
              <p>Hey ${name},</p>
              <p>
                Your password has been successfully updated for the email
                <span class="highlight">${email}</span>.
              </p>
              <p>
                If you did not request this password change, please contact us
                immediately to secure your account.
              </p>
            </div>
          </div>
          <div class="support">
            If you have any questions or need further assistance, please feel
            free to reach out to us at
            <a href="mailto:sundram.smn@gmail.com">sundram.smn@gmail.com</a>. We are
            here to help!
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};
