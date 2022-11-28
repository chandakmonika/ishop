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
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-2">
              <p>Order Place</p>
            </div>
            <div className="col-md-2">
              <p>Confired</p>
            </div>
            <div className="col-md-2">
              <p>Shipped</p>
            </div>
            <div className="col-md-2">
              <p>Deliverd</p>
            </div>
            <div className="col-md-2">
              <p>Return</p>
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
            <div className="col-md-2">
              <p>3 Augest 2022</p>
              <p>10.00 AM</p>
              
            </div>
            <div className="col-md-2">
              <p>5 Augest 2022</p>
              <p>7.15 PM</p>
            </div>
            <div className="col-md-2">
              <p>12 Augest 2022</p>
              <p>4.40 PM</p>
            </div>
            <div className="col-md-2">
              <p>15 Augest 2022</p>
              <p>10.00 AM</p>
            </div>
            <div className="col-md-2">
              <p>17 Augest 2022</p>
              <p>12.00 AM</p>
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
                <th scope="col">Product Name</th>
               <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">SubTotal</th>
                <th scope="col">Tax</th>
                <th scope="col">Total</th>  
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td></td>
                <td></td>
                
              </tr>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td></td>
                <td></td>
               
              </tr>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td></td>
                <td></td>
                
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered">
            <thead style={{ backgroundColor: "#EBF1F3" }}>
              <tr>
                <th scope="col">Total</th>
               <th scope="col">Tax</th>
                <th scope="col">Shipping Charges</th>
                <th scope="col">Coupon Code</th>
                <th scope="col">Final Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td></td>
               
                
              </tr>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td></td>
               
               
              </tr>
              <tr>
                <td>Order </td>
                <td>Blue color round neck shirt</td>
                <td>788</td>
                <td></td>
                
                
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
}
