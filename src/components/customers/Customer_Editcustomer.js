import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Customer_Editcustomer() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [userdata, setUser_data] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const { user_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/details/${user_id}`
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
    console.warn(first_name, last_name, email, phone, gender);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/customer/edit/`, {
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
      <h5 style={{ paddingLeft: "2rem" }}>Customer Details</h5>
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

              {/* <label className="demo">Password</label>
              <input
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={userdata.password}
                onChange={handleChange}
              /> */}

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
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </select>
            </div>
            <Link to="/routing/customer/list">
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Update 
            </button>
            </Link>
            &nbsp;
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
