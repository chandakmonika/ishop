import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Payment_getwayEdit() {
  const [payment_gateway_name,setPayment_gateway_name] = useState("");
  const [payment_gateway_logo,setPayment_gateway_logo] = useState("");
  const [index, setIndex] = useState([]);
  const [userdata, setUser_data] = useState({
    payment_gateway_name: "",
    payment_gateway_logo: "",
    
  });

  const { payment_gateway_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/payments/details/${payment_gateway_id}`
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

  function paymentUser() {
    console.warn(payment_gateway_name, payment_gateway_logo);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/payments/edit/`, {
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
    <div>
      <div style={{ paddingLeft: "10rem" }}>
        <h4 style={{ paddingLeft: "2rem" }}>
          <span>Payment Getway Edit</span>
        </h4>
        <div className="card" style={{ width: "50rem" }}>
          <div className="ind">
            <br />

            {/* <h6 style={{ paddingLeft: "2rem" }}>Payment Getway Edit</h6> */}
            <form onSubmit={submit} style={{ Display: "float-right", paddingLeft: "2rem" }}>
              <div
                className="form-group"
                controlId="formBasicFirstName"
                style={{ width: "40%" }}
              >
                <label className="demo">Payment Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Payment Name"
                  name="payment_gateway_name"
                  value={userdata.payment_gateway_name}
                onChange={handleChange}
                />

<label className="demo">Payment Logo</label>
                <input
                type="file"
                name="payment_gateway_logo"
                value={userdata.payment_gateway_logo}
              onChange={handleChange}
                
              />
               
              </div>
              <button type="button" class="btn btn-info" onClick={paymentUser}>
                Edit Payment
              </button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
