const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email Address</title>
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
        height:500px;
      }

      .logo {
        max-width: 150px;
        margin-bottom: -16px;
        margin-left: auto;
        padding-top:30px
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

      .cta {
        display: inline-block;
        padding: 10px 20px;
        background-color: #ffd60a;
        color: #000000;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
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
        /* background-color: darkblue; */
        /* color: aliceblue; */
        /* height: 100px;
        width: auto;
        margin-top: 0%; */
        /* position: relative; */
    background-color: #121212;
    height: 100px;
    width: auto;
    margin-top: 1vh;

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
    height: 330px;
    width: auto;
    margin-right: 10%;
        /* position: absolute; */
      }
      .line {
        margin-top: 1%;
        border: solid #121212;
      }
      .lt{
      height: 85px;
      width: auto;
      white-space: nowrap;
      }
  
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
     <div class="lt">
            <a href="">
            <img class="logo" src="https://postimg.cc/5jpRnrxz" alt="logoOnly"></a>
            <!--<h3 class="titlee"> -->
             <!--EatEasy</h3> -->
     </div>
        <!-- 444444 -->
        <div class="card">
          <div class="message">Verify Your Email Address</div>
          <div class="line"></div>
          <div class="body">
				
                <p>Verify your email to finish signing up with EatEasy. Use the </br>following verification code:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.</p>
		  </div>
        </div>
        <div class="support">For any further queries or clarification, feel free to reach out to us by visiting <a
					href="mailto:sundram.smn@gmail.com">vidya@sarthi.com</a>. We are here to help!</div>
		</div> 
      </div>
      <!--4444  -->
      </div>
    </div>
   
  </body>
</html>


`;
};
module.exports = otpTemplate;
