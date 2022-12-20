import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Master_CityList() {
  const [first, setFirst] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [country_id, setCountry_id] = useState("");
  const [state_id, setState_id] = useState("");
  const [query, setQuery] = useState({ text: "" });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [city_id, setCity_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");

  const [page, setPage] = useState({
    current: 0,
    previous: 0,
    records_per_page: 0,
    totalpages: 0,
    totalrecords: 0,
  });

  const navigate = useNavigate();

  const [changeStatusId, setChangeStatusId] = useState({
    city_id: "",
    status: "",
  });

  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);
  console.log(page);
  const url = "http://admin.ishop.sunhimlabs.com/api/v1/";

  useEffect(() => {
    axios
      .get(
        `${`http://admin.ishop.sunhimlabs.com/api/v1/`}/allstates/${country_id}`
      )
      .then((res) => setStates(res.data.data));
  }, [country_id]);

  useEffect(() => {
    handleChangePage("e", 1);
    axios
      .get(`${`http://admin.ishop.sunhimlabs.com/api/v1/`}/allcountries/`)
      .then((res) => setCountry(res.data.data));
  }, []);
  const handleChangePage = async (e, newPage) => {
    setPage(newPage);
    try {
      const res = await axios.get(
        `${`http://admin.ishop.sunhimlabs.com/api/v1/`}/cities/list/?state_id=${state_id}&q=${
          query.text
        }&page=${newPage}`
      );
      const { data, pages } = res.data;
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/cities/list/?state_id=`)
      .then((res) => setFirst(res.data.data));
  }, []);
  // const handleChangeRowsPerPage = (e, page) => {
  //   setRowsPerPage(parseInt(e.target.value, page));
  //   setPage(1);
  // };

  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${url}/cities/list/?state_id=${state_id}&q=${query.text}`
      );
      const { data, pages } = res.data;
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerList = () => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/countries/list/`)
      .then((res) => setFirst(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const statusChange = (apidata) => {
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/cities/changestatus", {
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

  // function handleClick(city_id, status) {
  //   console.warn(city_id, status);

  //   let apidata = {
  //     city_id: city_id,
  //     status: status === "0" ? "1" : "0",
  //   };
  //   statusChange(apidata);
  // }

  function handleStatusChange(cityId, status) {
    if (isSingleStatusUpdate) {
      console.warn(city_id, status);
      let apidata = {
        city_id: changeStatusId.city_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  const onSelectCustomer = (e, city_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
        if (item.city_id === city_id) {
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
    console.log(e.target.checked, city_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);

    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedData = first.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.city_id).join(",");
    console.log(selectedId);
    const apidata = {
      city_id: selectedId,
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
  const handleOpen = (city_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      city_id,
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

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">City List</Navbar.Brand>
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
                  </select>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    value={state_id}
                    onChange={(e) => {
                      setState_id(e.target.value);
                    }}
                    name="state_id"
                  >
                    {states.map((item) => {
                      return (
                        <option value={item.state_id}>{item.state_name}</option>
                      );
                    })}
                  </select>
                  &nbsp;&nbsp;&nbsp;&nbsp;
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
                    <label for="customCheck"></label>
                  </div>
                </th>
                <th scope="col">City Name</th>
                <th scope="col">State Name</th>
                <th scope="col">Country Name</th>
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
                            onChange={(e) => onSelectCustomer(e, item.city_id)}
                          />
                          <label for="customCheck{item.id}"></label>
                        </div>
                      </td>
                      <td>{item.city_name}</td>
                      <td>{item.state_name}</td>
                      <td>{item.country_name}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleOpen(item.city_id, item.status)}
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button>
                      </td>
                      <td>
                        <Link
                          to={`/mastermanagement/city/edit/${item.city_id}`}
                        >
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
                  onClick={() => applyStatus()}
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
