import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams,useNavigate } from "react-router-dom";
import { toaster } from "../../utils/toaster";

export default function Address_AddAddress() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressline1, setAddressline1] = useState("");
  const [addressline2, setAddressline2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [gender, setGender] = useState("m");
  const [isdefault, setIsdefault] = useState("y");
  const [address_type, setAddress_type] = useState("h");
  const [countryName, setCountryName] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [country, setCountry] = useState("");
  const [state_id, setState_id] = useState("");
  const [state_name, setState_name] = useState("");
  const [state, setState] = useState("");
  const [city_id, setCity_id] = useState("");
  const [city_name, setCity_name] = useState("");
  const [city, setCity] = useState("");
  const [user_id, setUser_id] = useState("");
  const [index, setIndex] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [indexss, setIndexss] = useState([]);
  const params= useParams()

  console.log(indexs);

  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allstates/${country}`)
      .then((res) => setIndexs(res.data.data));
  }, [country]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcities/${state}`)
      .then((res) => setIndexss(res.data.data));
  }, [state]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcountries/`)
      .then((res) => setIndex(res.data.data));
      console.log(2,params);
      setUser_id(params.user_id);
  }, []);

  function customerUser() {
   
    let datas = {
      first_name,
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
      city,
      user_id,
    };

    fetch("http://admin.ishop.sunhimlabs.com/api/v1/customer/address/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, 'Address Added Successfully!')
        if(resps === true ){
            navigate("/customer/address/list/:user_id")
        }
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
              value={first_name}
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
              name="first_name"
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
              <option value={"m"}>Male</option>
              <option value={"f"}>Female</option>
              <option value={"o"}>Others</option>
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
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              name="country"
            >
              {index.map((item) => {
                return (
                  <option key={item.country_id} value={item.country_id}>{item.country_name}</option>
                );
              })}
            </select>
            <br />

            <label for="exampleFormControlSelect1">State</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              name="state"
            >
              {indexs.map((item) => {
                return <option key={item.state_id} value={item.state_id}>{item.state_name}</option>;
              })}
            </select>
            <br />

            <label for="exampleFormControlSelect1">City</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              name="city"
            >
              {indexss.map((item) => {
                return <option key={item.city_id} value={item.city_id}>{item.city_name}</option>;
              })}
            </select>
            <br />

            <label for="exampleFormControlSelect1">Address Type</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={address_type}
              onChange={(e) => {
                console.log(e.target.value);
                setAddress_type(e.target.value);
              }}
              name="address_type"
            >
              <option value={"h"}>Home Address</option>
              <option value={"o"}>Office Address</option>
            </select>
            <br />

            <label for="exampleFormControlSelect1">Is Default?</label>
            <select
              value={isdefault}
              onChange={(e) => {
                setIsdefault(e.target.value);
              }}
              name="isdefault"
              class="form-control"
              id="exampleFormControlSelect1"
            >
              <option value={"y"}>Yes</option>
              <option value={"n"}>No</option>
            </select>

            <br/>

            {/* <label className="demo">User Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter User Id"
              value={user_id}
              onChange={(e) => {
                setUser_id(e.target.value);
              }}
              name="user_id"
            /> */}
            <br />
          </div>
          {/* <Link to="/customer/address/list/:user_id" > */}
          <button type="button" class="btn btn-info" onClick={customerUser}>
            Add Address
          </button>
          {/* </Link> */}
        </form>
        <br />
      </div>
    </div>
  );
}
