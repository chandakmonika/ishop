import React,{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Coupen_CoupenCode.css";

export default function Coupen_CoupenCode() {
  const [couponcode, setCouponcode] = useState("");
  const [discount_type, setDiscount_type] = useState("");
  const [valid_from, setValid_from] = useState("");
  const [valid_to, setValid_to] = useState("");
  const [coupon_price, setCoupon_price] = useState("");


  function customerUser() {
    console.warn(couponcode,discount_type,valid_from,valid_to,coupon_price);
    let datas = { couponcode,discount_type,valid_from,valid_to,coupon_price };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/coupons/add", {
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
    <div style={{ paddingLeft: "10rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>Add Coupen Code</h4>
      <div className="card" style={{ width: "50rem" }}>
      <form onSubmit={submit} style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "50%" }}
          >
          <br />

          <Form style={{ Display: "float-right", paddingLeft: "2rem" }}>
          <label className="demo">Coupen Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Add Coupon Code"
              value={couponcode}
              onChange={(e) => {
                setCouponcode(e.target.value);
              }}
              name="couponcode"
            /><br/>
            
            <label className="demo">Select Discount</label><br/>
            <span >Percent</span>
            <label class="switch" style={{marginLeft:'1rem'}}>
              <input class="switch-input" type="checkbox" style={{paddingRight:'200rem'}} name="discount_type" change={discount_type} 
              onChange={(e) => {
                setDiscount_type(e.target.change);  
              }} />
              <span class="switch-label" data-on="" data-off=""></span>
              <span class="switch-handle"></span>
            </label>
         <span>Flat</span><br/>
         
         <label className="demo">Coupen Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Add Coupon Price"
              value={coupon_price}
              onChange={(e) => {
                setCoupon_price(e.target.value);
              }}
              name="coupon_price"
            /><br/>

            <div className="row">
              <div className="col-md-6">
                <label>Start Date</label>
                <br />
                <input
                  type="datetime-local"
                  id="birthdaytime"
                  name="valid_to"
                  value={valid_to}
                  onChange={(e) => {
                    setValid_to(e.target.value);
                  }}
                />
              </div>&nbsp;

              <div className="col-md-3">
                <label>End Date</label>
                <br />
                <input
                  type="datetime-local"
                  id="birthdaytime"
                  name="valid_from"   
                  value={valid_from}
                  onChange={(e) => {
                    setValid_from(e.target.value);
                  }}
                />
              </div>
            </div>
          </Form>
          <br />
        </div>
        <button type="button" class="btn btn-info" onClick={customerUser} style={{marginLeft:'2rem', }}>
          Add 
        </button><br/><br/>
        </form>
      </div>
      <br />
      
    </div>
  );
}
