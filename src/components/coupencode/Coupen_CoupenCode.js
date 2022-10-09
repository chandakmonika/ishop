import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Coupen_CoupenCode.css";

export default function Coupen_CoupenCode() {
  return (
    <div style={{ paddingLeft: "10rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>Add Coupen Code</h4>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />

          <Form style={{ Display: "float-right", paddingLeft: "2rem" }}>
            <Form.Group
              className="mb-3"
              controlId="formBasicFirstName"
              style={{ width: "40%" }}
            >
              <Form.Label>Coupen code</Form.Label>
              <Form.Control type="text" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <h6>Select Discount</h6>
            <span>Percent</span>
            <label class="switch" style={{marginLeft:'1rem'}}>
              <input class="switch-input" type="checkbox" />
              <span class="switch-label" data-on="" data-off=""></span>
              <span class="switch-handle"></span>
            </label>
         <span>Flat</span>
            <Form.Group
              className="mb-3"
              controlId="formBasicMobileNumber"
              style={{ width: "40%" }}
            >
              <Form.Label>Sale Price</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <div className="row">
              <div className="col-md-3">
                <label>Start Date</label>
                <br />
                <input
                  type="datetime-local"
                  id="birthdaytime"
                  name="birthdaytime"
                />
              </div>
              <div className="col-md-3">
                <label>End Date</label>
                <br />
                <input
                  type="datetime-local"
                  id="birthdaytime"
                  name="birthdaytime"
                />
              </div>
            </div>
          </Form>
          <br />
        </div>
      </div>
      <br />
      <div style={{ paddingLeft: "45rem" }}>
        <Button variant="info" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
}
