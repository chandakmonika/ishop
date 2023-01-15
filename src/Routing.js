import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import LoginPage from "./Login";
import DashboardPage from "./Rout";
import DashboardHome from "./components/Dashboard";
import Coupen_CoupenCodeList from "./components/coupencode/Coupen_CoupenCodeList";
import Theme_HomeTheme from "./components/themes/Theme_HomeTheme";
import Theme_MenuTheme from "./components/themes/Theme_MenuTheme";
import ForgetPassword from "./ForgetPassword";
import Product_EditProduct from "./components/product/Product_EditProduct";
import Payment_getwayList from "./components/payment/Payment_getwayList";
import Payment_getwayEdit from "./components/payment/Payment_getwayEdit";
import Seo from "./components/Seo";
import PageNotFound from "./components/pagenotfound";
import Blog_AddBlog from "./components/blogs/Blog_AddBlog";
import Blog_BlogList from "./components/blogs/Blog_BlogList";
import Blog_EditBlog from "./components/blogs/Blog_EditBlog";
import Coupen_CoupenCodeEdit from "./components/coupencode/Coupen_CoupenCodeEdit";
import Master_AddCMS from "./components/mastermanagment/Master_AddCMS";
import Payment_PaymentGetwayAdd from "./components/payment/Payment_PaymentGetwayAdd";
import Master_EditSetting from "./components/mastermanagment/Master_EditSetting";
import Product_EditCategoryProduct from "./components/product/Product_EditCategoryProduct";

export default function RoutingPage() {
  // const token = localStorage.getItem("ACCESS_TOKEN")
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(1, location);
    // setTimeout(() => {
    if (
      localStorage.getItem("ACCESS_TOKEN") &&
      localStorage.getItem("ACCESS_TOKEN").length > 0
    ) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }

    // }, );
  }, [location]);

  return (
    <div>
      {/* {console.log(2,localStorage.getItem("ACCESS_TOKEN"),
            localStorage.getItem("ACCESS_TOKEN").length > 0)} */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />

        {isLoggedIn && (
          <Route element={<DashboardPage />}>
            <Route path="/home" element={<DashboardHome />} />
            <Route
              path="/customer/addnewcustomer"
              element={<Customer_Addnewcustomer />}
            />
            <Route
              path="/routing/customer/list"
              element={<Customer_Customerlist />}
            />
            <Route path="/product/list" element={<Prodct_Productlist />} />
            <Route
              path="/product/addproduct"
              element={<Product_AddProduct />}
            />
            <Route
              path="/product/editproduct/:product_id"
              element={<Product_EditProduct />}
            />
             <Route
              path="/product/category/edit/:category_id"
              element={<Product_EditCategoryProduct />}
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

            <Route path="/brand/edit/:brand_id" element={<Brand_EditBrand />} />

            <Route path="/payment/list" element={<Payment_Payment />} />

            <Route
              path="/coupencode/list"
              element={<Coupen_CoupenCodeList />}
            />

            <Route
              path="/coupencode/edit/:coupon_id"
              element={<Coupen_CoupenCodeEdit />}
            />

            <Route path="/coupencode/add" 
            element={<Coupen_CoupenCode />} />

            <Route
              path="/customer/address/list/:user_id"
              element={<Address_AddressList />}
            />
            <Route
              path="/customer/address/add/:user_id"
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

            <Route path="/mastermanagement/faq/add" element={<Faq_AddFAQ />} />
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
              path="/mastermanagement/cms/list"
              element={<Mastermange_CMSListpages />}
            />
            <Route
              path="/mastermanagement/cms/edit/:page_id"
              element={<M_CMSEditpage />}
            />
            <Route
              path="/mastermanagement/setting/list"
              element={<Master_SettingList />}
            />
             <Route
              path="/mastermanagement/setting/edit"
              element={<Master_EditSetting />}
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
              path="/mastermanagement/email/edit/:template_id"
              element={<Master_EmailEdit />}
            />

            <Route
              path="/mastermanagement/cms/list"
              element={<Mastermange_CMSListpages />}
            />

           <Route
              path="/mastermanagement/cms/addpage"
              element={<Master_AddCMS />}
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
              path="/mastermanagement/sendnewsletter/:template_id"
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

            <Route path="/order/orderlist/all" element={<Order_OrderList />} />
            <Route path="/order/orderlist/:user_id" element={<Order_OrderList />} />

            <Route
              path="/order/orderdetails/:order_id"
              element={<Order_OrderDetails />}
            />

            <Route path="/storedetails" element={<StoreDetails />} />

            <Route path="/account/subscrption" element={<Subscrption />} />

            <Route path="/hometheme" element={<Theme_HomeTheme />} />

            <Route path="/menutheme" element={<Theme_MenuTheme />} />

            <Route path="/paymentgetway/list" element={<Payment_getwayList />} />
            
            <Route path="/paymentgetway/add" element={<Payment_PaymentGetwayAdd />} />
            
            <Route path="/paymentgetway/edit/:payment_gateway_id" element={<Payment_getwayEdit />} />

            <Route path="/seo" element={<Seo />} />

            <Route path="/bloglist" element={<Blog_BlogList />} />

            <Route path="/addblog" element={<Blog_AddBlog />} />

            <Route path="/editblog/:blog_id" element={<Blog_EditBlog />} />
            <Route path="/hometheme" element={<Theme_HomeTheme />} />
            <Route path="/menutheme" element={<Theme_MenuTheme />} />

          </Route>
        )}
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </div>
  );
}


