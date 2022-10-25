import React from "react";

export default function Payment_getwayEdit() {
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
            <form style={{ Display: "float-right", paddingLeft: "2rem" }}>
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
                />

                <label className="demo">Secrate Key</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Secrate Key"
                />

                <label for="exampleFormControlSelect1">Secrate Token</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  category
                >
                  <option>Staging</option>
               <option>Live</option>
                </select>
               
              </div>
              <button type="button" class="btn btn-info">
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
