import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function StoreDetails() {
  const [file, setFile] = useState();

  
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  return (
    <div style={{ paddingLeft: "4rem" }}><br/>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <dl>
                <dd>
                <Link to="/storedetails" >
                  <i className="fa fa-address-book"></i>&nbsp;&nbsp;&nbsp;
                  <span>Store Details</span>
                  </Link>
                </dd>
                <hr></hr>
                <dd>
                <Link to="/account/subscrption" >
                  <i className="fa fa-address-book"></i>&nbsp;&nbsp;&nbsp;
                  <span>Subscrption</span>
                  </Link>
                </dd>
                <hr></hr>
                <dd>
                  <i className="fa fa-address-book"></i>&nbsp;&nbsp;&nbsp;
                  <span>Invoices</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h5>Store Details</h5>
          <div className="card" style={{ paddingLeft: "1rem", height: "14rem" }}>
            <div className="card-body">
              <p style={{ textAlign: "left" }}>Store Logo</p>
              <form>
                <input type="file" onChange={handleChange} />
                <button type="submit">Upload Image</button>
              </form>
            </div>
          </div>
          <br />

          <div className="card">
            <div className="card-body">
              <p style={{ textAlign: "left" }}>Store Information</p>
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Store Link</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="Enter Link"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Bussiness Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Bussiness Name"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Bussiness Category</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Bussiness Category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Mobile Number"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Email Address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Country</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Country"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">FSSAI Number</label>
                    <input
                      type="number"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter FSSAI Number"
                    />
                  </div><br/>
                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Store Address</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>

                </div>
              </form>
            </div>
          </div><br/>
          <button class="btn btn-info btn-lg float-right" type="submit">
                      Save
                    </button>
        </div>
      </div>
    </div>
  );
}
