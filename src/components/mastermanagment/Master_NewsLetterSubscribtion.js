
import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
export default function Master_NewsLetterSubscribtion() {
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">NewsLetter Subscriber</Navbar.Brand>
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
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search" />
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
                <th scope="col"> <div class="custom-control custom-checkbox">
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
                  </div></th>
                <th scope="col">Email</th>

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
                          id="customCheck2"
                        />
                        <label
                          class="custom-control-label"
                          for="customCheck2"
                        ></label>
                      </div>
                    </td>
                <td>monika12@gmail.com</td>
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
                <td>sapana56@gmail.com</td>
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
                <td>vipulb@gmail.com</td>
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
                  
                  <option>Delete</option>
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
