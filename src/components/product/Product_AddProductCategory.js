import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Product_AddProductCategory.css";

export default function Product_AddProductCategory() {
  const [parent_category_id, setParent_category_id] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [category_image, setCategory_image] = useState("");
  const [attributes_label, setAttributes_label] = useState("");
  const [attributes_name, setAttributes_name] = useState("");
  const [attributes_type, setAttributes_type] = useState("");
  const [attributes_value, setAttributes_value] = useState("");
  const [is_variant_key, setIs_variant_key] = useState("");
  const [attributes_group_name, setAttributes_group_name] = useState("");
  const [index, setIndex] = useState([]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/products/parentcategories`)
      .then((res) => setIndex(res.data.data));
  }, []);

  function customerUser() {
    console.warn(
      parent_category_id,
      category_name,
      category_image,
      attributes_group_name,
      attributes_label,
      attributes_name,
      attributes_type,
      attributes_value,
      is_variant_key
    );
    let data = {
      parent_category_id,
      category_name,
      category_image,
      attributes_group_name,
      attributes_label,
      attributes_name,
      attributes_type,
      attributes_value,
      is_variant_key,
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/products/category/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
      
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("resp", resp);
      });
    });
  }

  // <----------------Dynamic Form--------------->
  const [formFields, setFormFields] = useState([
    { fieldlabel: "", fieldname: "", fieldtype: "", fieldvalue: "" },
  ]);

  const handleFormChange = (e, index) => {
    let data = [...formFields];
    data[index][e.target.name] = e.target.value;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  const addFields = () => {
    let object = {
      fieldlabel: "",
      fieldname: "",
      fieldtype: "",
      fieldvalue: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  return (
    <div>
      <h4>Add Product Category</h4>
      <div class="card">
        <div class="card-body">
          <form enctype="multipart/form-data" onSubmit={submit}>
            <div className="form-group" style={{ width: "30rem" }}>
              <label for="exampleFormControlSelect1">Product Category</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={parent_category_id}
                onChange={(e) => {
                  setParent_category_id(e.target.value);
                }}
                name="parent_category_id"
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
              <label className="demo">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={category_name}
                onChange={(e) => {
                  setCategory_name(e.target.value);
                }}
                name="category_name"
              />
            </div>

            {/* <---------------CustomerImage--------------> */}
            <h6>Customer Image</h6>
            <div class="card" style={{ height: "auto", width: "30rem" }}>
              <div class="card-body">
                <div className="container" style={{ paddingTop: "38px" }}>
                  <h6>Media</h6>

                  <input
                    type="file"
                    name="category_image"
                    onChange={(e) => {
                      setCategory_image(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <br />

            {/* <--------------------Dynamic Form---------------> */}
            <h6>Custom Attribute</h6>
            <div class="card" style={{ height: "auto", width: "60rem" }}>
              <div class="card-body">
                {formFields.map((form, index) => {
                  return (
                    <div key={index}>
                      <label className="demo" style={{ width: "29rem" }}>
                        Group Name
                      </label>
                      <input
                        name="attributes_group_name"
                        // placeholder='Field Label'
                        // onChange={(e) => handleFormChange(e, index)}
                        onChange={(e) => {
                          setAttributes_group_name(e.target.value);
                        }}
                        // value={attributes_label}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Label
                      </label>
                      <input
                        name="attributes_label"
                        // placeholder='Field Label'
                        // onChange={(e) => handleFormChange(e, index)}
                        onChange={(e) => {
                          setAttributes_label(e.target.value);
                        }}
                        // value={attributes_label}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Name
                      </label>
                      <input
                        name="attributes_name"
                        onChange={(e) => {
                          setAttributes_name(e.target.value);
                        }}
                        // value={attributes_name}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Type
                      </label>
                      <input
                        name="attributes_type"
                        onChange={(e) => {
                          setAttributes_type(e.target.value);
                        }}
                        // value={attributes_type}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Value
                      </label>
                      <input
                        name="attributes_value"
                        onChange={(e) => {
                          setAttributes_value(e.target.value);
                        }}
                        // value={attributes_value}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Is_Variant_Key
                      </label>
                      <div style={{ paddingRight: "30rem" }}>
                        <input
                          type="radio"
                          name="is_variant_key"
                          onChange={(e) => {
                            setIs_variant_key(e.target.value);
                          }}
                          // value={is_variant_key}
                        />
                        Y &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="is_variant_key"
                          onChange={(e) => {
                            setIs_variant_key(e.target.value);
                          }}
                          // value={is_variant_key}
                        />
                        N
                      </div>
                      <br />
                      <br />
                      <button onClick={() => removeFields(index)}>
                        Remove
                      </button>
                      &nbsp;
                      <button onClick={addFields}>Add More..</button>
                      <br />
                      
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <--------------------Dynamic Form end------------------> */}
            <br />
            <div style={{ paddingLeft: "55rem" }}>
              <button type="submit" class="btn btn-info" onClick={customerUser}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

