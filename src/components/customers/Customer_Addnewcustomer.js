import React, { useState, useEffect,  } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { toaster } from "../../utils/toaster";

export default function Customer_Addnewcustomer() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  function customerUser(e) {
    e.preventDefault();
    console.warn(first_name, last_name, email, phone);
    let datas = {
      first_name,
      last_name,
      email,
      phone,
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/customer/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, 'Customer Added Successfully!')
        if(resps === true ){
            navigate("/routing/customer/list")
        }
      });
    });
  }
 

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h4 style={{ paddingLeft: "2rem" }}>
        
        <span>Add New Customer</span>
      </h4>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />

          <h6 style={{ paddingLeft: "2rem" }}>Customer Details</h6>
          <form onSubmit={customerUser} style={{ Display: "float-right", paddingLeft: "2rem" }}>
            <div
              className="form-group"
              controlId="formBasicFirstName"
              style={{ width: "40%" }}
            >
              <label className="demo">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First name"
                value={first_name}
                onChange={(e) => {
                  setFirst_name(e.target.value);
                }}
                name="first_name"
              />

              <label className="demo">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                value={last_name}
                onChange={(e) => {
                  setLast_name(e.target.value);
                }}
                name="last_name"
              />

              <label className="demo">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
               
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.trim());
                }}
                name="email"
               
              />

              <label className="demo">Mobile Number</label>
              <input
                type="phone"
                className="form-control"
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                name="phone"
              />
            </div>
            {/* <Link to="/routing/customer/list"> */}
            <button type="submit" class="btn btn-info">
              Add Customer
            </button>
            {/* </Link> */}
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}

