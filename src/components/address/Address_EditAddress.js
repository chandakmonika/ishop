

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Address_EditAddress() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressline1, setAddressline1] = useState("");
  const [addressline2, setAddressline2] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isdefault, setIsdefault] = useState("");
  const [address_type, setAddress_type] = useState("");
  const [gender, setGender] = useState("");
  const [user_id, setUser_id] = useState("");

  const [userdata, setUser_data] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    addressline1: "",
    addressline2: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    isdefault: "",
    address_type: "",
    user_id: "",

    
  });
  const {address_id} = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/address/details/${address_id}`
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        setUser_data(getData);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target);

    setUser_data({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function customerUser() {
    console.warn(first_name, last_name, email, phone, gender,addressline1,addressline2,country,state,city,zipcode,isdefault,address_type,user_id);

    fetch(`http://admin.ishop.sunhimlabs.com/customer/address/edit/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(userdata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
      });
    });
  }
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h5 style={{ paddingLeft: "2rem" }}>Address Details</h5>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />
          <form
            onSubmit={submit}
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
                value={userdata.first_name}
                onChange={handleChange}
              />

              <label className="demo">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter Last Name"
                value={userdata.last_name}
                onChange={handleChange}
              />

              <label className="demo">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={userdata.email}
                onChange={handleChange}
              />

              <label className="demo">Mobile Number</label>
              <input
              
                type="phone"
                className="form-control"
                name="phone"
                placeholder="Enter Mobile Number"
                value={userdata.phone}
                onChange={handleChange}
              />

              <label for="exampleFormControlSelect1">Gender</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="gender"
                value={userdata.gender}
                onChange={handleChange}
              >
                <option>M</option>
                <option>F</option>
                <option>O</option>
              </select>

              <label className="demo">Address Line 1</label>
              <input
              
                type="text"
                className="form-control"
                name="addressline1"
                placeholder="Enter Address Line 1"
                value={userdata.addressline1}
                onChange={handleChange}
              />

             <label className="demo">Address Line 2</label>
              <input
              
                type="text"
                className="form-control"
                name="addressline2"
                placeholder="Enter Address Line 2"
                value={userdata.addressline2}
                onChange={handleChange}
              />

          <label className="demo">Zip Code</label>
              <input
              
                type="text"
                className="form-control"
                name="zipcode"
                placeholder="Enter Zip Code"
                value={userdata.zipcode}
                onChange={handleChange}
              />

<label className="demo">Country</label>
              <input
              
                type="text"
                className="form-control"
                name="country"
                placeholder="Enter Zip Code"
                value={userdata.country}
                onChange={handleChange}
              />

<label className="demo">State</label>
              <input
              
                type="text"
                className="form-control"
                name="state"
                placeholder="Enter State"
                value={userdata.state}
                onChange={handleChange}
              />

<label className="demo">City</label>
              <input
              
                type="text"
                className="form-control"
                name="city"
                placeholder="Enter City"
                value={userdata.city}
                onChange={handleChange}
              />



<label for="exampleFormControlSelect1">Address Type</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="address_type"
                value={userdata.address_type}
                onChange={handleChange}
              >
                <option>Home Address</option>
                <option>Office Address</option>
              </select>

              <label for="exampleFormControlSelect1">Is Default</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="isdefault"
                value={userdata.isdefault}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>

            </div>
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Update Address
            </button>
            &nbsp;
          </form>

          <br />
        </div>
      </div>
    </div>
  );
}