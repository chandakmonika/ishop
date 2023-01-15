import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export default function Coupen_CoupenCodeEdit() {
  const storename = localStorage.getItem("USER_NAME")
  const [couponcode, setCouponcode] = useState("");
  const [discount_type, setDiscount_type] = useState("");
  const [valid_from, setValid_from] = useState("");
  const [valid_to, setValid_to] = useState("");
  const [coupon_price, setCoupon_price] = useState("");
  
  const [userdata, setUser_data] = useState({
    couponcode: "",
    discount_type: "p",
    valid_from: "",
    valid_to: "",
    coupon_price: "",
   
  });
  const { coupon_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/coupons/details/${coupon_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "Application/json",
            storename: storename,
          },
          // body: JSON.stringify(productInputData),
        }
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(20,getData);
        setUser_data({
          ...getData,
          valid_from: getData.valid_from.toString().substring(0,16),
          valid_to: getData.valid_to.toString().substring(0,16)
        });
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target);
if(e.target.name==="discount_type")
{
  console.log(1,e.target.checked)
  setUser_data({
    ...userdata,
    [e.target.name]: e.target.checked ? "f" : "p",
  });
}
else{
  setUser_data({
  ...userdata,
  [e.target.name]: e.target.value,
});}

  };

  function customerUser() {
    console.warn(couponcode,discount_type,valid_from,valid_to,coupon_price);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/coupons/edit/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename: storename,
      },
      body: JSON.stringify({
        ...userdata,
        valid_from: new Date(userdata.valid_from),
        valid_to: new Date(userdata.valid_to)

      }),
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
      {console.log(27,userdata)}
    <h5 style={{ paddingLeft: "2rem" }}>Coupon Edit</h5>
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
            style={{ width: "50%" }}
          >
          <br />

          <Form style={{ Display: "float-right", paddingLeft: "2rem" }}>
          <label className="demo">Coupon Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Add Coupon Code"
              value={userdata.couponcode}
              onChange={handleChange}
              name="couponcode"
            /><br/>
            
            <label className="demo">Select Discount</label><br/>
            <span >Percent</span>
            <label class="switch" style={{marginLeft:'1rem'}}>
              <input class="switch-input" type="checkbox" style={{paddingRight:'200rem'}} name="discount_type" checked={userdata.discount_type === "f"}   
              onChange={handleChange} /> 
              { console.log(2,discount_type)}
             
              <span class="switch-label" data-on="" data-off=""></span>
              <span class="switch-handle"></span>
            </label>
         <span>Flat</span><br/>
         
         <label className="demo">Coupon Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Add Coupon Price"
              value={userdata.coupon_price}
              onChange={handleChange}
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
                  value={userdata.valid_to}
                  onChange={handleChange}
                />
              </div>&nbsp;

              <div className="col-md-3">
                <label>End Date</label>
                <br />
                <input
                  type="datetime-local"
                  id="birthdaytime"
                  name="valid_from"   
                  value={userdata.valid_from}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Form>
          <br />
        </div>
        

          <Link to="/coupencode/list">
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
  )
}
