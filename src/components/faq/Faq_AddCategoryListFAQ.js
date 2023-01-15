import React, { useState } from "react";

export default function Faq_AddCategoryListFAQ() {
  const storename = localStorage.getItem("USER_NAME")
  const [category_name, setCategory_name] = useState("");
  function customerUser() {
    console.warn(category_name);
    let datas = { category_name };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/faq/categories/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
      },
      body: JSON.stringify(datas),
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
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Add FAQ Category</span>
      </h4>
      <br />

      <div className="card" style={{ paddingLeft: "2rem", width: "68rem" }}>
        <br />
        <form onSubmit={submit} style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "50%" }}
          >
            <label className="demo">Category</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add Category"
              value={category_name}
              onChange={(e) => {
                setCategory_name(e.target.value);
              }}
              name="category_name"
            />
            <br />
          </div>

          <button type="button" class="btn btn-info" onClick={customerUser}>
            Submit
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}
