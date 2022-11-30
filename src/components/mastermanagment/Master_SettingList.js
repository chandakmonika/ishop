import React,{ useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Master_SettingList() {
  const [first, setFirst] = useState([]);
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/getAllSiteOptions`)
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
