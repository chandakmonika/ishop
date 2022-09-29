import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Brand_BrandList.css";
import { Link } from "react-router-dom";

export default function Brand_BrandList() {
  const [parent_category_id, setParent_category_id] = useState("");
  const [index, setIndex] = useState([]);
  const [first, setFirst] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [brand_id, setBrand_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
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
      .then((res) => setFirst(res.data.data));
  };

  const getCustomerList = () => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list`)
      .then((res) => setFirst(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);
  
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
        getCustomerList();
      });
    });
  };

  function handleClick(brandId, status) {
    console.warn(brand_id, status);

    let apidata = {
      brand_id: brandId,
      status: status === "0" ? "1" : "0",
    };
    statusChange(apidata);
  }

  const onSelectCustomer = (e, brand_id) => {
    const datas =
    first.length > 0 &&
    first.map((item) => {
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
    setFirst(datas);
    console.log(e.target.checked, brand_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);

    console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedId = selectedcustomer.map((id) => id.brand_id).join(",");
    console.log(selectedId);
    const apidata = {
      brand_id: selectedId,
      status: selectedStatus,
    };
    statusChange(apidata);
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
                <Button variant="light">Import Brand</Button>&nbsp;&nbsp;&nbsp;
                <Button variant="info">Add Brand</Button>&nbsp;&nbsp;&nbsp;
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
            <thead style={{ backgroundColor: "#EBF1F3" }}>
              <tr>
                <th scope="col">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                    />
                    <label
                      for="customCheck"
                    ></label>
                  </div>
                </th>
                <th scope="col">Category Name</th>
                <th scope="col">Brand Name</th>
                <th scope="col">Logo</th>
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
                            onChange={(e) => onSelectCustomer(e, item.brand_id)}
                          />
                          <label for="customCheck{item.id}"></label>
                        </div>
                      </td>
                      <td>{item.id}</td>
                      <td>{item.brand_name}</td>
                      <td>{item.brand_logo}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            handleClick(item.brand_id, item.status)
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
                  onClick={() => applyStatus()}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
