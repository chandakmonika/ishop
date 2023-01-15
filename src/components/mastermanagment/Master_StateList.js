import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function Master_StateList() {
  const storename = localStorage.getItem("USER_NAME")
  const [first, setFirst] = useState([]);
  const[stateData, setStateData] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [country_id, setCountry_id] = useState("");
  const [query, setQuery] = useState({ text: "" });
  const [cpage, setCpage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [state_id, setState_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [page, setPage] = useState({
    current: 0,
    previous: 0,
    records_per_page: 0,
    totalpages: 0,
    totalrecords: 0,
  });

  // const navigate = useNavigate();

  const [changeStatusId, setChangeStatusId] = useState({
    state_id: "",
    status: "",
  });


  console.log(page);
  const navigate = useNavigate()

  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);

  const url = "http://admin.ishop.sunhimlabs.com/api/v1/";
 
  useEffect(() => {
    axios.get(`${`http://admin.ishop.sunhimlabs.com/api/v1/`}/allcountries/`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename
      },
    }).then((res) => setCountry(res.data.data));
  }, []);

  const handlePageChange = async (e, newPage) => {
    navigate(`/mastermanagement/state/list?page=${newPage + 1}`);
  };

const handleChangePage = async (e, newPage) => {
    setPage(newPage);
    try {
      const res = await axios.get(`${url}?&page=${newPage + 1}`);
      const { data, pages } = res.data;
      setStateData(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleChangePage = async (e, newPage) => {
  //   setCpage(newPage);
  //   try {
  //     const res = await axios.get(
  //       `${`http://admin.ishop.sunhimlabs.com/api/v1/`}/states/list/?country_id=${country_id}&q=${query.text}&page=${newPage}`
  //     );
  //     const { data, pages } = res.data;
  //     setStateData(data);
  //     setPage(pages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${url}/states/list/?country_id=${country_id}&q=${query.text}`
      );
      const { data, pages } = res.data;
      setStateData(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getStateList = () => {
    axios
      .get(
        `${url}/states/list/?country_id=`,{headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
          storename:storename
        },}
      )
      .then((res) => setStateData(res.data.data));
  };

  useEffect(() => {
    getStateList();
  }, []);

  const statusChange = (apidata) => {
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/states/changestatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename
      },
      body: JSON.stringify(apidata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        handleClose();
        getStateList();
        
      });
    });
  };

  function handleClick(state_id, status) {
    console.warn(state_id, status);
    let apidata = {
      state_id: state_id,
      status: status === "0" ? "1" : "0",
    };
    statusChange(apidata);
  }

  function handleStatusChange(stateId, status) {
    if (isSingleStatusUpdate) {
      console.warn(state_id, status);
      let apidata = {
        state_id: changeStatusId.state_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  const onSelectCustomer = (e, state_id) => {
    const datas =
    stateData.length > 0 &&
    stateData.map((item) => {
        if (item.state_id === state_id) {
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
      setStateData(datas);
    console.log(e.target.checked, state_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);
  console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedData = stateData.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.state_id).join(",");
    console.log(selectedId);
    const apidata = {
      state_id: selectedId,
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
  const handleOpen = (state_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      state_id,
      status,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const selectAllItems = (e) => {
    console.log(1, e.target.checked);
    const datas =
    stateData.length > 0 &&
    stateData.map((item) => {
        // if (item.brand_id === brand_id) {
        return {
          ...item,
          isSelected: e.target.checked,
        };
      });
    console.log(27, datas);
    setStateData(datas);
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
          <Navbar.Brand href="#">State List</Navbar.Brand>
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
          <div className="col-sm-7">
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
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                      setCountry_id(e.target.value);
                    }}
                    name="country_id"
                  >
                    {country.map((item) => {
                      return (
                        <option value={item.country_id}>
                          {item.country_name}
                        </option>
                      );
                    })}
                  </select>&nbsp;&nbsp;&nbsp;
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
                <th scope="col">
                  <div class="custom-control custom-checkbox">
                  <input
                      type="checkbox"
                      checked={
                        !stateData
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
                     <label for="customCheck"></label>
                  </div>
                </th>
                <th scope="col">State </th>
                <th scope="col">Country </th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
            {stateData &&
                stateData.length > 0 &&
                stateData.map((item) => {
                return (
                  <tr key={item.product_id}>
                    <td>
                
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    value={item.isSelected}
                    checked={item.isSelected ? 'checked' : false}
                    onChange={(e) => onSelectCustomer(e, item.state_id)}
                  />
                  <label for="customCheck{item.id}"></label>
                </div>
             
            </td>
                    <td>{item.state_name}</td>
                    <td>{item.country_name}</td>
                    <td><button
                          type="button"
                          onClick={() =>
                            handleOpen(item.state_id, item.status)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button></td>
                    <td>
                      <Link to={`/mastermanagement/state/edit/${item.state_id}`}>
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
              <div className="row">
                <button
                  type="button"
                  class="btn btn-light"
                  style={{ width: "8rem" }}
                  onClick={() => handleOpen(null, null, false)}
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
              {paginationFunction}
              
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

