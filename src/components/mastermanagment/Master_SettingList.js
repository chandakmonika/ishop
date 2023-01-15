import React,{ useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Master_SettingList() {
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
        `http://admin.ishop.sunhimlabs.com/api/v1/getAllSiteOptions/?q=${query.text}`,{
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
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/getAllSiteOptions`,{
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
          <Navbar.Brand href="#">Setting List page</Navbar.Brand>
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
          <br />
          <table class="table table-bordered" style={{ width: "95%" }}>
            <thead style={{ backgroundColor: "#EBF1F3" }}>
              <tr>
                
                <th scope="col">Variable Name</th>
                <th scope="col">Variable Value</th>
              
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {first.map((item) => {
                return (
                  <tr key={item.product_id}>
                    
                    <td>{item.var_name}</td>
                    <td>{item.var_value}</td>
                 
                    <td>
                    <Link to={`/mastermanagement/setting/edit/`}>
                      <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                      </Link>
                      </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
