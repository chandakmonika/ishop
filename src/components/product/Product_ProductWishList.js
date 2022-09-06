import React,{ useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
export default function Product_ProductWishList() {
  const [query, setQuery] = useState({ text: "" });
  const [first, setFirst] = useState([]);

  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/faq/categories/list/?q=${query.text}`
      )
      .then((res) => setFirst(res.data.data));
  };
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Product Wish List</Navbar.Brand>
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
      <div class="card" style={{ width: "95%" }}>
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
                <div class="input-group-append">
                  <Button variant="info" type="submit">
                    Search
                  </Button>
                </div>
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
                      id="customCheck0"
                      checked
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck0"
                    ></label>
                  </div>
                </th>
                <th>Product Name</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck1"
                    ></label>
                  </div>
                </td>

                <td>
                  Livies Tshirt
                  <br />
                  <img src="../../images/Blue_Tshirt.jpeg" />
                </td>

                <td>
                  <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck2"
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck2"
                    ></label>
                  </div>
                </td>

                <td>
                  Brown Tshirt
                  <br />
                  <img src="../../images/Blue_Tshirt.jpeg" />
                </td>
                <td>
                  <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck3"
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck3"
                    ></label>
                  </div>
                </td>

                <td>
                  Tshirt
                  <br />
                  <img src="../../images/Blue_Tshirt.jpeg" />
                </td>
                <td>
                  <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <-------------------------TableEnd----------------------> */}

          <div class="text-left">
            <div className="row">
              <div className="col-md-2">
                {/* <label for="exampleFormControlSelect1">Action</label> */}
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                >
                  <option selected>Action</option>
                  <option>Active</option>
                  <option>Inactive</option>
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
