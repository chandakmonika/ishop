import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Order_OrderList() {
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Order List</Navbar.Brand>
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
            <div className="col-sm-8">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search" />
                &nbsp;&nbsp;&nbsp;
                <span>
                  {/* <label>To</label> */}
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="birthdaytime"
                    name="birthdaytime"
                  />
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  {/* <label>From</label> */}
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="birthdaytime"
                    name="birthdaytime"
                  />
                </span>
                &nbsp;&nbsp;&nbsp;
                <div class="input-group-append">
                  <Button variant="info" type="submit">
                    Search
                  </Button>
                </div>
              </div>
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
                      id="customCheck1"
                      checked
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck1"
                    ></label>
                  </div>
                </th>
                <th scope="col">Order Id</th>
                <th scope="col">Order Date</th>
                <th scope="col">Delivery Date & Time</th>
                <th scope="col">Zip Code</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
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
                      checked
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck1"
                    ></label>
                  </div>
                </td>
                <td>Order id-11022300</td>
                <td>5-2-2021</td>
                <td>6-9-2022</td>
                <td>444709</td>
                <td>788</td>
                <td>Deliver</td>
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
                <td>Order id-11022400</td>
                <td>15-4-2021</td>
                <td>6-9-2022</td>
                <td>422709</td>
                <td>7808</td>
                <td>Deliver</td>
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
                <td>Order id-11022500</td>
                <td>5-12-2020</td>
                <td>16-7-2022</td>
                <td>443709</td>
                <td>7888</td>
                <td>Return</td>
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
