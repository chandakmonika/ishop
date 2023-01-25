import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { toaster } from "../../utils/toaster";

export default function Brand_EditBrand() {
  const storename = localStorage.getItem("USER_NAME")
  const [brand_name, setBrand_name] = useState("");
  const [product_category_id, setProduct_category_id] = useState("");
  const [brand_image, setBrand_image] = useState("");
  const [status, setStatus] = useState("");
  const [index, setIndex] = useState([]);
  const [userdata, setUser_data] = useState({
    brand_name: "",
    product_category_id: "",
    brand_image: "",
    status: "",
  });

  const navigate = useNavigate();


  const { brand_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/parentcategories`)
      .then((res) => setIndex(res.data.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/products/brands/details/${brand_id}`
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        setUser_data(getData);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target);

    setUser_data({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function customerUser() {
    console.warn(brand_name, product_category_id, brand_image, status);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/products/brands/edit/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
      },
      body: JSON.stringify(userdata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        toaster(resps, 'Brand Updated Successfully!')
        if(resps === true ){
            navigate("/brand/list")
        }
      });
    });
  }
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Edit Brand</span>
      </h4>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />
          <form
            onSubmit={submit}
            style={{ Display: "float-right", paddingLeft: "2rem" }}
          >
            <div
              className="form-group"
              controlId="formBasicFirstName"
              style={{ width: "40%" }}
            >
              <label for="exampleFormControlSelect1">Category Name</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={userdata.product_category_id}
                onChange={handleChange}
                name="product_category_id"
                category
              >
                  <option value="">Select Category</option>
                {index.map((item) => {
                  return (
                    <option value={item.category_id}>
                      {item.category_name}
                    </option>
                  );
                })}
              </select>

              <label className="demo">Brand Name</label>
              <input
                type="text"
                className="form-control"
                name="brand_name"
                placeholder="Enter Brand Name"
                value={userdata.brand_name}
                onChange={handleChange}
              />

              <label className="demo">Brand Logo</label>
              <input
                type="file"
                className="form-control"
                name="brand_image"
                value={userdata.brand_image}
                onChange={handleChange}
              />

              <label for="exampleFormControlSelect1">Status</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="status"
                value={userdata.status}
                onChange={handleChange}
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>
            <Link to="/brand/list">
              <button type="button" class="btn btn-info" onClick={customerUser}>
                Update 
              </button>
              &nbsp;
            </Link>
          </form>

          <br />
        </div>
      </div>
    </div>
  );
}
