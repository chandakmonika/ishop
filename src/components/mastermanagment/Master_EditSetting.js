import React from 'react'

export default function Master_EditSetting() {
  return (
    <div>
    <div style={{ paddingLeft: "10rem" }}>
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Edit Setting</span>
      </h4>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />

          {/* <h6 style={{ paddingLeft: "2rem" }}>Payment Getway Edit</h6> */}
          <form style={{ Display: "float-right", paddingLeft: "2rem" }}>
            <div
              className="form-group"
              controlId="formBasicFirstName"
              style={{ width: "40%" }}
            >
              <label className="demo">Variable Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Variable Name"
                name="payment_gateway_name"
              />

        <label className="demo">Variable Value</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Variable Value"
                name="payment_gateway_name"
              />

            </div>
            <button type="button" class="btn btn-info" >
              Edit Setting
            </button>
          </form>
          <br />
        </div>
      </div>
    </div>
  </div>
  )
}
