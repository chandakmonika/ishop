
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("USER_NAME");
  const user_id = localStorage.getItem("USER_ID");

  return (
    <div>
      <div className="wrapper">
      <div className="container-fluid">
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
                  &nbsp;&nbsp;&nbsp;
                  <Nav.Link href="#action1">
                    <i className="fas fa-user-alt"></i>
                  </Nav.Link>
                  <NavDropdown title={userName} id="navbarScrollingDropdown">
                    <NavDropdown.Item>
                      <Link to="/mastermanagement/setting/list">Setting</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/storedetails">Account</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <div
                        onClick={() => {
                          localStorage.removeItem("ACCESS_TOKEN");
                          localStorage.removeItem("USER_NAME");
                          navigate("/");
                        }}
                      >
                        Logout
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="row sidebar-container">
          <div class="col-md-3">
            <div class="">
              <div
                class="px-sm-2"
                style={{ backgroundColor: "gray", width: "70%" }}
              >
                <div class="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
                  <ul
                    class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu"
                  >
                    <li class="nav-item">
                      <Link to="/home">
                        <i className="fa fa-home"></i>&nbsp;Home
                      </Link>
                    </li>

                    <li>
                      <a
                        href="#submenu1"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                      >
                        <i class="fs-4 bi-speedometer2"></i>
                        <i className="fa fa-home"></i>&nbsp;Order
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu1"
                        data-bs-parent="#menu"
                      >
                        <li>
                          <Link to={`/order/orderlist/all`}>Order List</Link>
                        </li>
                        <br />
                        <li>
                          <Link to={`/order/orderdetails/${user_id}`}>Order Details</Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a
                        href="#submenu2"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                      >
                        <i className="fa fa-home"></i>&nbsp;Product
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu2"
                        data-bs-parent="#menu"
                      >
                        <li>
                          <Link to="/product/list?page=1">Product List</Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/product/addproduct">Add Product</Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/product/category/add">
                           Add Product Category
                          </Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/product/category/list">
                            Product Category List
                          </Link>
                        </li>{" "}
                        <br />
                        <li>
                          <Link to="/product/wishlist">Product Wish List</Link>
                        </li>
                        <br />
                      </ul>
                    </li>

                    <li>
                      <a
                        href="#submenu3"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                      >
                        <i className="fa fa-home"></i>&nbsp;Brand
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu3"
                        data-bs-parent="#menu"
                      >
                        <li>
                          <Link to="/brand/list">Brand List</Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/brand/add">Add Brand</Link>
                        </li>
                        <br />
                      </ul>
                    </li>

                    <li>
                      <a
                        href="#submenu4"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle "
                      >
                        <i className="fa fa-home"></i>&nbsp;Customer
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu4"
                        data-bs-parent="#menu"
                      >
                        <li>
                          <Link to="/routing/customer/list">Customer List</Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/customer/addnewcustomer">
                            Add New Customer
                          </Link>
                        </li>
                        <br />
                        {/* <li>
                        <Link to="/customer/address/list">Address List</Link>
                        </li> */}
                      </ul>
                    </li>

                    <li>
                      <a
                        href="#submenu5"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                      >
                        <i className="fa fa-home"></i>&nbsp;Master Management
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu5"
                        data-bs-parent="#menu"
                      >
                        <li class="w-100">
                          <li>
                            <a href="/mastermanagement/cms/list">CMS Pages</a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/cms/addpage">
                              CMS Add Page
                            </a>
                          </li>
                          <br />

                          <li>
                            <a href="/mastermanagement/setting/list">Setting</a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/email/list">
                              Email Template List
                            </a>
                          </li>
                          <br />

                          <li>
                            <a href="/mastermanagement/newsletter/list">
                              NewsLetter List
                            </a>
                          </li>
                          <br />

                          <li>
                            <a href="/mastermanagement/newslettersubscribtion">
                              NewsLetter Subscribtion
                            </a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/country/list">
                              Country List
                            </a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/country/add">
                              Add Country
                            </a>
                          </li>
                          <br />
                          <li>
                            <Link to="/mastermanagement/state/list">
                              State List
                            </Link>
                          </li>
                          <br />
                          <li>
                            <Link to="/mastermanagement/state/add">
                              Add State
                            </Link>
                          </li>
                          <br />

                          <li>
                            <Link to="/mastermanagement/city/list">
                              City List
                            </Link>
                          </li>
                          <br />
                          <li>
                            <Link to="/mastermanagement/city/add">
                              Add City
                            </Link>
                          </li>
                          <br />
                          <li>
                            <a href="/customerlist">CMS</a>
                          </li>
                          <br />
                          <li>
                            <a href="/paymentgetway/list">
                              Payment Getway List
                            </a>
                          </li>
                          <br />
                          <li>
                            <a href="/paymentgetway/add">Payment Getway Add</a>
                          </li>
                          <br />
                          <li>
                            <a href="/seo">SEO</a>
                          </li>
                          <br />
                          <li>
                            <a href="/bloglist">Blog List</a>
                          </li>
                          <br />
                          <li>
                            <a href="/addblog">Add Blog</a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/faq/list">FAQ List</a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/faq/add">FAQ Add</a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/faq/category/list">
                              FAQ Category List
                            </a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/faq/category/add">
                              FAQ Category Add
                            </a>
                          </li>
                          <br />
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="#submenu6"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle "
                      >
                        <i className="fa fa-home"></i>&nbsp;Coupon Code
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu6"
                        data-bs-parent="#menu"
                      >
                        <li>
                          <a href="/coupencode/list">Coupon Code List</a>
                        </li>
                        <br />
                        <li>
                          <a href="/coupencode/add">Add Coupon Code</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="#submenu3"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                      >
                        <i className="fa fa-home"></i>&nbsp;Apperance
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu3"
                        data-bs-parent="#menu"
                      >
                        <li>
                          <Link to="/apperance/menu">Menu</Link>
                        </li>
                        <li>
                          <Link to="/apperance/home">Home Page</Link>
                        </li>
                        <li>
                          <Link to="/apperance/header">Header</Link>
                        </li>
                        <li>
                          <Link to="/apperance/footer">Footer</Link>
                        </li>
                        <li>
                          <Link to="/apperance/themes">Themes</Link>
                        </li>
                        <li>
                          <Link to="/apperance/smtp">SMTP</Link>
                        </li>
                        <li>
                          <Link to="/apperance/transaction">Transaction</Link>
                        </li>
                        <br />
                      </ul>
                    </li>
                    <li>
                      <a
                        href="#submenu3"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                      >
                        <i className="fa fa-home"></i>&nbsp;Media
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu3"
                        data-bs-parent="#menu"
                      >
                        <li>
                          <Link to="/media/list">List</Link>
                        </li>
                        <li>
                          <Link to="/media/addmedia">Add Media</Link>
                        </li>
                        <li>
                          <Link to="/media/editmedia">Edit Media File</Link>
                        </li>
                        <br />
                      </ul>
                    </li>
                  </ul>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div className="rightsidebar col-9">
            <Outlet />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
