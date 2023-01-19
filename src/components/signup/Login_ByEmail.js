import React from 'react'
import "./signup_ByEmail.css"
// import logo from "../../images/BMMlogo.png"
// import googlelogo from "../../images/google.png"
export default function Login_ByEmail() {
  return (
    <div className="emaillogin">
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <div class="card">
                {/* <img src={logo} alt="BMMlogo" className='logostyle'/> */}
                <div class="card-body">
                    <h5 class="card-title">Start 7 days Free trial</h5>
                    <div class="">
                      <input type="email" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Enter email  or mobile number"/>
                      <button type="submit" class="btn btn-primary form-control mb-3 strial">Start trial</button>
                      <button type="submit" class="btn btn-primary form-control mb-3 googlebtn"><img  alt="BMMlogo"/> Google </button>
                    </div>
                    <p class="card-text">By continuing, you agree to our Terms of Use and Privacy Policy.</p>
                    
                </div>
            </div>
            <p className='already'>Already a  Member ? <a href="">Login</a></p>
        </div>
        <div className="col-md-4"></div>
    </div>
    </div>
  )
}
