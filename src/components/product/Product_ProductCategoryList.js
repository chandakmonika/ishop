import React, { useEffect, useState }from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import "./Product_ProductCategoryList.css";
export default function Product_ProductCategoryList() {
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  //console.log(first);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/products/category/list/?q=${query.text}`
      )
      .then((res) => setFirst(res.data.data));
  };
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/category/list`)
      .then((res) => setFirst(res.data.data));
  }, []);

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Product Category List</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="d-flex ml-auto my-2 my-lg-0">
              
                <Button variant="info">Add Category</Button>&nbsp;&nbsp;&nbsp;
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
                  class="form-control"
                  placeholder="Category Name"
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
                <th scope="col">Category Name</th>
                <th scope="col">Parent Category id</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {first.map((item) => {
                console.log(item)
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
                    <td>{item.parent_category_id}</td>
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
