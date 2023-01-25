import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { validateAlphaNumeric, validateEmail, validateMobileNumber, validateRequired, validateZipCode } from "../../utils/form-validation";

import axios from "axios";
import { toaster } from "../../utils/toaster";
import { useParams } from "react-router-dom";

export default function Customer_Editcustomer() {
  const storename = localStorage.getItem("USER_NAME")
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [gender, setGender] = useState("");
  
  const [userdata, setUser_data] = useState({
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
    gender: {
      value: 'm',
      error: '',
    },
  });
  const { user_id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/details/${user_id}`,{
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "Application/json",
            storename: storename,
          },
          // body: JSON.stringify(productInputData),
        }
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        let setObj = {}
        Object.entries(getData).forEach((obj) => {
          // console.log(546, obj)
          setObj = {
            ...setObj,
            [obj[0]]: {
              value: obj[1],
              error: ""
            }
          }
        })
        setUser_data({
          ...userdata,
          ...setObj
        });
      });
  }, []);

  // const handleChange = (e) => {
  //   console.log(e.target);

  //   setUser_data({
  //     ...userdata,
  //     [e.target.name]: e.target.value,
  //   });
  // };


  const customerUser = (e) => {
    // console.warn(first_name, last_name, email, phone, gender);
    e.preventDefault();
    const { first_name, last_name, email, phone, gender,  } = userdata

    const productDataValidated = {
      ...userdata,
      first_name: {
        value: first_name.value,
        error: validateRequired(first_name.value).isError ? validateRequired(first_name.value).error : validateAlphaNumeric(first_name.value).error
      },
      last_name: {
        value: last_name.value,
        error: validateAlphaNumeric(last_name.value).error
      },
      email: {
        value: email.value,
        error: email.value ? validateEmail(email.value).error : ""
      },
      phone: {
        value: phone.value,
        error: phone.value ? validateMobileNumber(phone.value).error : ""
      },
     
      
    }

    console.log(324, productDataValidated)

    setUser_data(productDataValidated)

    const ErrorFields = Object.entries(productDataValidated).filter((err) => typeof err[1] === "object" && err[1].error)

    console.log(54546, Object.entries(productDataValidated), ErrorFields)

    if (ErrorFields.length === 0) {

      let datas = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        phone: phone.value,
        gender: gender.value,
        user_id,
      };
      console.warn(
        345,
        first_name,
        last_name,
        email,
        phone,
        gender, 
        user_id
      );


    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/customer/edit/`, {
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
        toaster(resps, 'Customer Updated Successfully!')
        if(resps === true ){
            navigate("/customer/list")
        }
      });
    });
  }
}
const handleChange = (e) => {
  setUser_data({
    ...userdata,
    [e.target.name]: {
      value: e.target.value,
      error: ''
    }
  })
};

const inputFieldError = (error) => {
  if (error && error.length > 0) {
    return <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
  }
  return <></>
}

const { first_name, last_name, email, phone, addressline1, addressline2, zipcode, gender, isdefault, address_type, country, state, city, } = userdata
  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h5 style={{ paddingLeft: "2rem" }}>Customer Details</h5>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />
          <form
            onSubmit={customerUser}
            style={{ Display: "float-right", paddingLeft: "2rem" }}
          >
            <div
              className="form-group"
              controlId="formBasicFirstName"
              style={{ width: "40%" }}
              >

              <label className="demo">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="Enter First Name"
                value={userdata.first_name.value}
                onChange={(e) => handleChange(e)}
              />
{inputFieldError(first_name.error)}
<br />
              <label className="demo">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter Last Name"
                value={userdata.last_name.value}
                onChange={(e) => handleChange(e)}
              />
              {inputFieldError(last_name.error)}
              <br />

              <label className="demo">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={userdata.email.value}
                onChange={(e) => handleChange(e)}
              />
              {inputFieldError(email.error)}
              <br />
           
              <label className="demo">Mobile Number</label>
              <input              
                type="phone"
                className="form-control"
                name="phone"
                placeholder="Enter Mobile Number"
                value={userdata.phone.value}
                onChange={(e) => handleChange(e)}
                />
                {inputFieldError(phone.error)}
                <br />

              <label for="exampleFormControlSelect1">Gender</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="gender"
                value={userdata.gender.value}
                onChange={(e) => handleChange(e)}
              >
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </select>
            </div>
         
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Update 
            </button>
            
            &nbsp;
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}

