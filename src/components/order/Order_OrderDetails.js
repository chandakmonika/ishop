import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import "./Order_OrderDetails.css";
export default function Order_OrderDetails() {
  const [orderDetails, setOrderDetails] = useState();
  const { order_id } = useParams();

  useEffect(() => {
    console.log(23, order_id);
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/orders/details/${order_id}`
      )
      .then((res) => {
        setOrderDetails(res.data);
        console.log(1, res);
      });
  }, [order_id]);

  return (
    <div>
      {console.log(100, orderDetails)}
      {
        orderDetails ?
          <>
            <h5 style={{ paddingLeft: "2rem" }}>Order Details</h5>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <h6>Billing Address</h6>
                    <div>
                      {orderDetails &&
                        orderDetails.address_billing.length > 0 &&
                        orderDetails.address_billing.map((bill) => (
                          <>
                            <p>
                              {bill.first_name} {bill.last_name}
                            </p>
                            <p>{bill.gender === "m" ? "male" : "female"}</p>
                            <p>{bill.mobile}</p>
                            <p>{bill.email}</p>
                            <p>
                              {bill.addressline1}, {bill.addressline2}
                            </p>
                            <p>
                              {bill.city}, {bill.state}, {bill.country} -{" "}
                              {bill.zipcode}
                            </p>
                            <p>{bill.address_type === "h" ? "home" : "other"}</p>
                          </>
                        ))}
                    </div>
                  </div>
                  <div className="col-md-1 demo"></div>
                  <div className="col-md-4">
                    <h6>Delivery Address</h6>
                    <div>
                      {orderDetails &&
                        orderDetails.address_shipping.length > 0 &&
                        orderDetails.address_shipping.map((bill) => (
                          <>
                            <p>
                              {bill.first_name} {bill.last_name}
                            </p>
                            <p>{bill.gender === "m" ? "male" : "female"}</p>
                            <p>{bill.mobile}</p>
                            <p>{bill.email}</p>
                            <p>
                              {bill.addressline1}, {bill.addressline2}
                            </p>
                            <p>
                              {bill.city}, {bill.state}, {bill.country} -{" "}
                              {bill.zipcode}
                            </p>
                            <p>{bill.address_type === "h" ? "home" : "other"}</p>
                          </>
                        ))}
                    </div>
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
                    {
                      console.log(768, orderDetails.items)
                    }
                    {
                      orderDetails && orderDetails.items &&
                      orderDetails.items.length > 0 &&
                      orderDetails.items.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.product_name} </td>
                            <td>{item.product_sell_price}</td>
                            <td>{item.product_qty}</td>
                            <td>{item.product_total_price}</td>
                            <td>{item.tax_amount}</td>
                            <td>{item.product_total_price}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {
                  orderDetails && orderDetails.items &&
                  orderDetails.items.length === 0 &&
                  <h1 class="text-center">Product details not found</h1>
                }
              </div>
            </div>
                <br />
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-center">
                  <div>
                    <p>
                      Subtotal Amount -{" "}
                      <span>{orderDetails.data.subtotal_amount}</span>
                    </p>
                    <p>
                      Shipping Amount -{" "}
                      <span>{orderDetails.data.shipping_amount}</span>
                    </p>
                    <p>
                      Tax Amount - <span>{orderDetails.data.tax_amount}</span>
                    </p>
                    <p>
                      Discount Amount -{" "}
                      <span>{orderDetails.data.discount_amount}</span>
                    </p>
                    <p>-------------------------------</p>
                    <p>
                      Final Amount - <span>{orderDetails.data.final_amount}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
          : <h1 class="text-center">Order details not found</h1>
      }
    </div>
  );
}

