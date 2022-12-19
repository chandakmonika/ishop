import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useParams, useNavigate, useSearchParams, } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function Coupen_CoupenCodeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = searchParams.get("page");
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [faq_id, setFaq_id] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [status, setStatus] = useState([]);
  const [coupon_id, setCoupon_id] = useState([]);
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
    coupon_id: "",
    status: "",
  });

  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);
  const url = "http://admin.ishop.sunhimlabs.com/api/v1/coupons/list";

  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getCustomerList(page.current);
    // axios
    //   .get(
    //     `http://admin.ishop.sunhimlabs.com/api/v1/coupons/list/?q=${query.text}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "content-Type": "Application/json",
    //         storename: "kbtrends",
    //       },
    //       // body: JSON.stringify(productInputData),
    //     }
    //   )
    //   .then((res) => setFirst(res.data.data));
  };

  // const getCustomerList = () => {
  //   axios
  //     .get(`http://admin.ishop.sunhimlabs.com/api/v1/coupons/list`, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "content-Type": "Application/json",
  //         storename: "kbtrends",
  //       },
   
  //     })
  //     .then((res) => setFirst(res.data.data));
  // };
  useEffect(() => {
    getCustomerList(pageNo);
  }, [pageNo]);

  const handlePageChange = async (e, newPage) => {
    navigate(`/coupons/list?page=${newPage + 1}`);
  };

  const getCustomerList = async (newPage) => {
    // setPage(newPage);
    try {
      const res = await axios.get(
        `${url}?q=${query.text}&page=${Number(newPage)}`
      );
      const { data, pages } = res.data;
      console.log("pages", pages);
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  const statusChange = (apidata) => {
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/coupons/changestatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename: "kbtrends",
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

  function handleStatusChange(couponId, status) {
    if (isSingleStatusUpdate) {
      console.warn(coupon_id, status);
      let apidata = {
        coupon_id: changeStatusId.coupon_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  const onSelectCustomer = (e, coupon_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
        if (item.coupon_id === coupon_id) {
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
    console.log(e.target.checked, coupon_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);

    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedData = first.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.coupon_id).join(",");
    console.log(selectedId);
    const apidata = {
      coupon_id: selectedId,
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
  const handleOpen = (coupon_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      coupon_id,
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
        onPageChange={handlePageChange}
        rowsPerPage={page.records_per_page || 0}
      />
    ),
    [page]
  );

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Coupon Code List</Navbar.Brand>
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
                    placeholder="Search"
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
              <th scope="col"> Coupon Code</th>
              <th scope="col">Start Date</th>
              <th scope="col"> End Date</th>
              <th scope="col"> Coupon Value</th>
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
                          checked={item.isSelected}
                          onChange={(e) => onSelectCustomer(e, item.coupon_id)}
                        />

                        <label for="customCheck{item.id}">
                          {" "}
                          {item.isSelected}
                        </label>
                      </div>
                    </td>
                    <td>{item.couponcode}</td>
                    <td>{item.valid_to}</td>
                    <td>{item.valid_from}</td>
                    <td>{item.coupon_price}</td>
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
                      <Link to={`/coupencode/edit/${item.coupon_id}`}>
                        <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {first && first.length <= 0 && (
          <h3 class="d-flex justify-content-center my-2">Records not found</h3>
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
                <option value={"1"}>Active</option>
                <option value={"0"}>Inactive</option>
                <option value={"2"}>Delete</option>
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
