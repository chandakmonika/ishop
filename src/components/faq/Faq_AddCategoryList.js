import React,{ useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
export default function Faq_AddCategoryList() {
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
        `http://admin.ishop.sunhimlabs.com/api/v1/faq/categories/list/?q=${query.text}`
      )
      .then((res) => setFirst(res.data.data));
  };

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/faq/categories/list`)
      .then((res) => setFirst(res.data.data));
  }, []);
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Category FAQ List</Navbar.Brand>
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
                <th>
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
                <th scope="col">Category Name</th>
                <th scope="col">Action</th>
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
                    <td>{item.category_name}</td>
                    
                    <td><Link to="/addcategoryfaq"><i class="fas fa-edit" style={{ fontSize: "24px" }}></i></Link></td>
                    
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