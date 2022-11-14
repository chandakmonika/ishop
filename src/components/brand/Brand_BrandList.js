import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Brand_BrandList.css";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";

export default function Brand_BrandList() {
  const [parent_category_id, setParent_category_id] = useState("");
  const [index, setIndex] = useState([]);
  const [brand, setBrand] = useState([]);
  const [status, setStatus] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [query, setQuery] = useState({ text: "" });
  const [brand_id, setBrand_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [page, setPage] = useState([]);

  const [changeStatusId, setChangeStatusId] = useState({
    brand_id: "",
    status: "",
  });
  const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(true);

  const url = "http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list";

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/parentcategories`)
      .then((res) => setIndex(res.data.data));
  }, []);

  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list/?q=${query.text}`
      )
      .then((res) => setBrand(res.data.data));
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${url}`);
      const { data, pages } = res.data;
      setBrand(data);
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
      setBrand(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandList = () => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list`)
      .then((res) => setBrand(res.data.data));
  };
  useEffect(() => {
    getBrandList();
  }, []);

  const update = (e) => {
    e.preventDefault();
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list?q=&per_page=12&page=1&sort_by=brand_name&order_by=${order}`
      )
      .then((res) => setBrand(res.data.data));
  };

  // ------------------------------Action api-------------

  const statusChange = (apidata) => {
    fetch(
      "http://admin.ishop.sunhimlabs.com/api/v1/products/brands/changestatus",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(apidata),
      }
    ).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        handleClose();
        getBrandList();
      });
    });
  };

  // function handleClick(brandId, status) {
  //   console.warn(brand_id, status);

  //   let apidata = {
  //     brand_id: brandId,
  //     status: status === "0" ? "1" : "0",
  //   };
  //   statusChange(apidata);
  // }

  function handleStatusChange(brandId, status) {
    if (isSingleStatusUpdate) {
      console.warn(brand_id, status);
      let apidata = {
        brand_id: changeStatusId.brand_id,
        status: changeStatusId.status === "0" ? "1" : "0",
      };
      statusChange(apidata);
    } else {
      applyStatus();
    }
  }

  const onSelectBrand = (e, brand_id) => {
    const datas =
      brand.length > 0 &&
      brand.map((item) => {
        if (item.brand_id === brand_id) {
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

    setBrand(datas);
    console.log(e.target.checked, brand_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(19, selectedData, 10);
    setSelectedcustomer(selectedData);
    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedData = brand.filter((item) => item.isSelected === true);

    const selectedId = selectedData.map((id) => id.brand_id).join(",");
    console.log(selectedId);
    const apidata = {
      brand_id: selectedId,
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
  const handleOpen = (brand_id, status, isSingleStatus) => {
    setIsSingleStatusUpdate(isSingleStatus);
    setChangeStatusId({
      brand_id,
      status,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const selectAllItems = (e) => {
    console.log(1, e.target.checked);
    const datas =
      brand.length > 0 &&
      brand.map((item) => {
        // if (item.brand_id === brand_id) {
        return {
          ...item,
          isSelected: e.target.checked,
        };
        // } else {
        //   return {
        //     ...item,
        //   };
        // }
      });
    console.log(27, datas);
    setBrand(datas);
  };

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Brand List</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="d-flex ml-auto my-2 my-lg-0">
                <Link to="/brand/add">
                  <Button variant="info">Add Brand</Button>&nbsp;&nbsp;&nbsp;
                </Link>
              </div>
              &nbsp;&nbsp;&nbsp;
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div class="card" style={{ width: "100%" }}>
        <div class="card-body" style={{ width: "100%" }}>
          <div class="row">
            <div className="col-sm-5">
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
                    value={parent_category_id}
                    onChange={(e) => {
                      setParent_category_id(e.target.value);
                    }}
                    name="parent_category_id"
                    category
                  >
                    {index.map((item) => {
                      return (
                        <option value={item.category_id}>
                          {item.category_name}
                        </option>
                      );
                    })}
                  </select>
                  &nbsp;&nbsp;
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
              brand
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
                        !brand
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
                <th scope="col">
                  Category Name &nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i>
                </th>
                <th scope="col">
                  Brand Name &nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i>
                </th>
                <th scope="col">
                  Logo &nbsp;
                  <i class="fas fa-arrow-down" onClick={update}></i>
                  <i class="fas fa-arrow-up" onClick={update}></i>
                </th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {brand &&
                brand.length > 0 &&
                brand.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            checked={item.isSelected}
                            onChange={(e) => onSelectBrand(e, item.brand_id)}
                          />
                          <label for="customCheck{item.id}">
                            {item.isSelected}
                          </label>
                        </div>
                      </td>
                      <td>{item.id}</td>
                      <td>{item.brand_name}</td>
                      <td>{item.brand_logo}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpen(item.brand_id, item.status, true)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button>
                      </td>
                      <td>
                        <Link to={`/brand/edit/${item.brand_id}`}>
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
                  onClick={() => handleOpen(null, null, false)}
                >
                  Apply
                </button>
              </div>

              <h6>Pages:</h6>
              <p>
                &nbsp;
                <b style={{ color: "black" }}> {page.current}</b> /
                {page.totalpages}
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

// ------------------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// //import "./Brand_BrandList.css";
// import * as moment from "moment";
// import axios from "axios";
// import { TableWithBrowserPagination, Column } from "react-rainbow-components";
// const Brand_BrandList = () => {
//   const [data, setData] = useState([]);
//   const [query, setQuery] = useState({ text: "" });
//   const [parent_category_id, setParent_category_id] = useState("");
//   const [index, setIndex] = useState([]);

//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     if (data) {
//       let tableInitial = [];
//       data.map((item) => {
//         let obj = {
//           id: item.id,
//           brand_name: item.brand_name,
//           brand_logo: item.brand_logo,
//           inserted_date: moment(item.inserted_date).format(
//             "Do MMM YYYY, HH:mm"
//           ),
//           product_category_id: item.product_category_id,
//           store_id: item.store_id,
//           status: item.status === 0 ? "inactive" : "active",
//         };
//         tableInitial = [...tableInitial, obj];
//         return null;
//       });
//       setTableData(tableInitial);
//     }
//   }, [data]);

//   useEffect(() => {
//     axios
//       .get("http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list")
//       .then((res) => setData(res.data.data));
//   }, []);
//   useEffect(() => {
//     axios
//       .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/parentcategories`)
//       .then((res) => setIndex(res.data.data));
//   }, []);

//   // console.log(query);
//   const handleChange = (e) => {
//     setQuery({ text: e.target.value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .get(
//         `http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list/?q=${query.text}`
//       )
//       .then((res) => setData(res.data));
//   };
//   return (
//     <div>
//       <Navbar expand="lg">
//         <Container fluid>
//           <Navbar.Brand href="#">Brand List</Navbar.Brand>

//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="ml-auto my-4 my-lg-0"
//               style={{ maxHeight: "100px" }}
//               navbarScroll
//             >
//               <div className="d-flex ml-auto my-2 my-lg-0">
//                 <Button variant="light">Import Brand</Button>&nbsp;&nbsp;&nbsp;
//                 <Button variant="info">Add Brand</Button>&nbsp;&nbsp;&nbsp;
//               </div>
//               &nbsp;&nbsp;&nbsp;
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <div class="card" style={{ width: "100%" }}>
//         <div class="card-body" style={{ width: "100%" }}>
//           <div class="row">
//             <div className="col-sm-5">
//               <form onSubmit={handleSubmit}>
//                 <div class="input-group">
//                   <input
//                     type="text"
//                     name="search"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="texthelp"
//                     placeholder="Search this blog"
//                     onChange={handleChange}
//                   />
//                   &nbsp;&nbsp;&nbsp;&nbsp;
//                   <select
//                     class="form-control"
//                     id="exampleFormControlSelect1"
//                     value={parent_category_id}
//                     onChange={(e) => {
//                       setParent_category_id(e.target.value);
//                     }}
//                     name="parent_category_id"
//                     category
//                   >
//                     {index.map((item) => {
//                       return (
//                         <option value={item.category_id}>
//                           {item.category_name}
//                         </option>
//                       );
//                     })}
//                   </select>
//                   &nbsp;&nbsp;
//                   <Button variant="info" type="submit">
//                     Search
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <br />
//           <div className="rainbow-m-bottom_xx-large" >
//             <TableWithBrowserPagination
//               pageSize={5}
//               showCheckboxColumn
//               data={tableData}
//               keyField="id"

//             >
//               <Column header="Category Name" field="id" />
//               <Column header="brand Name" field="brand_name" />
//               <Column header="brand logo status" field="brand_logo" />
//               <Column header="status" field="status" />
//             </TableWithBrowserPagination>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Brand_BrandList;
