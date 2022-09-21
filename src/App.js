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
import Brand_EditBrand from "./components/brand/Brand_EditBrand";
import Master_NewsLetterSubscribtion from "./components/mastermanagment/Master_NewsLetterSubscribtion";
import Order_OrderList from "./components/order/Order_OrderList";
import Order_OrderDetails from "./components/order/Order_OrderDetails";
import Dashboard from "./components/Dashboard";
import StoreDetails from "./components/topnav/StoreDetails";
import Subscrption from "./components/topnav/Subscrption";
import Master_EditState from "./components/mastermanagment/Master_EditState";
import Master_EditCountry from "./components/mastermanagment/Master_EditCountry";
import FAQ_EditFAQ from "./components/faq/FAQ_EditFAQ";
import Master_EditCity from "./components/mastermanagment/Master_EditCity";
import Address_EditAddress from "./components/address/Address_EditAddress";
import Faq_EditCategoryFaq from "./components/faq/Faq_EditCategoryFaq";

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
                      <NavDropdown.Item>
                        <Link to="/dashboard">Setting</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/storedetails">Account</Link>
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
                  <Link to="/">
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
                  <Link to="">
                    <i className="fa fa-ad"></i>&nbsp;Delivery
                  </Link>
                  <ul class="submenu">
                    <li>
                      <a href="/mastermanagement/state/list">State List</a>
                    </li>
                    <li>
                      <a href="/mastermanagement/state/add">Add State</a>
                    </li>

                    <li>
                      <a href="/mastermanagement/city/list">City List</a>
                    </li>
                    <li>
                      <a href="/mastermanagement/city/add">Add City</a>
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
                  <Link to="/">
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
                      <a href="/customer/addnewcustomer">Add New Customer</a>
                    </li>
                    <li>
                      <a href="/customer/list">Customer List</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/customer/address/list">
                    <i className="fa fa-address-book"></i>&nbsp;Analytics
                  </Link>
                  <ul class="submenu">
                    <li>
                      <a href="/customer/address/add">Add Address</a>
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
                  <Link to="/">
                    <i className="fa fa-map-pin"></i>&nbsp;Master Management
                  </Link>
                  <ul class="submenu">
                    <li>
                      <a href="/mastermanagement/cms/listpage">CMS Pages</a>
                      <a href="/mastermanagement/cms/editpage">CMS Edit Page</a>
                    </li>
                    <li>
                      <a href="/mastermanagement/setting/list">Setting</a>
                    </li>
                    <li>
                      <a href="/mastermanagement/email/list">
                        Email Template List
                      </a>
                      <a href="/mastermanagement/email/edit">Edit Email</a>
                    </li>
                    <li>
                      <a href="/mastermanagement/newsletter/list">
                        NewsLetter List
                      </a>
                      {/* <a href="/mastermanagement/newslettertemplate">NewsLetter Template</a> */}
                      <a href="/mastermanagement/sendnewsletter">
                        Send NewsLetter
                      </a>
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
              <Routes>
                <Route
                  path="/customer/addnewcustomer"
                  element={<Customer_Addnewcustomer />}
                />
                <Route
                  path="/customer/list"
                  element={<Customer_Customerlist />}
                />
                <Route path="/product/list" element={<Prodct_Productlist />} />
                <Route
                  path="/product/addproduct"
                  element={<Product_AddProduct />}
                />
                <Route
                  path="/product/category/add"
                  element={<Product_AddProductCategory />}
                />
                <Route
                  path="/product/category/list"
                  element={<Product_ProductCategoryList />}
                />
                <Route path="/brand/list" element={<Brand_BrandList />} />
                <Route path="/brand/add" element={<Brand_AddBrand />} />
                <Route
                  path="/brand/edit/:brand_id"
                  element={<Brand_EditBrand />}
                />

                <Route path="/payment/list" element={<Payment_Payment />} />
                <Route path="/coupencode" element={<Coupen_CoupenCode />} />
                <Route
                  path="/customer/address/list"
                  element={<Address_AddressList />}
                />
                <Route
                  path="/customer/address/add"
                  element={<Address_AddAddress />}
                />
                <Route
                  path="/customer/address/edit/:address_id"
                  element={<Address_EditAddress />}
                />
                <Route
                  path="/mastermanagement/faq/list"
                  element={<Faq_FAQList />}
                />
                <Route path="/faq/edit/:faq_id" element={<FAQ_EditFAQ />} />
                <Route
                  path="/mastermanagement/faq/add"
                  element={<Faq_AddFAQ />}
                />
                <Route
                  path="/mastermanagement/faq/category/add"
                  element={<Faq_AddCategoryListFAQ />}
                />

                <Route
                  path="/mastermanagement/faq/category/edit/:faq_category_id"
                  element={<Faq_EditCategoryFaq />}
                />
                <Route
                  path="/mastermanagement/faq/category/list"
                  element={<Faq_AddCategoryList />}
                />
                <Route
                  path="/mastermanagement/cms/listpage"
                  element={<Mastermange_CMSListpages />}
                />
                <Route
                  path="/mastermanagement/cms/editpage"
                  element={<M_CMSEditpage />}
                />
                <Route
                  path="/mastermanagement/setting/list"
                  element={<Master_SettingList />}
                />
                <Route
                  path="/product/wishlist"
                  element={<Product_ProductWishList />}
                />
                <Route
                  path="/mastermanagement/email/list"
                  element={<Master_EmailList />}
                />
                <Route
                  path="/mastermanagement/email/edit"
                  element={<Master_EmailEdit />}
                />
                <Route
                  path="/mastermanagement/newsletter/list"
                  element={<Master_NewsLetterList />}
                />
                <Route
                  path="/mastermanagement/newsletter/template"
                  element={<Master_EditNewsLetter />}
                />
                <Route
                  path="/mastermanagement/newslettersubscribtion"
                  element={<Master_NewsLetterSubscribtion />}
                />
                <Route
                  path="/mastermanagement/sendnewsletter"
                  element={<Master_SendNewsLetter />}
                />
                <Route
                  path="/mastermanagement/country/list"
                  element={<Master_CountryList />}
                />
                <Route
                  path="/mastermanagment/country/edit/:country_id"
                  element={<Master_EditCountry />}
                />
                <Route
                  path="/mastermanagement/country/add"
                  element={<Master_Country />}
                />
                <Route
                  path="/mastermanagement/state/list"
                  element={<Master_StateList />}
                />
                <Route
                  path="/mastermanagement/state/add"
                  element={<Master_State />}
                />

                <Route
                  path="/mastermanagement/state/edit/:state_id"
                  element={<Master_EditState />}
                />
                <Route
                  path="/mastermanagement/city/list"
                  element={<Master_CityList />}
                />
                <Route
                  path="/mastermanagement/city/add"
                  element={<Master_City />}
                />

                <Route
                  path="/mastermanagement/city/edit/:city_id"
                  element={<Master_EditCity />}
                />
                <Route
                  path="/customer/edit/:user_id"
                  element={<Customer_Editcustomer />}
                />
                <Route path="/order/orderlist" element={<Order_OrderList />} />
                <Route
                  path="/order/orderdetails"
                  element={<Order_OrderDetails />}
                />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/storedetails" element={<StoreDetails />} />
                <Route path="/account/subscrption" element={<Subscrption />} />
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
