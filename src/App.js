import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Route, Routes, Link } from "react-router-dom";
import Prodct_Productlist from "./components/product/Prodct_Productlist";
import Product_AddProduct from "./components/product/Product_AddProduct";
import Customer_Addnewcustomer from "./components/customers/Customer_Addnewcustomer";
import Customer_Customerlist from "./components/customers/Customer_Customerlist";
import Product_AddProductCategory from "./components/product/Product_AddProductCategory";
import Product_ProductCategoryList from "./components/product/Product_ProductCategoryList";
import Brand_BrandList from "./components/brand/Brand_BrandList";
import Brand_AddBrand from "./components/brand/Brand_AddBrand";
import Payment_Payment from "./components/payment/Payment_Payment";
import Coupen_CoupenCode from "./components/coupencode/Coupen_CoupenCode";
import Address_AddressList from "./components/address/Address_AddressList";
import Address_AddAddress from "./components/address/Address_AddAddress";
import Faq_AddFAQ from "./components/faq/Faq_AddFAQ";
import Faq_FAQList from "./components/faq/Faq_FAQList";
import Faq_AddCategoryListFAQ from "./components/faq/Faq_AddCategoryListFAQ";
import Faq_AddCategoryList from "./components/faq/Faq_AddCategoryList";
import Mastermange_CMSListpages from "./components/mastermanagment/Mastermange_CMSListpages";
import M_CMSEditpage from "./components/mastermanagment/M_CMSEditpage";
import Master_SettingList from "./components/mastermanagment/Master_SettingList";
import Product_ProductWishList from "./components/product/Product_ProductWishList";
import Master_EmailList from "./components/mastermanagment/Master_EmailList";
import Master_EmailEdit from "./components/mastermanagment/Master_EmailEdit";
import Master_NewsLetterList from "./components/mastermanagment/Master_NewsLetterList";
import Master_EditNewsLetter from "./components/mastermanagment/Master_EditNewsLetter";
import Master_SendNewsLetter from "./components/mastermanagment/Master_SendNewsLetter";
import Master_City from "./components/mastermanagment/Master_City";
import Master_CityList from "./components/mastermanagment/Master_CityList";
import Master_Country from "./components/mastermanagment/Master_Country";
import Master_CountryList from "./components/mastermanagment/Master_CountryList";
import Master_State from "./components/mastermanagment/Master_State";
import Master_StateList from "./components/mastermanagment/Master_StateList";
import Customer_Editcustomer from "./components/customers/Customer_Editcustomer";

function App() {
  return (
    <div className="App">
      <div className="App">
        {/* <Layout/> */}
        <div className="wrapper">
          <div className="row">
            <Navbar className="nav" bg="light" expand="lg">
              <Container fluid>
                <Navbar.Brand href="#">iSHOP</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
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
                      <NavDropdown.Item href="#action3">Login</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Logout
                      </NavDropdown.Item>
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
                  <Link to="/">
                    <i className="fa fa-home"></i>&nbsp;Home
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa fa-address-book"></i>&nbsp;Orders
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa fa-ad"></i>&nbsp;Delivery
                  </Link>
                  <ul class="submenu">
                    <li>
                      <a href="/statelist">State List</a>
                    </li>
                    <li>
                      <a href="/addstate">Add State</a>
                    </li>

                    <li>
                      <a href="/citylist">City List</a>
                    </li>
                    <li>
                      <a href="/addcity">Add City</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/productlist">
                    <i className="fa fa-map-pin"></i>&nbsp;Products
                  </Link>
                  <ul class="submenu">
                    <li>
                      <Link to="/addproduct">Add Product</Link>
                    </li>
                    <li>
                      <Link to="/addproductcategory">Product Category</Link>
                    </li>
                    <li>
                      <Link to="/productcategorylist">
                        Product Category List
                      </Link>
                    </li>
                    <li>
                      <Link to="/productwishlist">Product Wish List</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/">
                    <i className="fa fa-map-pin"></i>&nbsp;Brand
                  </Link>
                  <ul class="submenu">
                    <li>
                      <Link to="/brandlist">Brand List</Link>
                    </li>
                    <li>
                      <Link to="/addbrand">Add Brand</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/">
                    <i className="fas fa-user-alt"></i>&nbsp;Customers
                  </Link>
                  <ul class="submenu">
                    <li>
                      <a href="/customer/addnewcustomer">Add New Customer</a>
                    </li>
                    <li>
                      <a href="/addlistcustomer">Customer List</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/customer/address/list">
                    <i className="fa fa-address-book"></i>&nbsp;Analytics
                  </Link>
                  <ul class="submenu">
                    <li>
                      <a href="/addaddress">Add Address</a>
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
                  <Link to="/addcategoryfaq">
                    <i className="fa fa-map-pin"></i>&nbsp;FAQ
                  </Link>
                  <li>
                    <a href="/faqcategorylist">FAQ Category List</a>
                  </li>
                  <ul class="submenu">
                    <li>
                      <a href="/faqlist">FAQ List</a>
                      <a href="/addfaq">Add FAQ</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/">
                    <i className="fa fa-map-pin"></i>&nbsp;Master Management
                  </Link>
                  <ul class="submenu">
                    <li>
                      <a href="/cmslistpage">CMS Pages</a>
                      <a href="/cmseditpage">CMS Edit Page</a>
                    </li>
                    <li>
                      <a href="/settinglist">Setting</a>
                    </li>
                    <li>
                      <a href="/emailtemplatelist">Email Template List</a>
                      <a href="/editemail">Edit Email</a>
                    </li>
                    <li>
                      <a href="/newsletterlist">NewsLetter List</a>
                      <a href="/newslettertemplate">NewsLetter Template</a>
                      <a href="/sendnewsletter">Send NewsLetter</a>
                    </li>
                    <li>
                      <a href="/countrylist">Country List</a>
                      <a href="/addcountry">Add Country</a>
                    </li>
                    <li>
                      <a href="/customerlist">CMS</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="rightsidebar">
              <Routes>
                <Route
                  path="/customer/addnewcustomer"
                  element={<Customer_Addnewcustomer />}
                />
                <Route
                  path="/addlistcustomer"
                  element={<Customer_Customerlist />}
                />
                <Route path="/productlist" element={<Prodct_Productlist />} />
                <Route path="/addproduct" element={<Product_AddProduct />} />
                <Route
                  path="/addproductcategory"
                  element={<Product_AddProductCategory />}
                />
                <Route
                  path="/productcategorylist"
                  element={<Product_ProductCategoryList />}
                />
                <Route path="/brandlist" element={<Brand_BrandList />} />
                <Route path="/addbrand" element={<Brand_AddBrand />} />
                <Route path="/paymentlist" element={<Payment_Payment />} />
                <Route path="/coupencode" element={<Coupen_CoupenCode />} />
                <Route path="/customer/address/list" element={<Address_AddressList />} />
                <Route path="/addaddress" element={<Address_AddAddress />} />
                <Route path="/faqlist" element={<Faq_FAQList />} />
                <Route path="/addfaq" element={<Faq_AddFAQ />} />
                <Route
                  path="/addcategoryfaq"
                  element={<Faq_AddCategoryListFAQ />}
                />
                <Route
                  path="/faqcategorylist"
                  element={<Faq_AddCategoryList />}
                />
                <Route
                  path="/cmslistpage"
                  element={<Mastermange_CMSListpages />}
                />
                <Route path="/cmseditpage" element={<M_CMSEditpage />} />
                <Route path="/settinglist" element={<Master_SettingList />} />
                <Route
                  path="/productwishlist"
                  element={<Product_ProductWishList />}
                />
                <Route
                  path="/emailtemplatelist"
                  element={<Master_EmailList />}
                />
                <Route path="/editemail" element={<Master_EmailEdit />} />
                <Route
                  path="/newsletterlist"
                  element={<Master_NewsLetterList />}
                />
                <Route
                  path="/newslettertemplate"
                  element={<Master_EditNewsLetter />}
                />
                <Route
                  path="/sendnewsletter"
                  element={<Master_SendNewsLetter />}
                />
                <Route path="/countrylist" element={<Master_CountryList />} />
                <Route path="/addcountry" element={<Master_Country />} />
                <Route path="/statelist" element={<Master_StateList />} />
                <Route path="/addstate" element={<Master_State />} />
                <Route path="/citylist" element={<Master_CityList />} />
                <Route path="/addcity" element={<Master_City />} />
                <Route path="/customer/edit" element={<Customer_Editcustomer />} />
              </Routes>
            </div>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default App;
