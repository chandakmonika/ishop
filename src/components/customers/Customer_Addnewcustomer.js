import React, { useState } from "react";
import { validateEmail, validateMobileNumber, validateRequired } from "../../utils/form-validation";

import { toaster } from "../../utils/toaster";
import { useNavigate } from "react-router-dom";

export default function Customer_Addnewcustomer() {
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [email, setEmail] = useState({
  //   value: '',
  //   error: ''
  // });
  // const [phone, setPhone] = useState("");
  const storename = localStorage.getItem("USER_NAME")
  const [addCustomerData, setAddCustomerData] = useState({
    first_name: {
      value: '',
      error: ''
    },
    last_name: {
      value: '',
      error: ''
    },
    email: {
      value: '',
      error: ''
    },
    phone: {
      value: '',
      error: ''
    },
  })

  const navigate = useNavigate();

  const customerUser = (e) => {
    e.preventDefault();

    const { first_name, last_name, email, phone } = addCustomerData

    const productDataValidated = {
      ...addCustomerData,
      email: {
        value: email.value,
        error: validateEmail(email.value).error
      },
      phone: {
        value: phone.value,
        error: validateRequired(phone.value).isError ? validateRequired(phone.value).error : validateMobileNumber(phone.value).error
      }
    }

    setAddCustomerData(productDataValidated)

    const ErrorFields = Object.entries(productDataValidated).filter((err) => typeof err[1] === "object" && err[1].error)

    console.log(54546, Object.entries(productDataValidated), ErrorFields)

    if (ErrorFields.length === 0) {
      let datas = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        phone: phone.value,
      };

      fetch("http://admin.ishop.sunhimlabs.com/api/v1/customer/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename: storename,
        },
        body: JSON.stringify(datas),
      }).then((result) => {
        result.json().then((resps) => {
          console.warn("resps", resps);
          toaster(resps, 'Customer Added Successfully!')
          if (resps === true) {
            navigate("/customer/list")
          }
        });
      });
    }
  }
  const handleChange = (e) => {
    setAddCustomerData({
      ...addCustomerData,
      [e.target.name]: {
        value: e.target.value,
        error: ''
      }
    })
  };


  const { first_name, last_name, email, phone } = addCustomerData
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
                value={first_name.value}
                onChange={(e) => handleChange(e)}
                name="first_name"
              />

              <label className="demo">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                value={last_name.value}
                onChange={(e) => handleChange(e)}
                name="last_name"
              />

              <label className="demo">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                value={email.value}
                onChange={(e) => handleChange(e)}
                name="email"

              />
              {
                email.error.length > 0 &&
                <p style={{ color: 'red', fontSize: '12px' }}>{email.error}</p>
              }

              <label className="demo">Mobile Number</label>
              <input
                type="phone"
                className="form-control"
                placeholder="Enter Mobile Number"
                value={phone.value}
                onChange={(e) => handleChange(e)}
                name="phone"
              />
              {
                phone.error.length > 0 &&
                <p style={{ color: 'red', fontSize: '12px' }}>{phone.error}</p>
              }
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



