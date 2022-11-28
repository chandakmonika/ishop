import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Payment_PaymentAdd() {
  const [payment_gateway_name,setPayment_gateway_name] = useState("");
  const [payment_gateway_logo,setPayment_gateway_logo] = useState("");
  const [index, setIndex] = useState([]);

  useEffect(() => {
    axios
    .get(`http://admin.ishop.sunhimlabs.com/api/v1/payments/add`)
    .then((res) => setIndex(res.data.data));
  }, []);

  function paymentUser(){
    console.warn(payment_gateway_name,payment_gateway_logo);
    let datas = {
      payment_gateway_name,
      payment_gateway_logo,
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/payments/add",{
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type" : "Application/json",
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      result.json().then((response) => {
        console.warn("response", response);
      });
    });
  }
const submit = (e) =>{
  e.preventDefault();
}
  return (
    <div>
          <div style={{ paddingLeft: "10rem" }}>
        <h4 style={{ paddingLeft: "2rem" }}>
          <span>Payment Getway Add</span>
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
                  value={payment_gateway_name}
                  onChange={(e) => {
                    setPayment_gateway_name(e.target.value);
                  }}
                  name="payment_gateway_name"
                />

                <label className="demo">Payment Logo</label>
                <input
                type="file"
                name="payment_gateway_logo"  
                onChange={(e) => {
                  setPayment_gateway_logo(e.target.value);
                }}
              />
   
              </div>
              <button type="button" class="btn btn-info" onClick={paymentUser}>
               Add Payment
              </button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
