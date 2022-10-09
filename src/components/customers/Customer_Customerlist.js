import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Customer_Customerlist.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Customer_Customerlist() {
  const [index, setIndex] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [order, setOrder] = useState("ASC");
  const [status, setStatus] = useState([]);
  const [user_id, setUser_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [page, setPage] = useState([]);
const[changeStatusId, setChangeStatusId] = useState({
  user_id:"",
  status:""
});
const[isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true)
  const url = "http://admin.ishop.sunhimlabs.com/api/v1/customer/list";

  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/list/?q=${query.text}`
      )
      .then((res) => setIndex(res.data.data));
  };
  const getData = async () => {
    try {
      const res = await axios.get(`${url}`);
      const { data, pages } = res.data;
      setIndex(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChangePage = async (e, newPage) => {
    setPage(newPage);
    try {
      const res = await axios.get(`${url}?&page=${newPage + 1}`);
      const { data, pages } = res.data;
      setIndex(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerList = () => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/customer/list/`)
      .then((res) => setIndex(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const update = (e) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/list?q=&per_page=12&page=1&sort_by=first_name&order_by=${order}`
      )
      .then((res) => setIndex(res.data.data));
  };

  // ------------------------------Action api-------------

  const statusChange = (apidata) => {
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/customer/changestatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(apidata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        handleClose();
        getCustomerList();
      });
    });
  };

  function handleStatusChange(userId, status) {
    if (
      isSingleStatusUpdate
      ){
        console.warn(user_id, status);
    let apidata = {
      user_id: changeStatusId.user_id,
      status: changeStatusId.status === "0" ? "1" : "0",
    };
    statusChange(apidata);
      }
      else{
applyStatus();
      }
    
  }

  const onSelectCustomer = (e, user_id) => {
    const datas =
      index.length > 0 &&
      index.map((item) => {
        if (item.user_id === user_id) {
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
    setIndex(datas);
    console.log(e.target.checked, user_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);

    console.log(datas);
  };



  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedId = selectedcustomer.map((id) => id.user_id).join(",");
    console.log(selectedId);
    const apidata = {
      user_id: selectedId,
      status: selectedStatus,
    };
    statusChange(apidata);
  };



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (user_id,status,isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus)
    setChangeStatusId({
      user_id,status
    })
    setOpen(true);
  } 
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Customer List</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="d-flex ml-auto my-2 my-lg-0">
                <Button variant="light">Import Customer</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="info">Add Customer</Button>&nbsp;&nbsp;&nbsp;
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
                <th scope="col">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" />
                    <label for="customCheck"></label>
                  </div>
                </th>
                <th scope="col">
                  Customer Name &nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i>
                </th>
                <th scope="col">
                  Mobile Number&nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i>
                </th>
                <th scope="col">
                  Email &nbsp;{" "}
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i>
                </th>
                <th scope="col">Orders Place</th>
                <th scope="col">Total Sales</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {index &&
                index.length > 0 &&
                index.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            value={item.isSelected}
                            onChange={(e) => onSelectCustomer(e, item.user_id)}
                          />
                          <label for="customCheck{item.id}"></label>
                        </div>
                      </td>
                      <td>
                        {item.first_name} {item.last_name}
                      </td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td></td>
                      <td></td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleOpen(item.user_id, item.status,true)}
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button>
                      </td>
                      <td>
                        <Link to={`/customer/address/list`}>
                          <i
                            class="fa fa-address-book"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to={`/customer/edit/${item.user_id}`}>
                          <i
                            class="fas fa-edit"
                            style={{ fontSize: "24px" }}
                          ></i>
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
                  onClick={() => handleOpen(null,null,false)}
                >
                  Apply
                </button>
              </div>

              <h6>Pages:</h6>
              <p>
                &nbsp;
                <b style={{ color: "black" }}> {page.current}</b> /{" "}
                {page.totalpages}{" "}
              </p>

              <TablePagination
                className="col-md-5"
                component="div"
                count={page.totalrecords}
                page={page.current - 1}
                onPageChange={handleChangePage}
                rowsPerPage={page.records_per_page}
              />

            </div>
          </div>  
        </div>
      </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">

         
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Are you sure want to change the status?
          </Typography>
          <Button onClick={() => handleClose()}> No </Button>&nbsp;&nbsp;
          <Button onClick={() => handleStatusChange()}>Yes</Button>
        </Box>
      </Modal>
    </div>
  );
}
