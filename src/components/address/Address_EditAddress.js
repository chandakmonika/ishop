import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { validateAlphaNumeric, validateEmail, validateMobileNumber, validateRequired, validateZipCode } from "../../utils/form-validation";

import axios from "axios";
import { toast } from 'react-toastify';
import { toaster } from "../../utils/toaster";

export default function Address_EditAddress() {
  const storename = localStorage.getItem("USER_NAME")
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [addressline1, setAddressline1] = useState("");
  // const [addressline2, setAddressline2] = useState("");
  // const [country, setCountry] = useState("");
  // const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [isdefault, setIsdefault] = useState("");
  // const [address_type, setAddress_type] = useState("");
  // const [gender, setGender] = useState("");
  // const [state_id, setState_id] = useState("");
  // const [country_id, setCountry_id] = useState("");
  // const [city_id, setCity_id] = useState("");
  // const [countryName, setCountryName] = useState("");
  // const [state_name, setState_name] = useState("");
  // const [city_name, setCity_name] = useState("");

  const [user_id, setUser_id] = useState("");
  const [index, setIndex] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [indexss, setIndexss] = useState([]);

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
    addressline1: {
      value: '',
      error: '',
    },
    addressline2: {
      value: '',
      error: '',
    },
    zipcode: {
      value: '',
      error: '',
    },
    gender: {
      value: '',
      error: '',
    },
    isdefault: {
      value: 'y',
      error: '',
    },
    address_type: {
      value: '',
      error: '',
    },
    country: {
      value: '',
      error: '',
    },
    state: {
      value: '',
      error: '',
    },
    city: {
      value: '',
      error: '',
    },
    user_id: "",
  });

  const { address_id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    if (userdata.country.value) {
      axios
        .get(`http://admin.ishop.sunhimlabs.com/api/v1/allstates/${userdata.country.value}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "Application/json",
            storename: storename
          },
        })
        .then((res) => setIndexs(res.data.data));
    }
  }, [userdata.country.value]);

  useEffect(() => {
    console.log(98987, userdata.state.value)
    if (userdata.state.value) {
      axios
        .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcities/${userdata.state.value}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "Application/json",
            storename: storename
          },
        })
        .then((res) => setIndexss(res.data.data));
    }
  }, [userdata.state.value]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcountries/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename: storename
        },
      })
      .then((res) => setIndex(res.data.data));

    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/address/details/${address_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename: storename
        },
      }
      )
      .then((res) => {
        const getData = res.data.data;
        // console.log(getData);
        // setUser_data(getData);
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
        // console.log('setObj', setObj)
        setUser_data({
          ...userdata,
          ...setObj
        })
      });
  }, []);



  const customerUser = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, phone, addressline1, addressline2, zipcode, gender, isdefault, address_type, country, state, city } = userdata

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
      zipcode: {
        value: zipcode.value,
        error: zipcode.value ? validateZipCode(zipcode.value).error : ""
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
        addressline1: addressline1.value,
        addressline2: addressline2.value,
        zipcode: zipcode.value,
        gender: gender.value,
        isdefault: isdefault.value,
        address_type: address_type.value,
        country: country.value,
        state: state.value,
        city: city.value,
        user_id,
      };
      console.warn(
        345,
        first_name,
        last_name,
        email,
        phone,
        gender,
        addressline1,
        addressline2,
        country,
        state,
        city,
        zipcode,
        isdefault,
        address_type,
        user_id
      );

      fetch(`http://admin.ishop.sunhimlabs.com/api/v1/customer/address/edit`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename: storename
        },
        body: JSON.stringify(datas),
      }).then((result) => {
        result.json().then((resps) => {
          // console.warn("resps", resps);
          toaster(resps, 'Address Edited Successfully!')
          if (resps === true) {
            navigate(-1)
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
      <h5 style={{ paddingLeft: "2rem" }}>Address Details</h5>
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
                <option value={"m"}>Male</option>
                <option value={"f"}>Female</option>
                <option value={"o"}>Other</option>
              </select>

              <label className="demo">Address Line 1</label>
              <input
                type="text"
                className="form-control"
                name="addressline1"
                placeholder="Enter Address Line 1"
                value={userdata.addressline1.value}
                onChange={(e) => handleChange(e)}
              />

              <label className="demo">Address Line 2</label>
              <input
                type="text"
                className="form-control"
                name="addressline2"
                placeholder="Enter Address Line 2"
                value={userdata.addressline2.value}
                onChange={(e) => handleChange(e)}
              />

              <label className="demo">Zip Code</label>
              <input
                type="text"
                className="form-control"
                name="zipcode"
                placeholder="Enter Zip Code"
                value={userdata.zipcode.value}
                onChange={(e) => handleChange(e)}
              />
              {inputFieldError(zipcode.error)}
              <br />

              <label for="exampleFormControlSelect1">Country</label>

              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={userdata.country.value}
                onChange={(e) => handleChange(e)}
                name="country"
              >
                {index.map((item) => {
                  return (
                    <option value={item.country_id}>{item.country_name}</option>
                  );
                })}
              </select>

              <label for="exampleFormControlSelect1">State</label>

              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={userdata.state.value}
                onChange={(e) => handleChange(e)}
                name="state"
              >
                {indexs.map((item) => {
                  return (
                    <option value={item.state_id}>{item.state_name}</option>
                  );
                })}
              </select>

              <label for="exampleFormControlSelect1">City</label>

              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={userdata.city.value}
                onChange={(e) => handleChange(e)}
                name="city"
              >
                {indexss.map((item) => {
                  return <option value={item.city_id}>{item.city_name}</option>;
                })}
              </select>

              <label for="exampleFormControlSelect1">Address Type</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="address_type"
                value={userdata.address_type.value}
                onChange={(e) => handleChange(e)}
              >
                <option value={"h"}>Home Address</option>

                <option value={"o"}>Office Address</option>
              </select>

              <label for="exampleFormControlSelect1">Is Default</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="isdefault"
                value={userdata.isdefault.value}
                onChange={(e) => handleChange(e)}
              >
                <option value={"y"}>Yes</option>
                <option value={"n"}>No</option>
              </select>
            </div>
            {/* <Link to="/customer/address/list"> */}
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Update
            </button>
            &nbsp;
            {/* </Link> */}
          </form>

          <br />
        </div>
      </div>
    </div>
  );
}

