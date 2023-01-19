import React from 'react'
// import logo from "../../images/BMMlogo.png"
// import googlelogo from "../../images/google.png"
export default function Login_ByMobile() {
  return (
    <div className="emaillogin">
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <div class="card">
                {/* <img src={logo} alt="BMMlogo" className='logostyle'/> */}
                <div class="card-body">
                    <h5 class="card-title otpheading">OTP Sent to +91 8888888888</h5>
                    <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2"> 
                    <input class="m-2 text-center form-control rounded" type="text" id="first" maxlength="1" /> 
                    <input class="m-2 text-center form-control rounded" type="text" id="second" maxlength="1" /> 
                    <input class="m-2 text-center form-control rounded" type="text" id="third" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="fourth" maxlength="1" /> 
                    <input class="m-2 text-center form-control rounded" type="text" id="fifth" maxlength="1" /> 
                    <input class="m-2 text-center form-control rounded" type="text" id="sixth" maxlength="1" /> 
                    </div>
                    <button type="submit" class="btn btn-primary form-control mb-3 strial">Verify OTP</button>
                    <div className='row'>
                      <div className='col-md-6'><p class="card-text">OTP didn’t received ?
                      </p></div>
                      <div className='col-md-6'><p class="card-text right">Resend OTP</p></div>
                    </div>
                    
                    
                </div>
            </div>
            <p className='already'>Already a  Member ? <a href="">Login</a></p>
        </div>
        <div className="col-md-4"></div>
    </div>
    </div>
  )
}
