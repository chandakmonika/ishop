import React, { useEffect, useState,useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function Mastermange_CMSListpages() {
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [order, setOrder] = useState("ASC");
  const [faq_id, setFaq_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [status, setStatus] = useState([]);

  const [page, setPage] = useState({
    current: 0,
    previous: 0,
    records_per_page: 0,
    totalpages: 0,
    totalrecords: 0,
  });

  const navigate = useNavigate();

  const [changeStatusId, setChangeStatusId] = useState({
    page_id: "",
    status: "",
  });

  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);
  const url = "http://admin.ishop.sunhimlabs.com/api/v1/cmspages/list";

  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/cmspages/list/?q=${query.text}`
      )
      .then((res) => setFirst(res.data.data));
  };

  const getCustomerList = () => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/cmspages/list`)
      .then((res) => setFirst(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);
 

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

  const statusChange = (apidata) => {
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/cmspages/changestatus", {
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

  function handleStatusChange(page_id, status) {
    if (isSingleStatusUpdate) {
      console.warn(page_id, status);
      let apidata = {
        page_id: changeStatusId.page_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  const onSelectCustomer = (e, page_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
        if (item.page_id === page_id) {
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
    console.log(e.target.checked, page_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);

    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedData = first.filter((item) => item.isSelected === true);
    const selectedId = selectedData.map((id) => id.page_id).join(",");
    console.log(selectedId);
    const apidata = {
      page_id: selectedId,
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
  const handleOpen = (page_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      page_id,
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
          <Navbar.Brand href="#">CMS Pages</Navbar.Brand>
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
                <th scope="col">Page Title</th>
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
                            checked={item.isSelected ? 'checked' : false}
                            onChange={(e) => onSelectCustomer(e, item.page_id)}
                          />
                          <label for="customCheck{item.id}">
                         
                            {item.isSelected}
                          </label>
                        </div>
                      </td>
                    <td>{item.page_title}</td>
                    <td>
              
                        <button
                          type="button"
                          onClick={() =>
                            handleOpen(item.page_id, item.status, true)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button>
                      </td>
                    <td>
                      <Link to={`/mastermanagement/cms/edit/${item.page_id}`}>
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

