import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function StoreDetails() {
  const [file, setFile] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [business_name, setBusiness_name] = useState();
  const [business_address_id, setBusiness_address_id] = useState();
  const [pan_number, setPan_number] = useState();
  const [gst_number, setGst_number] = useState();
  const [category_id, setCategory_id] = useState();
  const [password, setPassword] = useState();
  const [business_logo, setBusiness_logo] = useState();
const[subscription_id, setSubscription_id] = useState();
  const [userdata, setUser_data] = useState({
    email: "",
    phone: "",
    business_name: "",
    business_address_id: "",
    pan_number: "",
    gst_number: "",
    category_id: "",
    password: "",
    business_logo: "",
    subscription_id: ""
  });
  
  // const { user_id } = useParams();
  const user_id = localStorage.getItem("USER_ID")

  useEffect(() => {
    console.log(19,user_id);
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/seller/details/${user_id}`)
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        
        setUser_data(getData);
      });
  }, []);

  const handleChange = (event) => {
    console.log(19,event.target.name, event.target.value);
    // setFile(event.target.files[0]);
    setUser_data({
      ...userdata,
      [event.target.name]: event.target.value,
    });
  };

  function customerUser(e) {
    e.preventDefault();
   const {
      category_id,
      email,
      phone,
      business_name,
      business_address_id,
      pan_number,
      gst_number,
      password,
      business_logo,
      subscription_id
    } = userdata
    const data = {
      user_id,
      email,
      phone,
      business_name,
      business_address_id,
   pan_number,
      gst_number,
      category_id,
      password,
      business_logo, 
      subscription_id
    }


    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/seller/edit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
      });
    });
  }

  const submit = (e) => {
    e.preventDefault();
  };





  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }
  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <dl>
                <dd>
                  <Link to="/storedetails">
                    <i className="fa fa-address-book"></i>&nbsp;&nbsp;&nbsp;
                    <span>Store Details</span>
                  </Link>
                </dd>
                <hr></hr>
                <dd>
                  <Link to="/account/subscrption">
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
          <form
            onSubmit={customerUser}
            style={{ Display: "float-right", paddingLeft: "2rem" }}
          >
            <h5>Store Details</h5>
            <div
              className="card"
              style={{ paddingLeft: "1rem", height: "14rem" }}
            >
              <div className="card-body">
                <p style={{ textAlign: "left" }}>Store Logo</p>

                <input type="file" value={userdata.business_logo} onChange={(e)=>handleChange(e)} />
                <button type="submit">Upload Image</button>
              </div>
            </div>
            <br />

            <div className="card">
              <div className="card-body">
                <p style={{ textAlign: "left" }}>Store Information</p>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Store Link</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="Enter Link"
                      name="category_id"
                      // value={userdata.category_id}
                      // onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Bussiness Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Bussiness Name"
                      name="business_name"
                      value={userdata.business_name}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Bussiness Category</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Bussiness Category"
                      name="category_id"
                      value={userdata.category_id}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Mobile Number"
                      name="phone"
                      value={userdata.phone}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Email Address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Email Address"
                      name="email"
                      value={userdata.email}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Country</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter Country"
                      name="category_id"
                      value={userdata.category_id}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">FSSAI Number</label>
                    <input
                      type="number"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter FSSAI Number"
                      name="gst_number"
                      value={userdata.gst_number}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <br />
                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Store Address</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="business_address_id"
                      value={userdata.business_address_id}
                      onChange={(e)=>handleChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-body">
                <p style={{ textAlign: "left" }}>Password Information</p>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Enter Password"
                    name="password"
                    value={userdata.password}
                    onChange={(e)=>handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <button class="btn btn-info btn-lg float-right" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
