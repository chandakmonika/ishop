

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Customer_Customerlist.css";
import { Link } from "react-router-dom";

export default function Customer_Customerlist() {
  const [index, setIndex] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [order, setOrder] = useState("ASC");
  const [user_id, setUser_id] = useState([]);
  const [status, setStatus] = useState([]);
  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/list/?q=${query.text}`
      )
      .then((res) => setIndex(res.data.data));
  };
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/customer/list`)
      .then((res) => setIndex(res.data.data));
  }, []);

  const update = (e) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/list?q=&per_page=12&page=1&sort_by=first_name&order_by=${order}`
      )
      .then((res) => setIndex(res.data.data));
  };


  function handleClick() {
    console.warn(user_id, status);
    let datas = {
      user_id,
      status
      
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/customer/changestatus", {
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
  
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Customer List</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="d-flex ml-auto my-2 my-lg-0">
                <Button variant="light">Import Customer</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="info">Add Customer</Button>&nbsp;&nbsp;&nbsp;
              </div>
              &nbsp;&nbsp;&nbsp;
            </Nav>
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
                    placeholder="Search this blog"
                    onChange={handleChange}
                  />
                  <Button variant="info" type="submit">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <br />
          <table class="table table-bordered" style={{ width: "95%" }}>
            <thead style={{ backgroundColor: "#EBF1F3" }}>
              <tr>
                <th scope="col">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck"
                      checked
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck"
                    ></label>
                  </div>
                </th>
                <th scope="col">
                Customer Name &nbsp;
                  <i class='fas fa-arrow-down'
                    onClick={update}
                  ></i>
                  <i class='fas fa-arrow-up'
                    onClick={update}
                  ></i>
                  
                </th>
                <th scope="col">Mobile Number&nbsp; <i class='fas fa-arrow-down'
                    onClick={update}
                  ></i>
                  <i class='fas fa-arrow-up'
                    onClick={update}
                  ></i></th>
                <th scope="col">Email &nbsp; <i class='fas fa-arrow-down'
                    onClick={update}
                  ></i>
                  <i class='fas fa-arrow-up'
                    onClick={update}
                  ></i></th>
                <th scope="col">Orders Place</th>
                <th scope="col">Total Sales</th>
                <th scope="col">Status</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {index.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck{item.id}"
                        />
                        <label
                          class="custom-control-label"
                          for="customCheck{item.id}"
                        ></label>
                      </div>
                    </td>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td></td>
                    <td></td>
                    <td><button type="button" >{item.status === 0 ? "inactive" : "active"}</button></td>
                    <td>
                      <Link to="/customer/address/list">
                        <i
                          class="fa fa-address-book"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </Link>
                      &nbsp;&nbsp;
                      <Link to={`/customer/edit/${item.user_id}`}>
                        <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* <-------------------------TableEnd----------------------> */}

          <div class="text-left">
            <div className="row">
              <div className="col-md-2">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                >
                  <option selected>Action</option>
                  <option value={status} >Active</option>
                  <option value={status}>Inactive</option>
                  <option value={status}>Delete</option>
                </select>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  class="btn btn-light"
                  style={{ width: "8rem" }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







