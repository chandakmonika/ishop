import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams,useNavigate } from "react-router-dom";
import { toaster } from "../../utils/toaster";
import { validateEmail, validateMobileNumber } from "../../utils/form-validation";

export default function Address_AddAddress() {
  const storename = localStorage.getItem("USER_NAME")
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [addressline1, setAddressline1] = useState("");
  // const [addressline2, setAddressline2] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [gender, setGender] = useState("m");
  // const [isdefault, setIsdefault] = useState("y");
  // const [address_type, setAddress_type] = useState("h");
  // const [countryName, setCountryName] = useState("");
  // const [country_id, setCountry_id] = useState("");
  // const [country, setCountry] = useState("");
  // const [state_id, setState_id] = useState("");
  // const [state_name, setState_name] = useState("");
  // const [state, setState] = useState("");
  // const [city_id, setCity_id] = useState("");
  // const [city_name, setCity_name] = useState("");
  // const [city, setCity] = useState("");
  const [user_id, setUser_id] = useState("");
  const [index, setIndex] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [indexss, setIndexss] = useState([]);

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
    gender:{
      value: '',
      error: '',
    },
    isdefault:{
      value: '',
      error: '',
    },
    address_type:{
      value: '',
      error: '',
    },
    country:{
      value: '',
      error: '',
    },
    state:{
      value: '',
      error: '',
    },
    city:{
      value: '',
      error: '',
    },

  })

  
  const params= useParams()

  console.log(indexs);

  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allstates/${country}`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename,
        }
      })
      .then((res) => setIndexs(res.data.data));
  }, [country]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcities/${state}`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename,
        }

      })
      .then((res) => setIndexss(res.data.data));
  }, [state]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcountries/`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename,
        }

      })
      .then((res) => setIndex(res.data.data));
      console.log(2,params);
      setUser_id(params.user_id);
  }, []);

const customerUser = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, phone,addressline1,addressline2,zipcode,gender,isdefault,address_type,country,state,city,user_id } = addCustomerData

    setAddCustomerData({
      ...addCustomerData,
      email: {
        value: email.value,
        error: validateEmail(email.value).error
      },
      phone: {
        value: phone.value,
        error: validateMobileNumber(phone.value).error
      }
    })
    
    if (!validateEmail(email.value).isError && !validateMobileNumber(phone.value).isError) {
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


    // let datas = {
    //   first_name,
    //   last_name,
    //   email,
    //   phone,
    //   addressline1,
    //   addressline2,
    //   zipcode,
    //   gender,
    //   isdefault,
    //   address_type,
    //   country,
    //   state,
    //   city,
    //   user_id,
    // };

    fetch("http://admin.ishop.sunhimlabs.com/api/v1/customer/address/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, 'Address Added Successfully!')
        if(resps === true ){
            navigate(`/customer/address/list/${user_id}`)
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

const { first_name, last_name, email, phone,addressline1,addressline2,zipcode,gender,isdefault,address_type,country,state,city, } = addCustomerData

  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Add Address</span>
      </h4>
      <br />

      <div className="card" style={{ paddingLeft: "2rem", width: "68rem" }}>
        <br />
        <form onSubmit={customerUser} style={{ Display: "float-right" }}>
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
              onChange={(e) => handleChange(e)}
              name="first_name"
            />
            <br />

            <label className="demo">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={(e) => handleChange(e)}
              name="last_name"
            />
            <br />

            <label className="demo">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => handleChange(e)}
              name="email"
            />
            <br />

            <label className="demo">Mobile Number</label>
            <input
              type="phone"
              className="form-control"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => handleChange(e)}
              name="phone"
            />
            <br />

            <label for="exampleFormControlSelect1">Gender</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={gender}
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
              name="addressline1"
            />
            <br />

            <label className="demo">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address 2"
              value={addressline2}
              onChange={(e) => handleChange(e)}
              name="addressline2"
            />
            <br />

            <label className="demo">Zip Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Zip Code"
              value={zipcode}
              onChange={(e) => handleChange(e)}
              name="zipcode"
            />
            <br />

            <label for="exampleFormControlSelect1">Country</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={country}
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
              name="address_type"
            >
              <option value={"h"}>Home Address</option>
              <option value={"o"}>Office Address</option>
            </select>
            <br />

            <label for="exampleFormControlSelect1">Is Default?</label>
            <select
              value={isdefault}
              onChange={(e) => handleChange(e)}
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

