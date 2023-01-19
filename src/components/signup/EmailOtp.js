import React from 'react'
// import logo from "../../images/BMMlogo.png"
// import googlelogo from "../../images/google.png"
export default function EmailOtp() {
  return (
    <div className="emaillogin">
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <div class="card">
                {/* <img src={logo} alt="BMMlogo" className='logostyle'/> */}
                <div class="card-body">
                    <h5 class="card-title">Enter business details</h5>
                    <div class="">
                    <label>Country *</label>
                      <select class="form-select mb-3" aria-label="Default select example">
                      <option selected>India</option>
                      <option value="1">India</option>
                      <option value="2">India</option>
                      <option value="3">India</option>
                    </select>
                    <label>Business Name</label>
                    <input type="email" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Enter business name"/>
                    <label>Category</label>
                      <select class="form-select mb-3" aria-label="Default select example">
                      <option selected>Category one</option>
                      <option value="1">Category two</option>
                      <option value="2">Category three</option>
                      <option value="3">Category four</option>
                    </select>
                      <button type="submit" class="btn btn-primary form-control mb-3 strial">Finish</button>
                      
                    </div>
                </div>
            </div>
            
        </div>
        <div className="col-md-4"></div>
    </div>
    </div>
  )
}
