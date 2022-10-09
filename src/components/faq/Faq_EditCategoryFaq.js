import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Faq_EditCategoryFaq() {
  const [category_name, setCategory_name] = useState(""); 
  const [userdata, setUserdata] = useState({
    category_name: ""
    
  });
  const { faq_category_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/faq/categories/details/${faq_category_id}`
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        setUserdata(getData);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target);

    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function customerUser() {
    console.warn(category_name);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/faq/categories/edit/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(userdata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
      });
    });
  }
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h5 style={{ paddingLeft: "2rem" }}>FAQ Category Details</h5>
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
              <label className="demo">Category</label>
              <input
                type="text"
                className="form-control"
                name="category_name"
                placeholder="Enter First Name"
                value={userdata.category_name}
                onChange={handleChange}
              />
 
            </div>
            <Link to = "/mastermanagement/faq/category/list">
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
