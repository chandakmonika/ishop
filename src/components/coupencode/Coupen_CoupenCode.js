import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { validateAlphaNumeric, validateNumeric } from "../../utils/form-validation";
import { toaster } from "../../utils/toaster";
import "./Coupen_CoupenCode.css";

export default function Coupen_CoupenCode() {
  const [couponcode, setCouponcode] = useState({
    value: '',
    error: ''
  });
  const [discount_type, setDiscount_type] = useState("");
  const [valid_from, setValid_from] = useState("");
  const [valid_to, setValid_to] = useState("");
  const [coupon_price, setCoupon_price] = useState({
    value: '',
    error: ''
  });


  function addCouponCode(e) {
    e.preventDefault();
    console.warn(couponcode, discount_type, valid_from, valid_to, coupon_price);

    setCouponcode({
      value: couponcode.value,
      error: couponcode.value ? validateAlphaNumeric(couponcode.value).error : ''
    })
    setCoupon_price({
      value: coupon_price.value,
      error: coupon_price.value ? validateNumeric(coupon_price.value).error : ''
    })

    if (!validateNumeric(coupon_price.value).isError) {
      let datas = {
        couponcode: couponcode.value,
        discount_type: discount_type ? "f" : "p",
        valid_from,
        valid_to,
        coupon_price: coupon_price.value
      };

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
          toaster(resps, 'Coupon Code Added Successfully!')
          if (resps === true) {
            // navigate("/routing/customer/list")
          }
        });
      });
    }
  }

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>Add Coupon Code</h4>
      <div className="card" style={{ width: "50rem" }}>
        <form onSubmit={(e) => addCouponCode(e)} style={{ Display: "float-right" }}>
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
                value={couponcode.value}
                onChange={(e) => {
                  setCouponcode({
                    ...couponcode,
                    value: e.target.value,
                    error: ''
                  });
                }}
                name="couponcode"
              />
              {
                couponcode.error.length > 0 &&
                <p style={{ color: 'red', fontSize: '12px' }}>{couponcode.error}</p>
              }
              <br />

              <label className="demo">Select Discount</label><br />
              <span >Percent</span>
              <label class="switch" style={{ marginLeft: '1rem' }}>
                <input class="switch-input" type="checkbox" style={{ paddingRight: '200rem' }} name="discount_type" value={discount_type}
                  onChange={(e) => {
                    setDiscount_type(e.target.checked);
                  }} />
                {console.log(2, discount_type)}

                <span class="switch-label" data-on="" data-off=""></span>
                <span class="switch-handle"></span>
              </label>
              <span>Flat</span><br />

              <label className="demo">Coupon Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Add Coupon Price"
                value={coupon_price.value}
                onChange={(e) => {
                  setCoupon_price({
                    ...coupon_price,
                    value: e.target.value,
                    error: ''
                  });
                }}
                name="coupon_price"
              />

              {
                coupon_price.error.length > 0 &&
                <p style={{ color: 'red', fontSize: '12px' }}>{coupon_price.error}</p>
              }
              <br />

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
          <button type="submit" class="btn btn-info" style={{ marginLeft: '2rem', }}>
            Add
          </button><br /><br />
        </form>
      </div>
      <br />

    </div>
  );
}

