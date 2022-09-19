import React from "react";
import Button from "react-bootstrap/Button";
import "./Order_OrderDetails.css";
export default function Order_OrderDetails() {
  return (
    <div>
       <h5 style={{ paddingLeft: "2rem" }}>Order Details</h5>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <h6>Billing Address</h6>
              <p>Monika Chandak</p>
              <p>B6,Silver Socity, karve nagar</p>
              <p>Pune-444709,Mahashtra</p>
              <p>Phone Number- 749884490</p>
            </div>
            <div className="col-md-1 demo"></div>
            <div className="col-md-4">
              <h6>Delivery Address</h6>
              <p>Monika Chandak</p>
              <p>B6,Silver Socity, karve nagar</p>
              <p>Pune-444709,Mahashtra</p>
              <p>Phone Number- 749884490</p>
            </div>
            <div className="col-md-1 demo"></div>
            <div className="col-md-2">
              <h6>Download Invoice</h6>
              <Button variant="info" type="submit">
                Downloadu
              </Button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <p>Order Confirmed</p>
            </div>
            <div className="col-md-3">
              <p>Shipped</p>
            </div>
            <div className="col-md-3">
              <p>Out Of Delivery</p>
            </div>
            <div className="col-md-3">
              <p>Deliverd</p>
            </div>
          </div>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "100%" }}
            ></div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <p>3 Augest 2022</p>
              <p>10.00 AM</p>
            </div>
            <div className="col-md-3">
              <p>5 Augest 2022</p>
              <p>7.15 PM</p>
            </div>
            <div className="col-md-3">
              <p>12 Augest 2022</p>
              <p>4.40 PM</p>
            </div>
            <div className="col-md-3">
              <p>15 Augest 2022</p>
              <p>10.00 AM</p>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="card">
        <div className="card-body">
          <table class="table table-bordered">
            <thead style={{ backgroundColor: "#EBF1F3" }}>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Product Description</th>
                <th scope="col">Price</th>
                <th scope="col">Order Date</th>
                <th scope="col">Delivery Date</th>
                <th scope="col">Return Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td>5-8-2022</td>
                <td>6-9-2022</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td>5-8-2022</td>
                <td>6-9-2022</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td>5-8-2022</td>
                <td>6-9-2022</td>
                <td>NA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
