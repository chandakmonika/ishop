import React,{ useEffect, useState } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Blog_BlogList() {
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [status, setStatus] = useState([]);

  const [page, setPage] = useState([]);

  const navigate = useNavigate()
  
  const [changeStatusId, setChangeStatusId] = useState({
    faq_id: "",
    status: ""
  });
  
  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true)
  const url = "http://admin.ishop.sunhimlabs.com/api/v1/blog/list";

  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/blog/list`)
      .then((res) => setFirst(res.data.data));
  }, []);
  return (
    <div>
        <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Blog List</Navbar.Brand>
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
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search hear"
                />
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
                <th scope="col"><div class="custom-control custom-checkbox">
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
                  </div></th>
                <th scope="col">Blog Name</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
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
                    <td>{item.title}</td>
                    <td>{item.inserted_date}</td>
                    <td>{item.status === 0 ? "inactive" : "active"}</td>
                    <td>
                    <Link to={`/editblog/${item.blog_id}`}>
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
  )
}
