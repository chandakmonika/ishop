import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Dropdown } from "bootstrap";
import { toaster } from "../../utils/toaster";

export default function Order_OrderList() {
  const storename = localStorage.getItem("USER_NAME")
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [order, setOrder] = useState("ASC");
  const [status, setStatus] = useState([]);
  const [order_id, setOrder_id] = useState([]);
  const { user_id } = useParams();

  const [page, setPage] = useState({
    current: 0,
    previous: 0,
    records_per_page: 0,
    totalpages: 0,
    totalrecords: 0,
  });

  const navigate = useNavigate();

  const [changeStatusId, setChangeStatusId] = useState({
    order_id: "",
    status: "",
  });

  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);
  const url = `${process.env.REACT_APP_BACKEND_APIURL}api/v1/orders/list`;

  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/orders/list/?q=${query.text}`,{
          headers: {
            Accept: "application/json",
            "content-Type": "Application/json",
            storename: storename,
        }
        }
      )
      .then((res) => setFirst(res.data.data));
  };

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(`${url}`);
  //     const { data, pages } = res.data;
  //     setFirst(data);
  //     setPage(pages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  const handleChangePage = async (e, newPage) => {
    setPage(newPage);
    try {
      const res = await axios.get(`${url}?&page=${newPage + 1}`);
      const { data, pages } = res.data;
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerList = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/orders/list/${user_id}`,
        {
          headers: {
            Accept: "application/json",
            "content-Type": "Application/json",
            storename: storename,
          },
      })
      .then((res) => {
        const { data, pages } = res.data;
    setFirst(data);
     setPage(pages);
      });
  };

  useEffect(() => {
    getCustomerList();
  }, [user_id]);

  const update = (e) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/orders/list?q=&per_page=12&${user_id}&page=1&sort_by=order_number&order_by=${order}`
      )
      .then((res) => setFirst(res.data.data));
  };

  const statusChange = (apidata) => {
    fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/orders/changestatus`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename: storename,
      },
      body: JSON.stringify(apidata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, "Status Updated successfully!")
        handleClose();
        getCustomerList();
      });
    });
  };

  // function handleClick(category_id, status) {
  //   console.warn(category_id, status);

  //   let apidata = {
  //     category_id: category_id,
  //     status: status === "0" ? "1" : "0",
  //   };
  //   statusChange(apidata);
  // }

  function handleStatusChange(order_Id, status) {
    if (isSingleStatusUpdate) {
      let apidata = {
        order_id: changeStatusId.order_id,
        status: changeStatusId.status,
      };
      console.warn(3245, apidata, order_id, status);
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  const onSelectCustomer = (e, order_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
        if (item.order_id === order_id) {
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
    console.log(e.target.checked, order_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);
    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, first, selectedcustomer, selectedStatus);
    const selectedData = first.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.order_id).join(",");
    console.log(5454, selectedId);
    const apidata = {
      order_id: selectedId,
      status: selectedStatus,
    };
    statusChange(apidata);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (order_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      order_id,
      status,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const selectAllItems = (e) => {
    console.log(1, e.target.checked);
    const datas =
      first.length > 0 &&
      first.map((item) => {
        return {
          ...item,
          isSelected: e.target.checked,
        };
      });
    console.log(27, datas);
    setFirst(datas);
  };

  const paginationFunction = useMemo(
    () => (
      <TablePagination
        className="col-md-7"
        rowsPerPageOptions={[12]}
        component="div"
        count={page.totalrecords || 0}
        page={page.current - 1 || 0}
        onPageChange={handleChangePage}
        rowsPerPage={page.records_per_page || 0}
      />
    ),
    [page]
  );

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Order List</Navbar.Brand>
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
            <div className="col-sm-8">
              <form onSubmit={handleSubmit}>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                  />
                  &nbsp;&nbsp;&nbsp;
                  <span>
                    {/* <label>To</label> */}
                    <input
                      type="datetime-local"
                      class="form-control"
                      id="birthdaytime"
                      name="birthdaytime"
                    />
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>
                    {/* <label>From</label> */}
                    <input
                      type="datetime-local"
                      class="form-control"
                      id="birthdaytime"
                      name="birthdaytime"
                    />
                  </span>
                  &nbsp;&nbsp;&nbsp;
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
            {console.log(
              2,
              first
                .map((select) => {
                  if (select.isSelected === true) {
                    return true;
                  }
                  return false;
                })
                .includes(false)
            )}
            <thead style={{ backgroundColor: "#EBF1F3" }}>
              <tr>
                <th scope="col">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      checked={
                        !first
                          .map((select) => {
                            if (select.isSelected === true) {
                              return true;
                            }
                            return false;
                          })
                          .includes(false)
                      }
                      onChange={(e) => selectAllItems(e)}
                    />
                    <label for="customCheck1"></label>
                  </div>
                </th>
                <th scope="col">Order Id</th>
                <th scope="col">Order Date</th>
                <th scope="col">Zip Code</th>
                <th scope="col">Price</th>
                <th scope="col">Order Status</th>
                {/* <th scope="col">Status</th> */}
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
                            checked={item.isSelected}
                            onChange={(e) => handleStatusChange(e, item.order_id)}
                          />
                          <label for="customCheck{item.id}">
                            {item.isSelected}
                          </label>
                        </div>
                      </td>
                      <td>{item.order_number}</td>
                      <td>{item.inserted_date}</td>
                      <td>{item.subtotal_amount}</td>
                      <td>{item.final_amount}</td>
                      {/* <td>{item.order_status}</td> */}
                      <td>
                        {/* <button
                          type="button"
                          onClick={() =>
                            handleOpen(item.order_id, item.status, true)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button> */}

                        <select
                          class="form-control"
                          id="exampleFormControlSelect1"
                          placeholder="Action"
                          value={item.order_status}
                          onChange={(e) => handleOpen(item.order_id, e.target.value, true)}
                        >
                          <option selected value="">
                            Action
                          </option>
                          <option value={"completed"}>Completed</option>
                          <option value={"cancelled"}>Cancelled</option>
                          <option value={"returned"}>Returned</option>
                          <option value={"confirmed"}>Confirmed</option>
                          <option value={"placed"}>Placed</option>
                          <option value={"delivered"}>Delivered</option>
                          <option value={"dispatched"}>Dispatched</option>
                        </select>
                      </td>
                      <td>
                        <Link to={`/order/orderdetails/${item.order_id}`}>
                          <i class="fa fa-eye" style={{ fontSize: "24px" }}></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {first && first.length <= 0 && (
            <h3 class="d-flex justify-content-center my-2">
              Records not found
            </h3>
          )}
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
                  <option value={"completed"}>Completed</option>
                  <option value={"cancelled"}>Cancelled</option>
                  <option value={"returned"}>Returned</option>
                  <option value={"confirmed"}>Confirmed</option>
                  <option value={"placed"}>Placed</option>
                  <option value={"delivered"}>Delivered</option>
                  <option value={"dispatched"}>Dispatched</option>
                </select>
              </div>
              <div className="row">
                <button
                  type="button "
                  class="btn btn-light col-md-2"
                  style={{ width: "8rem" }}
                  onClick={() => handleOpen(null, null, false)}
                >
                  Apply
                </button>

                <p className="col-md-3">
                  &nbsp; Pages:
                  <b style={{ color: "black" }}> {page.current}</b> /{""}
                  {page.totalpages}{" "}
                </p>

                {paginationFunction}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          ></Typography>
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
