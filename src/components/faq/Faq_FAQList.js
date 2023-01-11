import React, { useEffect, useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate,useSearchParams, } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EmptyPage from "../emptypage";
import { toaster } from "../../utils/toaster";

export default function Faq_FAQList() {
  const [first, setFirst] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = searchParams.get("page");
  const searchQuery = searchParams.get("search");
  const [query, setQuery] = useState({ search: searchQuery, });
  const [order, setOrder] = useState("ASC");
  const [faq_id, setFaq_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [status, setStatus] = useState([]);
  
 
  const [page, setPage] = useState({
    current: 0,
    previous: 0,
    records_per_page: 15,
    totalpages: 0,
    totalrecords: 0,
  });

  const navigate = useNavigate();

  const [changeStatusId, setChangeStatusId] = useState({
    faq_id: "",
    status: "",
  });

  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);
  const url = `${process.env.REACT_APP_BACKEND_APIURL}api/v1/faq/list`;

  console.log(query);
  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage({
      ...page,
      current: 0
    })

    navigate(`/mastermanagement/faq/list?page=${page.current}&search=${query.search ? query.search : "" }&categoryid=${query.category_id ? query.category_id : "" }`);

    // axios
    //   .get(`http://admin.ishop.sunhimlabs.com/api/v1/faq/list/?q=${query.text}`)
    //   .then((res) => setFirst(res.data.data));
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

  useEffect(() => {
    getCustomerList(pageNo);
    setQuery({
      ...query,
      search: searchQuery
    })
  }, [pageNo, page.records_per_page, searchQuery]);

  const handleChangePage = async (e, newPage) => {
    navigate(`/mastermanagement/faq/list?page=${newPage + 1}&search=${query.search ? query.search : ""}`);
  };

  const getCustomerList = async (newPage) => {
    console.log("newPage", newPage)
    try {
      const res = await axios.get(
        `${url}?q=${query.search ? query.search : ''}&page=${Number(newPage)}&per_page=${page.records_per_page}`
      );
      const { data, pages } = res.data;
      console.log("pages", pages);
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };
  
  // const getCustomerList = () => {
  //   axios
  //     .get(`http://admin.ishop.sunhimlabs.com/api/v1/faq/list`)
  //     .then((res) => setFirst(res.data.data));
  // };

  useEffect(() => {
    getCustomerList(1);
  }, []);

  const sortTableData = (e,sortBy) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/faq/listq=${query.search ? query.search : ""}&per_page=${page.records_per_page}&sort_by=${sortBy}&order_by=${order}`
      )
      .then((res) => setFirst(res.data.data));
  };

  const statusChange = (apidata) => {
    fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/faq/changestatus`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(apidata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, "Status Changed Successfully!");
        setSelectedStatus("")
        handleClose();
        getCustomerList();
      });
    });
  };

  // function handleClick(faq_id, status) {
  //   console.warn(faq_id, status);

  //   let apidata = {
  //     faq_id: faq_id,
  //     status: status === "0" ? "1" : "0",
  //   };
  //   statusChange(apidata);
  // }

  function handleStatusChange(faqId, status) {
    if (isSingleStatusUpdate) {
      console.warn(faq_id, status);
      let apidata = {
        faq_id: changeStatusId.faq_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
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
    const selectedData = first.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.faq_id).join(",");
    console.log(selectedId);
    const apidata = {
      faq_id: selectedId,
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
  const handleOpen = (faq_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      faq_id,
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
        // if (item.brand_id === brand_id) {
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
                    placeholder="Search "
                    value={query.search}
                    onChange={(e) => handleChange(e)}
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
            {/* {console.log(
              2,
              first
                .map((select) => {
                  if (select.isSelected === true) {
                    return true;
                  }
                  return false;
                })
                .includes(false)
            )} */}
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
                  Questions
                  <i class="fas fa-arrow-down" onClick={(e) => sortTableData(e, 'question')}></i>
                  <i class="fas fa-arrow-up" onClick={(e) => sortTableData(e, 'question')}></i>
                </th>
                <th scope="col">
                  FAQ Category
                  <i class="fas fa-arrow-down" onClick={(e) => sortTableData(e, 'category_name')}></i>
                  <i class="fas fa-arrow-up" onClick={(e) => sortTableData(e, 'category_name')}></i>
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
                    <tr key={item.id}>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            value={item.isSelected}
                            checked={item.isSelected ? 'checked' : false}
                            onChange={(e) => onSelectCustomer(e, item.faq_id)}
                          />
                          <label for="customCheck{item.id}">
                         
                            {item.isSelected}
                          </label>
                        </div>
                      </td>
                      <td>{item.question}</td>
                      <td>{item.category_name}</td>
                     
                      <td>
              
                        <button
                          type="button"
                          onClick={() =>
                            handleOpen(item.faq_id, item.status, true)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button>
                      </td>
                      <td>
                        <Link to={`/faq/edit/${item.faq_id}`}>
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
                  <option selected>Action</option>
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
                      handleChangePage(e, 0)
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
