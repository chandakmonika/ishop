import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams,  useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function Address_AddressList() {
  const storename = localStorage.getItem("USER_NAME")
  const [first, setFirst] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [query, setQuery] = useState({ text: "" });
  const { user_id } = useParams();
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [page, setPage] = useState({
    current: 0,
    previous: 0,
    records_per_page: 15,
    totalpages: 0,
    totalrecords: 0,
  });

  const navigate = useNavigate();

  const [changeStatusId, setChangeStatusId] = useState({
    user_id: "",
    status: "",
  });
  
  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);
  const url = `${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/address/list`;

  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/address/list/13/q=${query.text}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "Application/json",
            storename:storename,
          }
        }
      )
      .then((res) => setFirst(res.data.data));
  };

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
    console.log('user_id', user_id)
    axios
      .get(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/address/list/${user_id}`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename,
        }
      })
      .then((res) => setFirst(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const update = (e) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/address/list?q=&per_page=12&page=1&sort_by=first_name&order_by=${order}`
      )
      .then((res) => setFirst(res.data.data));
  };


  const statusChange = (apidata) => {
    fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/address/changestatus`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
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
    if (isSingleStatusUpdate) {
      console.warn(user_id, status);
      let apidata = {
        user_id: changeStatusId.user_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  const onSelectCustomer = (e, user_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
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
    setFirst(datas);
    console.log(e.target.checked, user_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);

    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedData = first.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.user_id).join(",");
    console.log(selectedId);
    const apidata = {
      user_id: selectedId,
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
  const handleOpen = (user_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      user_id,
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
          <Navbar.Brand href="#">Address List</Navbar.Brand>
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
          <div class="row justify-content-between">
            <div className="col-sm-5">
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

                <div class="input-group-append">
                  <Button variant="info" type="submit">
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <Link to={`/customer/address/add/${user_id}`}>
                <Button variant="info">
                  Add Address
                </Button>
              </Link>
            </div>
          </div>
          <br />
          <table class="table table-bordered">
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
                    <label
                      for="customCheck1"
                    ></label>
                  </div>
                </th>
                <th scope="col">Name &nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i></th>
                <th scope="col">Email &nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i></th>
                <th scope="col">Address &nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i></th>
                <th scope="col">Address Type</th>
                <th scope="col">status</th>
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
                            onChange={(e) => onSelectCustomer(e, item.user_id)}
                          />
                          <label
                            for="customCheck{item.id}"
                          > {" "}
                          {item.isSelected}</label>
                        </div>
                      </td>
                      <td>
                        {item.first_name} {item.last_name}
                      </td>
                      <td>{item.email}</td>
                      <td>
                        {item.addressline1}
                        {item.addressline2}
                        {item.city}
                        {item.zipcode}
                      </td>
                      <td>{item.address_type}</td>
                      <td> <button
                          type="button"
                          onClick={() =>
                            handleOpen(item.user_id, item.status, true)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button></td>
                      <td>
                        <Link to={`/customer/address/edit/${item.address_id}`}>
                          <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          {
            first && first.length <= 0 &&
            <h3 class="d-flex justify-content-center my-2">
            Records not found
          </h3>
          }
          {/* <-------------------------TableEnd----------------------> */}

          <div class="text-left">
            {
              first && first.length > 0 &&
              <div className="row">
              <div className="col-md-2">
                {/* <label for="exampleFormControlSelect1">Action</label> */}
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option selected>Action</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Delete</option>
                </select>
              </div>
              <div className="row">
                <button
                  type="button"
                  class="btn btn-light col-md-2"
                  style={{ width: "8rem" }}
                  onClick={() => handleOpen(null, null, false)}
                >
                  Apply
                </button>

                <p className="col-md-3">
                  &nbsp; Pages:
                  <b style={{ color: "black" }}> {page.current}</b> /{" "}
                  {page.totalpages}{" "}
                </p>

                {paginationFunction}

              </div>
            </div>
            }
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
