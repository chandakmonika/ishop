import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Address_AddAddress() {
  const [fist_name, setFist_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressline1, setAddressline1] = useState("");
  const [addressline2, setAddressline2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [gender, setGender] = useState("");
  const [isdefault, setIsdefault] = useState("");
  const [address_type, setAddress_type] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [country, setCountry] = useState("");
  const [state_id, setState_id] = useState("");
  const [state_name, setState_name] = useState("");
  const [state, setState] = useState("");
  const [city_id, setCity_id] = useState("");
  const [city_name, setCity_name] = useState("");
  const [city, setCity] = useState("");
  const [index, setIndex] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [indexss, setIndexss] = useState([]);
  console.log(indexs);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allstates/${countryId}`)
      .then((res) => setIndexs(res.data.data));
  }, [countryId]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcities/${state_id}`)
      .then((res) => setIndexss(res.data.data));
  }, [state_id]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcountries/`)
      .then((res) => setIndex(res.data.data));
  }, []);

  function customerUser() {
    console.warn(
      fist_name,
      last_name,
      email,
      phone,
      addressline1,
      addressline2,
      zipcode,
      gender,
      isdefault,
      address_type,
      countryName,
      state_name,
      countryId,
      state_id,
      city_name
    );
    let datas = {
      fist_name,
      last_name,
      email,
      phone,
      addressline1,
      addressline2,
      zipcode,
      gender,
      isdefault,
      address_type,
      country,
      state,
      countryId,
      state_id,
      city,
    };
    fetch("https://admin.ishop.sunhimlabs.com/api/v1/customer/address/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(datas),
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
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Add Address</span>
      </h4>
      <br />

      <div className="card" style={{ paddingLeft: "2rem", width: "68rem" }}>
        <br />
        <form onSubmit={submit} style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "40%" }}
          >
            <label className="demo">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              value={fist_name}
              onChange={(e) => {
                setFist_name(e.target.value);
              }}
              name="fist_name"
            />
            <br />

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
            <br />

            <label className="demo">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
            />
            <br />

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
            <br />

            <label for="exampleFormControlSelect1">Gender</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              name="gender"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            <br />

            <label className="demo">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address 1"
              value={addressline1}
              onChange={(e) => {
                setAddressline1(e.target.value);
              }}
              name="addressline1"
            />
            <br />

            <label className="demo">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address 2"
              value={addressline2}
              onChange={(e) => {
                setAddressline2(e.target.value);
              }}
              name="addressline2"
            />
            <br />

            <label className="demo">Zip Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Zip Code"
              value={zipcode}
              onChange={(e) => {
                setZipcode(e.target.value);
              }}
              name="zipcode"
            />
            <br />

            <label for="exampleFormControlSelect1">Country</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={countryId}
              onChange={(e) => {
                setCountryId(e.target.value);
              }}
              name="countryId"
            >
              {index.map((item) => {
                return <option value={item.id}>{item.country_name}{item.country}</option>;
              })}
            </select>
            <br />

            <label for="exampleFormControlSelect1">State</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={state_id}
              onChange={(e) => {
                setState_id(e.target.value);
              }}
              name="state_id"
            >
              {indexs.map((item) => {
                return <option value={item.id}>{item.state_name}{item.state}</option>;
              })}
            </select>
            <br />

            <label for="exampleFormControlSelect1">City</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={city_id}
              onChange={(e) => {
                setCity_id(e.target.value);
              }}
              name="city_id"
            >
              {indexss.map((item) => {
                return <option value={item.id}>{item.city_name}{item.city}</option>;
              })}
            </select>
            <br />

            <label for="exampleFormControlSelect1">Address Type</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={address_type}
              onChange={(e) => {
                setAddress_type(e.target.value);
              }}
              name="address_type"
            >
              <option>Home Address</option>
              <option>Office Address</option>
            </select>
            <br />

            <label
              for="exampleFormControlSelect1"
              value={isdefault}
              onChange={(e) => {
                setIsdefault(e.target.value);
              }}
              name="isdefault"
            >
              Is Default?
            </label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <br />

          <button type="button" class="btn btn-info" onClick={customerUser}>
            Submit
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}
