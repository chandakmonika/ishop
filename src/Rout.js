// import React from 'react'
// import ForgetPassword from "./ForgetPassword";
// import Login from "./Login";
// import Routing from "./Routing";
// import { Route, Routes, Link } from "react-router-dom";
// export default function Rout() {
//   return (
//     <div>
//        <Routes >
//         {window.localStorage.getItem("isLogingged") === "true" ? <Route exact path="/routing" element={<Routing />} /> :   <Route path="/" element={<Login />} />
//         }
//       <Route path="/" element={<Login />} />
//         <Route  path="/forgetpassword" element={<ForgetPassword />} />
//         {/* <Route  path="/routing" element={<Routing />} /> */}
//       </Routes>
//       {/* console.log(localStorage.getItem("isLogingged") === "true")
//        ( localStorage.getItem("isLogingged") === "true") ? <Route exact path="/routing" element={<Routing />} /> :   <Route path="/" element={<Login />} /> */}
//     </div>
//   )
// }
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <div className="wrapper">
        <div className="row">
          <Navbar className="nav" bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="/home">iSHOP</Navbar.Brand>

              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ml-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Form className="d-flex ml-auto my-2 my-lg-0">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                  &nbsp;&nbsp;&nbsp;
                  <Nav.Link href="#action1">
                    <i className="fas fa-user-alt"></i>
                  </Nav.Link>
                  <NavDropdown title="User Name" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                      <Link to="/login">Login</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/dashboard">Setting</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/storedetails">Account</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="row">
          <div className="sidenav">
            <ul class="mainmenus">
              <li>
                <Link to="/home">
                  <i className="fa fa-home"></i>&nbsp;Home
                </Link>
              </li>
              <li>
                <Link to="/home">
                  <i className="fa fa-address-book"></i>&nbsp;Orders
                </Link>
                <ul class="submenu">
                  <li>
                    <Link to="/order/orderlist">Add Order</Link>
                  </li>
                  <li>
                    <Link to="/order/orderdetails">Order Details</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/home">
                  <i className="fa fa-ad"></i>&nbsp;Delivery
                </Link>
                <ul class="submenu">
                  <li>
                    <Link to="/mastermanagement/state/list">State List</Link>
                  </li>
                  <li>
                    <Link to="/mastermanagement/state/add">Add State</Link>
                  </li>

                  <li>
                    <Link to="/mastermanagement/city/list">City List</Link>
                  </li>
                  <li>
                    <Link to="/mastermanagement/city/add">Add City</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/product/list">
                  <i className="fa fa-map-pin"></i>&nbsp;Products
                </Link>
                <ul class="submenu">
                  <li>
                    <Link to="/product/addproduct">Add Product</Link>
                  </li>
                  <li>
                    <Link to="/product/category/add">Product Category</Link>
                  </li>
                  <li>
                    <Link to="/product/category/list">
                      Product Category List
                    </Link>
                  </li>
                  <li>
                    <Link to="/product/wishlist">Product Wish List</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/home">
                  <i className="fa fa-map-pin"></i>&nbsp;Brand
                </Link>
                <ul class="submenu">
                  <li>
                    <Link to="/brand/list">Brand List</Link>
                  </li>
                  <li>
                    <Link to="/brand/add">Add Brand</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/">
                  <i className="fas fa-user-alt"></i>&nbsp;Customers
                </Link>
                <ul class="submenu">
                  <li>
                    <Link to="/customer/addnewcustomer">Add New Customer</Link>
                  </li>
                  <li>
                    <Link to="/routing/customer/list">Customer List</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/customer/address/list">
                  <i className="fa fa-address-book"></i>&nbsp;Analytics
                </Link>
                <ul class="submenu">
                  <li>
                    <Link to="/customer/address/add">Add Address</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="marketing">
                  <i className="fas fa-ad" style={{ color: "grey" }}></i>
                  &nbsp;Marketing
                </a>
              </li>
              <li>
                <a href="themes">
                  <i className="fa fa-book"></i>&nbsp;Themes
                </a>
              </li>
              <li>
                <Link to="/coupencode">
                  <i className="fas fa-user-alt"></i>&nbsp;Coupen Code
                </Link>
              </li>
              <li>
                <Link to="/paymentlist">
                  <i className="fa fa-map-pin"></i>&nbsp;Payment
                </Link>
              </li>

              <li>
                <Link to="/mastermanagement/faq/category/add">
                  <i className="fa fa-map-pin"></i>&nbsp;FAQ
                </Link>
                <li>
                  <a href="/mastermanagement/faq/category/list">
                    FAQ Category List
                  </a>
                </li>
                <ul class="submenu">
                  <li>
                    <a href="/mastermanagement/faq/list">FAQ List</a>
                    <a href="/mastermanagement/faq/add">Add FAQ</a>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/home">
                  <i className="fa fa-map-pin"></i>&nbsp;Master Management
                </Link>
                <ul class="submenu">
                  <li>
                    <a href="/mastermanagement/cms/listpage">CMS Pages</a>
                    {/* <a href="/mastermanagement/cms/editpage">CMS Edit Page</a> */}
                  </li>
                  <li>
                    <a href="/mastermanagement/setting/list">Setting</a>
                  </li>
                  <li>
                    <a href="/mastermanagement/email/list">
                      Email Template List
                    </a>
                    {/* <a href="/mastermanagement/email/edit">Edit Email</a> */}
                  </li>
                  <li>
                    <a href="/mastermanagement/newsletter/list">
                      NewsLetter List
                    </a>

                    {/* <a href="/mastermanagement/sendnewsletter">
                        Send NewsLetter
                      </a> */}
                    <a href="/mastermanagement/newslettersubscribtion">
                      NewsLetter Subscribtion
                    </a>
                  </li>
                  <li>
                    <a href="/mastermanagement/country/list">Country List</a>
                    <a href="/mastermanagement/country/add">Add Country</a>
                  </li>
                  <li>
                    <a href="/customerlist">CMS</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="rightsidebar">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}