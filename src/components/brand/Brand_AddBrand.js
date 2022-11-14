import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Customer_Addnewcustomer() {
  const [product_category_id, setProduct_category_id] = useState("");
  const [brand_name, setBrand_name] = useState("");
  const [brand_image, setBrand_image] = useState("");
  const [status, setStatus] = useState("");
  const [index, setIndex] = useState([]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/parentcategories`)
      .then((res) => setIndex(res.data.data));
  }, []);

  function brandrUser() {
    console.warn(product_category_id, brand_name, brand_image, status);
    let datas = {
      product_category_id,
      brand_name,
      brand_image,
      status,
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/products/brands/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      result.json().then((response) => {
        console.warn("response", response);
      });
    });
  }
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Add New Brand</span>
      </h4>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />

          <h6 style={{ paddingLeft: "2rem" }}>Brand Details</h6>
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
                value={product_category_id}
                onChange={(e) => {
                  setProduct_category_id(e.target.value);
                }}
                name="product_category_id"
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

              <label className="demo">Brand Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Brand Name"
                value={brand_name}
                onChange={(e) => {
                  setBrand_name(e.target.value);
                }}
                name="brand_name"
              />

              <label className="demo">Brand Logo</label>
              <input
                type="file"
                name="brand_image"
                onChange={(e) => {
                  setBrand_image(e.target.value);
                }}
              />

              <label className="demo">Status</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="status"
                placeholder="Enter Status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>
            <Link to="/brand/list">
            <button type="button" class="btn btn-info" onClick={brandrUser}>
              Add Brand
            </button>
            </Link>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
