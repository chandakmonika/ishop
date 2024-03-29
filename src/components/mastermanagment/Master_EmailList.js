import React,{ useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
export default function Master_EmailList() {
  const storename = localStorage.getItem("USER_NAME")
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
        `http://admin.ishop.sunhimlabs.com/api/v1/emailtemplates/list/?q=${query.text}`,{
          headers: {
            Accept: "application/json",
            "Content-Type": "Application/json",
            storename:storename,
          },
        }
      )
      .then((res) => setFirst(res.data.data));
  };
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/emailtemplates/list`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename,
        },
      })
      .then((res) => setFirst(res.data.data));
  }, []);
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Email Template List</Navbar.Brand>
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
                    placeholder="Search "
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
                <th scope="col">Sr No</th>
                <th scope="col">Title</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {first.map((item) => {
                return (
                  <tr key={item.product_id}>
                    <td>
                      {item.template_id}
                    </td>
                   
                    <td>{item.email_title}</td>
                   
                   
                   
                    <td><Link to={`/mastermanagement/email/edit/${item.template_id}`}><i class="fas fa-edit" style={{ fontSize: "24px" }}></i></Link></td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <-------------------------TableEnd----------------------> */}

          {/* <div class="text-left">
            <div className="row">
              <div className="col-md-2">
              
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
