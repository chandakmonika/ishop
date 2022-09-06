import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
//import "././Product_Productlist.css";

export default function ProductsComponent() {
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/products/list/?q=${query.text}`
      )
      .then((res) => setFirst(res.data.data));
  };
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/list`)
      .then((res) => setFirst(res.data.data));
  }, []);

  return (
    <div>
      {/* <---------------Navbar Start----------------> */}
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Product</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="d-flex ml-auto my-2 my-lg-0 float-right">
                <Button variant="light">Export CSV</Button>&nbsp;&nbsp;&nbsp;
                <Button variant="light">Import CSV</Button>&nbsp;&nbsp;&nbsp;
                <Button variant="info">Add Product</Button>&nbsp;&nbsp;&nbsp;
              </div>
              &nbsp;&nbsp;&nbsp;
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <------------------Navbar End-----------------------> */}

      {/* <---------------main-------------------> */}

      <div class="card" style={{ width: "100%" }}>
        <div class="card-body">
          <div class="row">
            <div className="col-sm-6">
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
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Category
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                  <span>
                    <Dropdown onChange={handleChange} name="status">
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Product Status
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item value="active">Active</Dropdown.Item>
                        <Dropdown.Item value="inactive">Inactive</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                  <span>
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="info" type="submit">
                      Search
                    </Button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <br />

          {/* <-----------------MainEnd-------------------> */}

          {/* <--------------------TableStart-------------------------> */}
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

                <th scope="col">Product </th>
                <th scope="col">Category</th>
                <th scope="col">Product Quantity</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {first.map((item) => {
                return (
                  <tr key={item.product_id}>
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
                    <td>{item.product_name}</td>
                    <td>{item.category_id}</td>
                    <td>{item.product_qty}</td>
                    <td>{item.status === 0 ? "inactive" : "active"}</td>
                  </tr>
                );
              })}
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