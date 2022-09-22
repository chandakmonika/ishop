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
  useEffect(() => {
    
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/brands/list`)
      .then((res) => setFirst(res.data.data));
  }, []);
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
                      class="custom-control-input"
                      id="customCheck"
                      checked
                    />
                    <label
                      class="custom-control-label"
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
              {first.map((item) => {
                return (
                  <tr key={item.product_id}>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck2"
                        />
                        <label
                          class="custom-control-label"
                          for="customCheck2"
                        ></label>
                      </div>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.brand_name}</td>
                    <td>{item.brand_logo}</td>
                    <td>{item.status === 0 ? "inactive" : "active"}</td>
                    <td>  <Link to={`/brand/edit/${item.brand_id}`}><i class="fas fa-edit"  style={{fontSize:'24px'}}></i></Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <-------------------------TableEnd----------------------> */}

          <div class="text-left">
            <div className="row">
              <div className="col-md-2">
                {/* <label for="exampleFormControlSelect1">Action</label> */}
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                >
                  <option selected>Action</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Delete</option>
                </select>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  class="btn btn-light"
                  style={{ width: "8rem" }}
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
