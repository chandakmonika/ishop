import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//import "././Product_Productlist.css";
import EmptyPage from "../emptypage";
import { toaster } from "../../utils/toaster";

export default function ProductsComponent() {
  const storename = localStorage.getItem("USER_NAME")
  const [searchParams, setSearchParams] = useSearchParams();
  const [index, setIndex] = useState([]);
  const pageNo = searchParams.get("page");
  const searchQuery = searchParams.get("search");
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ search: searchQuery, category_name: "", status: "" });
  const [status, setStatus] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [product_id, setProduct_id] = useState([]);
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
    product_id: "",
    status: "",
  });
  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);

  const url = `${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/list`;

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
    navigate(`/product/list?page=${page.current}&search=${query.search ? query.search : "" }&categoryid=${query.category_id ? query.category_id : "" }`);
  };

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/parentcategories`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename
        },
      })
      .then((res) => setIndex(res.data.data));
  }, []);

  // const getData = async () => {
  //   try {
  //     console.log(20, process.env.REACT_APP_BACKEND_APIURL);
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

  useEffect(() => {
    getCustomerList(pageNo);
    setQuery({
      ...query,
      search: searchQuery
    })
  }, [pageNo, page.records_per_page, searchQuery]);

  const handlePageChange = async (e, newPage) => {
    navigate(`/product/list?page=${newPage + 1}&search=${query.search ? query.search : ""}&categoryid=${query.category_id ? query.category_id : ""}`);
  };

  const getCustomerList = async (newPage) => {
    try {
      const res = await axios.get(
        `${url}?q=${query.search ? query.search : ""}&category_id=${query.category_id ? query.category_id : ""}&status=${query.status}&page=${Number(newPage)}&per_page=${page.records_per_page}`
      );
      const { data, pages } = res.data;
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  // const getCustomerList = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/list`, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "Application/json",
  //         storename: "kbtrends",
  //       },
  //     })
  //     .then((res) => setFirst(res.data.data));
  // };

  // useEffect(() => {
  //   getCustomerList();
  // }, []);

  const sortTableData = (e, sortBy) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/list?q=${query.search ? query.search : ""}&category_id=${query.category_id ? query.category_id : ""}&status=${query.status}&page=${Number(page.current)}&per_page=${page.records_per_page}&sort_by=${sortBy}&order_by=${order}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename
        },
      }
        )
      .then((res) => setFirst(res.data.data));
  };

  const statusChange = (apidata) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/changestatus`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename
        },
        body: JSON.stringify(apidata),
      }
    ).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, "Status Changed Successfully!");
        setSelectedStatus("")
        handleClose();
        getCustomerList();
      });
    });
  };

  function handleStatusChange(productId, status) {
    if (isSingleStatusUpdate) {
      console.warn(product_id, status);
      let apidata = {
        product_id: changeStatusId.product_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  // function handleClick(product_id, status) {
  //   console.warn(product_id, status);
  //   let apidata = {
  //     product_id: product_id,
  //     status: status === "0" ? "1" : "0",
  //   };
  //   statusChange(apidata);
  // }

  const onSelectCustomer = (e, product_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
        if (item.product_id === product_id) {
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
    console.log(e.target.checked, product_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    setSelectedcustomer(selectedData);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedData = first.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.product_id).join(",");
    console.log(selectedId);
    const apidata = {
      product_id: selectedId,
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
  const handleOpen = (product_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      product_id,
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
    () => {
      console.log(9898, page)
      return (
        <TablePagination
          className=""
          rowsPerPageOptions={[12]}
          component="div"
          count={page.totalrecords || 0}
          page={page.current - 1 || 0}
          onPageChange={handlePageChange}
          rowsPerPage={page.records_per_page || 0}
        />
      )
    },
    [page]
  );

  return (
    <div>
      {/* <---------------Navbar Start----------------> */}

      <Navbar expand="lg">
        <Container fluid>
          {console.log(98, page)}
          <Navbar.Brand href="#">Product</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="d-flex ml-auto my-2 my-lg-0 float-right">
                <Button variant="light">Export CSV</Button>&nbsp;&nbsp;&nbsp;
                <Button variant="light">Import CSV</Button>&nbsp;&nbsp;&nbsp;
                <Link to="/product/addproduct">
                  <Button variant="info">Add Product</Button>&nbsp;&nbsp;&nbsp;
                </Link>
              </div>
              &nbsp;&nbsp;&nbsp;
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <------------------Navbar End-----------------------> */}

      {/* <---------------main-------------------> */}

      <div class="card" style={{ width: "100%" }}>
        <div class="card-body">
          <div class="row">
            <div className="col-sm-7">
              <form onSubmit={handleSubmit}>
                <div class="input-group">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="texthelp"
                    placeholder="Search"
                    value={query.search}
                    onChange={(e) => handleChange(e)}
                  />
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    name="category_id"
                    value={query.category_id}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="">Select Category</option>
                    {index.map((item) => {
                      return (
                        <option value={item.category_id}>
                          {item.category_name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    class="form-control"
                    id="Product_Status"
                    placeholder="Product Status"
                    name="status"
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected value="">Product Status</option>
                    <option value={"active"}>Active</option>
                    <option value={"inactive"}>Inactive</option>
                  </select>
                  <Button variant="info" type="submit">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <br />

          {/* <-----------------MainEnd-------------------> */}

          {/* <--------------------TableStart-------------------------> */}
          <table class="table table-bordered">
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
                        first &&
                        first.length > 0 &&
                        !first
                          .map((select) => {
                            if (select.isSelected === true) {
                              return "checked";
                            }
                            return false;
                          })
                          .includes(false)
                      }
                      onChange={(e) => selectAllItems(e)}
                      disabled={first.length === 0}
                    />
                    <label for="customCheck"></label>
                  </div>
                </th>
                <th scope="col">
                  Product &nbsp;
                  <i class="fas fa-arrow-down" onClick={(e) => sortTableData(e, 'product_name')}></i>
                  <i class="fas fa-arrow-up" onClick={(e) => sortTableData(e, 'product_name')}></i>
                </th>
                <th scope="col">
                  Product Type &nbsp;
                  <i class="fas fa-arrow-down" onClick={(e) => sortTableData(e, 'product_type')}></i>
                  <i class="fas fa-arrow-up" onClick={(e) => sortTableData(e, 'product_type')}></i>
                </th>
                <th scope="col">
                  Category &nbsp;
                  <i class="fas fa-arrow-down" onClick={(e) => sortTableData(e, 'category_name')}></i>
                  <i class="fas fa-arrow-up" onClick={(e) => sortTableData(e, 'category_name')}></i>
                </th>
                <th scope="col">
                  Product Quantity &nbsp;
                  <i class="fas fa-arrow-down" onClick={(e) => sortTableData(e, 'product_qty')}></i>
                  <i class="fas fa-arrow-up" onClick={(e) => sortTableData(e, 'product_qty')}></i>
                </th>
                <th scope="col">Status</th>
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
                            checked={item.isSelected ? "checked" : false}
                            onChange={(e) =>
                              onSelectCustomer(e, item.product_id)
                            }
                          />
                          <label for="customCheck{item.id}">
                            {item.isSelected}
                          </label>
                        </div>
                      </td>
                      <td>{item.product_name}</td>
                      <td>
                        {item.product_type === "i"
                          ? "Individual"
                          : item.product_type === "p"
                            ? "Parent"
                            : "Child"}
                      </td>
                      <td>{item.category_name}</td>
                      <td>{item.product_qty}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpen(item.product_id, item.status, true)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button>
                      </td>
                      <td>
                        <Link to={`/product/editproduct/${item.product_id}`}>
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
          {first.length <= 0 && (
            <div className="text-center">
              <EmptyPage />
            </div>
          )}
          {/* <-------------------------TableEnd----------------------> */}
          {first.length > 0 && (
            <div class="text-left">
              <div className="d-flex justify-content-between">
                <div className="w-25 mr-2">
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
                    type="button"
                    class="btn btn-light w-25"
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
                      handlePageChange(e, 0)
                    }}
                  >
                    {/* <option selected>Action</option> */}
                    <option value={"5"}>5</option>
                    <option value={"10"}>10</option>
                    <option value={"15"}>
                      15
                    </option>
                    <option value={"20"}>20</option>
                    <option value={"30"}>30</option>
                    <option value={"50"}>50</option>
                    <option value={"100"}>100</option>
                  </select>
                </div>
                <div className="ml-auto">
                  {page.totalpages > 1 && paginationFunction}
                </div>
              </div>
              <div className=" ">
                &nbsp; Pages:
                <b style={{ color: "black" }}> {page.current}</b> /{" "}
                {page.totalpages}{" "}
              </div>
            </div>
          )}
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
            Are you sure you want to change the status?
          </Typography>
          <Button onClick={() => handleClose()}> No </Button>&nbsp;&nbsp;
          <Button onClick={() => handleStatusChange()}>Yes</Button>
        </Box>
      </Modal>
    </div>
  );
}


