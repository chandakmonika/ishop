// import React from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { Outlet, Link } from "react-router-dom";

// export default function DashboardPage() {
//   return (
//     <div>
//       <div className="wrapper">
//         <div className="row">
//           <Navbar className="nav" bg="light" expand="lg">
//             <Container fluid>
//               <Navbar.Brand href="/home">iSHOP</Navbar.Brand>

//               <Navbar.Collapse id="navbarScroll">
//                 <Nav
//                   className="ml-auto my-2 my-lg-0"
//                   style={{ maxHeight: "100px" }}
//                   navbarScroll
//                 >
//                   <Form className="d-flex ml-auto my-2 my-lg-0">
//                     <Form.Control
//                       type="search"
//                       placeholder="Search"
//                       className="me-2"
//                       aria-label="Search"
//                     />
//                     <Button variant="outline-success">Search</Button>
//                   </Form>
//                   &nbsp;&nbsp;&nbsp;
//                   <Nav.Link href="#action1">
//                     <i className="fas fa-user-alt"></i>
//                   </Nav.Link>
//                   <NavDropdown title="User Name" id="navbarScrollingDropdown">
//                     <NavDropdown.Item href="#action3">
//                       <Link to="/login">Login</Link>
//                     </NavDropdown.Item>
//                     <NavDropdown.Item>
//                       <Link to="/dashboard">Setting</Link>
//                     </NavDropdown.Item>
//                     <NavDropdown.Item>
//                       <Link to="/storedetails">Account</Link>
//                     </NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item >
//                     <Link to="/">Logout</Link>
//                       </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//               </Navbar.Collapse>
//             </Container>
//           </Navbar>
//         </div>
//         <div className="row">
//           <div className="sidenav">
//             <ul class="mainmenus">
//               <li>
//                 <Link to="/home">
//                   <i className="fa fa-home"></i>&nbsp;Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/home">
//                   <i className="fa fa-address-book"></i>&nbsp;Orders
//                 </Link>
//                 <ul class="submenu">
//                   <li>
//                     <Link to="/order/orderlist">Add Order</Link>
//                   </li>
//                   <li>
//                     <Link to="/order/orderdetails">Order Details</Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <Link to="/home">
//                   <i className="fa fa-ad"></i>&nbsp;Delivery
//                 </Link>
//                 <ul class="submenu">
//                   <li>
//                     <Link to="/mastermanagement/state/list">State List</Link>
//                   </li>
//                   <li>
//                     <Link to="/mastermanagement/state/add">Add State</Link>
//                   </li>

//                   <li>
//                     <Link to="/mastermanagement/city/list">City List</Link>
//                   </li>
//                   <li>
//                     <Link to="/mastermanagement/city/add">Add City</Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <Link to="/product/list">
//                   <i className="fa fa-map-pin"></i>&nbsp;Products
//                 </Link>
//                 <ul class="submenu">
//                   <li>
//                     <Link to="/product/addproduct">Add Product</Link>
//                   </li>
//                   <li>
//                     <Link to="/product/category/add">Product Category</Link>
//                   </li>
//                   <li>
//                     <Link to="/product/category/list">
//                       Product Category List
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/product/wishlist">Product Wish List</Link>
//                   </li>
//                 </ul>
//               </li>

//               <li>
//                 <Link to="/home">
//                   <i className="fa fa-map-pin"></i>&nbsp;Brand
//                 </Link>
//                 <ul class="submenu">
//                   <li>
//                     <Link to="/brand/list">Brand List</Link>
//                   </li>
//                   <li>
//                     <Link to="/brand/add">Add Brand</Link>
//                   </li>
//                 </ul>
//               </li>

//               <li>
//                 <Link to="/">
//                   <i className="fas fa-user-alt"></i>&nbsp;Customers
//                 </Link>
//                 <ul class="submenu">
//                   <li>
//                     <Link to="/customer/addnewcustomer">Add New Customer</Link>
//                   </li>
//                   <li>
//                     <Link to="/routing/customer/list">Customer List</Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <Link to="/customer/address/list">
//                   <i className="fa fa-address-book"></i>&nbsp;Analytics
//                 </Link>
//                 <ul class="submenu">
//                   <li>
//                     <Link to="/customer/address/add">Add Address</Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a href="marketing">
//                   <i className="fas fa-ad" style={{ color: "grey" }}></i>
//                   &nbsp;Marketing
//                 </a>
//               </li>
//               <li>
//                 <Link to="/">
//                   <i className="fa fa-book"></i>&nbsp;Themes
//                 </Link>
//                 <ul class="submenu">
//                   <a href="/hometheme">Home Theme</a>
//                   <a href="/menutheme">Menu Theme</a>
//                 </ul>
//               </li>
//               <li>
//                 <Link to="/">
//                   <i className="fa fa-map-pin"></i>&nbsp;Coupen Code
//                 </Link>
//                 <ul class="submenu">
//                   <a href="/coupencode/list">Coupen Code List</a>
//                   <a href="/coupencode/add">Add Coupen Code</a>
//                 </ul>
//               </li>
//               <li>
//                 <Link to="/paymentlist">
//                   <i className="fa fa-map-pin"></i>&nbsp;Payment
//                 </Link>
//               </li>

//               <li>
//                 <Link to="/mastermanagement/faq/category/add">
//                   <i className="fa fa-map-pin"></i>&nbsp;FAQ
//                 </Link>
//                 <li>
//                   <a href="/mastermanagement/faq/category/list">
//                     FAQ Category List
//                   </a>
//                 </li>
//                 <ul class="submenu">
//                   <li>
//                     <a href="/mastermanagement/faq/list">FAQ List</a>
//                     <a href="/mastermanagement/faq/add">Add FAQ</a>
//                   </li>
//                 </ul>
//               </li>

//               <li>
//                 <Link to="/home">
//                   <i className="fa fa-map-pin"></i>&nbsp;Master Management
//                 </Link>
//                 <ul class="submenu">
//                   <li>
//                     <a href="/mastermanagement/cms/listpage">CMS Pages</a>
//                     <a href="/mastermanagement/cms/editpage">CMS Edit Page</a>
//                   </li>
//                   <li>
//                     <a href="/mastermanagement/setting/list">Setting</a>
//                   </li>
//                   <li>
//                     <a href="/mastermanagement/email/list">
//                       Email Template List
//                     </a>
//                   </li>
//                   <li>
//                     <a href="/mastermanagement/newsletter/list">
//                       NewsLetter List
//                     </a>

//                     <a href="/mastermanagement/newslettersubscribtion">
//                       NewsLetter Subscribtion
//                     </a>
//                   </li>
//                   <li>
//                     <a href="/mastermanagement/country/list">Country List</a>
//                     <a href="/mastermanagement/country/add">Add Country</a>
//                   </li>
//                   <li>
//                     <a href="/customerlist">CMS</a>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </div>

//           <div class="container-fluid">
//     <div class="row flex-nowrap">
//         <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
//             <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//                 <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
//                     <span class="fs-5 d-none d-sm-inline">Menu</span>
//                 </a>
//                 <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
//                     <li class="nav-item">
//                         <a href="#" class="nav-link align-middle px-0">
//                             <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
//                             <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </a>
//                         <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
//                             <li class="w-100">
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li>
//                         <a href="#" class="nav-link px-0 align-middle">
//                             <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Orders</span></a>
//                     </li>
//                     <li>
//                         <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
//                             <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Bootstrap</span></a>
//                         <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
//                             <li class="w-100">
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2</a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li>
//                         <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
//                             <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Products</span> </a>
//                             <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
//                             <li class="w-100">
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li>
//                         <a href="#" class="nav-link px-0 align-middle">
//                             <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
//                     </li>
//                 </ul>
//                 <hr/>
//                 <div class="dropdown pb-4">
//                     <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
//                         <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
//                         <span class="d-none d-sm-inline mx-1">loser</span>
//                     </a>
//                     <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
//                         <li><a class="dropdown-item" href="#">New project...</a></li>
//                         <li><a class="dropdown-item" href="#">Settings</a></li>
//                         <li><a class="dropdown-item" href="#">Profile</a></li>
//                         <li>
//                             <hr class="dropdown-divider"/>
//                         </li>
//                         <li><a class="dropdown-item" href="#">Sign out</a></li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <div class="col py-3">
//         <Outlet />
//         </div>
//     </div>
// </div>
//           <div className="rightsidebar">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, Link,useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('USER_NAME')

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
                  {/* <Form className="d-flex ml-auto my-2 my-lg-0">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form> */}
                  &nbsp;&nbsp;&nbsp;
                  <Nav.Link href="#action1">
                    <i className="fas fa-user-alt"></i>
                  </Nav.Link>
                  <NavDropdown title={userName} id="navbarScrollingDropdown">
                    
                    <NavDropdown.Item>
                      <Link to="/dashboard">Setting</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/storedetails">Account</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      
                      <div onClick={()=>{
                        localStorage.removeItem("ACCESS_TOKEN")
                        localStorage.removeItem("USER_NAME")
                        navigate("/")
                      }}>Logout</div>
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
              <div class="px-sm-2" style={{backgroundColor:'gray', width:'70%', }}>
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
                          <Link to="/order/orderlist">Add Order</Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/order/orderdetails">Order Details</Link>
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
                          <Link to="/product/list">Product List</Link>
                        </li>
                        <br />

                        <li>
                          <Link to="/product/addproduct">Add Product</Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/product/category/add">
                            Product Category
                          </Link>
                        </li>
                        <br />
                        <li>
                          <Link to="/product/category/list">
                            Product Category List
                          </Link>
                         
                        </li> <br />
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
                        </li><br/>
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
                            <a href="/mastermanagement/cms/listpage">
                              CMS Pages
                            </a>
                          </li>
                          <br />
                          <li>
                            <a href="/mastermanagement/cms/editpage">
                              CMS Edit Page
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
                            <a href="/paymentgetwaylist">Payment Getway List</a>
                          </li><br/>
                          <li>
                            <a href="/paymentgetwayedit">Payment Getway Edit</a>
                          </li><br/>
                          <li>
                            <a href="/seo">SEO</a>
                          </li><br/>
                          <li>
                            <a href="/bloglist">Blog List</a>
                          </li><br/>
                          <li>
                            <a href="/addblog">Add Blog</a>
                          </li>
                          <br/>
                          <li>
                            <a href="/mastermanagement/faq/list">FAQ List</a>
                          </li><br/>
                          <li>
                            <a href="/mastermanagement/faq/add">FAQ Add</a>
                          </li><br/>
                          <li>
                            <a href="/mastermanagement/faq/category/list">FAQ Category List</a>
                          </li><br/>
                          <li>
                            <a href="/mastermanagement/faq/category/add">FAQ Category Add</a>
                          </li><br/>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="#submenu6"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle "
                      >
                        <i className="fa fa-home"></i>&nbsp;Coupen Code
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-chevron-right arrow-icon"></i>
                      </a>
                      <ul

                        class="collapse nav flex-column ms-1"
                        id="submenu6"
                        data-bs-parent="#menu"
                      >
                        <li>
                        <a href="/coupencode/list">Coupen Code List</a>
              
                        </li>
                        <br />
                        <li>
                        <a href="/coupencode/add">Add Coupen Code</a>
                           
                        </li>
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
  );
}
