import React,{ useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Faq_FAQList() {

  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [faq_id, setFaq_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/faq/list/?q=${query.text}`
      )
      .then((res) => setFirst(res.data.data));
  };



  const getCustomerList = () => {
    axios
    .get(`http://admin.ishop.sunhimlabs.com/api/v1/faq/list`)
      .then((res) => setFirst(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const statusChange = (apidata) => {
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/faq/changestatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(apidata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        getCustomerList();
        
      });
    });
  };

  function handleClick(faq_id, status) {
    console.warn(faq_id, status);

    let apidata = {
      faq_id: faq_id,
      status: status === "0" ? "1" : "0",
    };
    statusChange(apidata);
  }

  const onSelectCustomer = (e, faq_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
        if (item.faq_id === faq_id) {
          return {
            ...item,
            isSelected: e.target.checked,
          };
        } else {
          return {
            ...item,
          };
        }
      });
    setFirst(datas);
    console.log(e.target.checked, faq_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);

    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedId = selectedcustomer.map((id) => id.faq_id).join(",");
    console.log(selectedId);
    const apidata = {
      faq_id: selectedId,
      status: selectedStatus,
    };
    statusChange(apidata);
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://admin.ishop.sunhimlabs.com/api/v1/faq/list`)
  //     .then((res) => setFirst(res.data.data));
  // }, []);

  
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">FAQ List</Navbar.Brand>
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
                <th scope="col">FAQ Category</th>
                <th scope="col">Questions</th>
                <th scope='col'>Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {first &&
                first.length > 0 &&
              first.map((item) => {
                return (
                  <tr key={item.product_id}>
                    <td>
                
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            value={item.isSelected}
                            onChange={(e) => onSelectCustomer(e, item.faq_id)}
                          />
                          <label for="customCheck{item.id}"></label>
                        </div>
                     
                    </td>
                    <td>{item.category_name}</td>
                    <td>{item.question}</td>
                    <td> <button
                          type="button"
                          onClick={() =>
                            handleClick(item.faq_id, item.status)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button></td>
                    <td><Link to={`/faq/edit/${item.faq_id}`}><i class="fas fa-edit" style={{ fontSize: "24px" }}></i></Link></td>
                    
                  </tr>
                );
              })}
            </tbody>
                
          </table>
          {/* <-------------------------TableEnd----------------------> */}

          <div class="text-left">
            <div className="row">
            <div className="col-md-2">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option selected>Action</option>
                  <option value={"1"}>Active</option>
                  <option value={"0"}>Inactive</option>
                  <option value={"2"}>Delete</option>
                </select>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  class="btn btn-light"
                  style={{ width: "8rem" }}
                  onClick={() => applyStatus()}
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
