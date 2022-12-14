import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
export default function Coupen_CoupenCodeList() {
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [faq_id, setFaq_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/coupons/list/?q=${query.text}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "Application/json",
            storename: "kbtrends",
          },
          // body: JSON.stringify(productInputData),
        }
      )
      .then((res) => setFirst(res.data.data));
  };

  const getCustomerList = () => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/coupons/list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-Type": "Application/json",
          storename: "kbtrends",
        },
        // body: JSON.stringify(productInputData),
      })
      .then((res) => setFirst(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Coupon Code List</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div class="card" style={{ width: "100%" }}>
        <div class="card-body" style={{ width: "100%" }}>
          <div class="row">
            <div className="col-sm-3">
              <form onSubmit={handleSubmit}>
                <div class="input-group">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="texthelp"
                    placeholder="Search"
                    onChange={handleChange}
                  />
                  <div class="input-group-append">
                    <Button variant="info" type="submit">
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
        <table class="table table-bordered" style={{ width: "95%" }}>
          <thead style={{ backgroundColor: "#EBF1F3" }}>
            <tr>
              <th scope="col"> Coupon Code</th>
              <th scope="col">Start Date</th>
              <th scope="col"> End Date</th>
              <th scope="col"> Coupon Value</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              first.map((item) => {
                return (
                  <tr key={item.product_id}>
                    <td>{item.couponcode}</td>
                    <td>{item.valid_to}</td>
                    <td>{item.valid_from}</td>
                    <td>{item.coupon_price}</td>
                    <td><Link to={`/coupencode/edit/${item.coupon_id}`}><i class="fas fa-edit" style={{ fontSize: "24px" }}></i></Link></td>

                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <-------------------------TableEnd----------------------> */}
      </div>
    </div>
  );
}
