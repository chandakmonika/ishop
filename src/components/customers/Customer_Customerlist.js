import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Customer_Customerlist.css";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import EmptyPage from "../emptypage";
import { toaster } from "../../utils/toaster";

export default function Customer_Customerlist() {
  const storename = localStorage.getItem("USER_NAME")
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = searchParams.get("page");
  const searchQuery = searchParams.get("search");
  const [index, setIndex] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [order, setOrder] = useState("ASC");
  const [status, setStatus] = useState([]);
  const [user_id, setUser_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
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
  const url = `${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/list`;

  console.log(query);
  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage({
      ...page,
      current: 0,
    });
    

    navigate(
      `/routing/customer/list?page=${page.current}&search=${
        query.search ? query.search : ""
      }`
    );
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/list`,
      {
       
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename: storename,
        },
       
      }
      )
      
      .then((res) => setIndex(res.data.data));
  }, []);

  useEffect(() => {
    getData(pageNo);
    setQuery({
      ...query,
      search: searchQuery,
    });
  }, [pageNo, page.records_per_page, searchQuery]);

  const handleChangePage = async (e, newPage) => {
    navigate(
      `/routing/customer/list?page=${newPage + 1}&search=${
        query.search ? query.search : ""
      }`
    );
    // setPage(newPage);
  };

  
  const getData = async (newPage) => {
    try {
      const res = await axios.get(
        `${url}?q=${query.search ? query.search : ""}&page=${Number(
          newPage
        )}&per_page=${page.records_per_page}`
      );
      const { data, pages } = res.data;
      setIndex(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   getData();

  // }, []);

  // const getCustomerList = () => {
  //   axios
  //     .get(`http://admin.ishop.sunhimlabs.com/api/v1/customer/list/`,{
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "content-Type": "Application/json",
  //         storename: "kbtrends",
  //       },
  //       // body: JSON.stringify(productInputData),
  //     })

  //     .then((res) => setIndex(res.data.data));
  // };

  // useEffect(() => {
  //   getCustomerList();
  // }, []);

  const sortTableData = (e, sortBy) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/list?q=${
          query.search ? query.search : ""
        }&page=${Number(page.current)}&per_page=${
          page.records_per_page
        }&sort_by=${sortBy}&order_by=${order}`,
        {
          // body: JSON.stringify(productInputData),
        }
      )
      .then((res) => setIndex(res.data.data));
  };

  // ------------------------------Action api-------------

  const statusChange = (apidata) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_APIURL}api/v1/customer/changestatus`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename: storename,
        },
        body: JSON.stringify(apidata),
      }
    ).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, "Status Changed Successfully!");
        setSelectedStatus("");
        handleClose();
        getData();
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
    const selectedData = index.filter((item) => item.isSelected === true);
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
      index.length > 0 &&
      index.map((item) => {
        return {
          ...item,
          isSelected: e.target.checked,
        };
      });
    console.log(27, datas);
    setIndex(datas);
  };

  const paginationFunction = useMemo(() => {
    console.log(9898, page);
    return (
      <TablePagination
        className=""
        rowsPerPageOptions={[12]}
        component="div"
        count={page.totalrecords || 0}
        page={page.current - 1 || 0}
        onPageChange={handleChangePage}
        rowsPerPage={page.records_per_page || 0}
      />
    );
  }, [page]);

  return (
    <div>
      {/* <ToastContainer /> */}
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
                <Button variant="info">
                  <Link to="/customer/addnewcustomer">Add Customer</Link>
                </Button>
                &nbsp;&nbsp;&nbsp;
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
                    value={query.search}
                    onChange={(e) => handleChange(e)}
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
            {console.log(
              2,
              index
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
                        index &&
                        index.length > 0 &&
                        !index
                          .map((select) => {
                            if (select.isSelected === true) {
                              return "checked";
                            }
                            return false;
                          })
                          .includes(false)
                      }
                      onChange={(e) => selectAllItems(e)}
                      disabled={index.length === 0}
                    />
                    <label for="customCheck"></label>
                  </div>
                </th>
                <th scope="col">
                  Customer Name &nbsp;
                  <i
                    class="fas fa-arrow-down"
                    onClick={(e) => sortTableData(e, "first_name")}
                  ></i>
                  <i
                    class="fas fa-arrow-up"
                    onClick={(e) => sortTableData(e, "first_name")}
                  ></i>
                </th>
                <th scope="col">Mobile Number&nbsp;</th>
                <th scope="col">
                  Email &nbsp;{" "}
                  <i
                    class="fas fa-arrow-down"
                    onClick={(e) => sortTableData(e, "email")}
                  ></i>
                  <i
                    class="fas fa-arrow-up"
                    onClick={(e) => sortTableData(e, "email")}
                  ></i>
                </th>
                <th scope="col">Orders Placed</th>
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
                            checked={item.isSelected ? "checked" : false}
                            onChange={(e) => onSelectCustomer(e, item.user_id)}
                          />

                          <label for="customCheck{item.id}">
                            {item.isSelected}
                          </label>
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
                          onClick={() =>
                            handleOpen(item.user_id, item.status, true)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button>
                      </td>
                      <td>
                        <Link to={`/customer/address/list/${item.user_id}`}>
                          <i
                            class="fa fa-address-book address-icon"
                            style={{ fontSize: "24px" }}
                            // onClick={() => navigate('/customer/address/list',{state:{userId: item.user_id}})}
                          ></i>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to={`/customer/edit/${item.user_id}`}>
                          <i
                            class="fas fa-edit"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </Link>
                        <Link to={`/order/orderlist/${item.user_id}`}>
                          <i
                            class="fa fa-address-card"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {index.length <= 0 && (
            <div className="text-center">
              <EmptyPage />
            </div>
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
                  value={selectedStatus}
                >
                  <option selected value={""}>Action</option>
                  <option value={"1"}>Active</option>
                  <option value={"0"}>Inactive</option>
                  <option value={"2"}>Delete</option>
                </select>
              </div>
              <div className="">
                <button
                  type="button "
                  class="btn btn-light col-md-2"
                  style={{ minWidth: "fit-content" }}
                  onClick={() => handleOpen(null, null, false)}
                >
                  Apply
                </button>
              </div>

              <div className="w-auto ml-auto">
                <span>Records per page: </span>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                  defaultValue={page.records_per_page}
                  onChange={(e) => {
                    setPage({
                      ...page,
                      records_per_page: e.target.value,
                    });
                    handleChangePage(e, 0);
                  }}
                >
                  {/* <option selected>Action</option> */}
                  <option value={"5"}>5</option>
                  <option value={"10"}>10</option>
                  <option value={"15"}>15</option>
                  <option value={"20"}>20</option>
                  <option value={"30"}>30</option>
                  <option value={"50"}>50</option>
                  <option value={"100"}>100</option>
                </select>
              </div>

              <div className="ml-auto">
                {page.totalpages > 1 && paginationFunction}
              </div>

              <div className=" ">
                &nbsp; Pages:
                <b style={{ color: "black" }}> {page.current}</b> /{" "}
                {page.totalpages}{" "}
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
