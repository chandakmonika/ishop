import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Product_EditCategoryProduct() {
  // const [parent_category_id, setParent_category_id] = useState("");
  // const [category_name, setCategory_name] = useState("");
  // const [category_image, setCategory_image] = useState(null);
  // const [attributes_label, setAttributes_label] = useState("");
  // const [attributes_name, setAttributes_name] = useState("");
  // const [attributes_type, setAttributes_type] = useState("");
  // const [attributes_value, setAttributes_value] = useState("");
  // const [is_variant_key, setIs_variant_key] = useState("");
  const [attributes_group_name, setAttributes_group_name] = useState("");
  const [index, setIndex] = useState([]);
  // const navigate = useNavigate();

  const [userdata, setUser_data] = useState({
    parent_category_id: "",
    category_id: "",
    category_name: "",
    category_image: "",
    attributes: [
      {
        attributes_group_name: "",
        attributes_label: "",
        attributes_name: "",
        attributes_type: "",
        attributes_value: "",
        is_variant_key: "",
      },
    ],
  });
  const { category_id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/parentcategories`)
      .then((res) => setIndex(res.data.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/category/details/${category_id}`
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(989, getData);

        const groupsData = [];
        // if(getData.groups.length >0  ){
        getData.groups.forEach((grp) => {
          if (grp.attributes.length > 0) {
            grp.attributes.forEach((attr) => {
              groupsData.push({
                // ...grp,
                attributes_group_name: grp.group_title,
                attributes_label: attr.attributes_label,
                attributes_name: attr.attributes_name,
                attributes_type: attr.attributes_type,
                attributes_value: attr.attributes_value,
                is_variant_key: attr.is_variant_key,
              });
            });
          }
          else {
            groupsData.push({
              // ...grp,
              attributes_group_name: "",
              attributes_label: "",
              attributes_name: "",
              attributes_type: "",
              attributes_value: "",
              is_variant_key: "",
            });
          }
          // groupsData.push([...attrData]);
        });

        console.log(29, groupsData);
        setFormFields(groupsData);
        setUser_data(getData);
      });
  }, []);

  const handleChange = (e) => {
    console.log(123, e.target);
    setUser_data({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function handleCatEdit(e) {
    e.preventDefault();
    const editData = {
      category_id,
      parent_category_id: userdata.parent_category_id,
      category_name: userdata.category_name,
      attributes: formFields,
    };

    fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/category/edit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(editData),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        // toaster(resps, 'Product Updated Successfully!')
        // if(resps === true ){
        //     navigate("/product/category/list")
        // }
      });
    });
  }
  // const submit = (e) => {
  //   e.preventDefault();
  // };

  const [formFields, setFormFields] = useState([
    {
      attributes_label: "",
      attributes_name: "",
      attributes_type: "",
      attributes_value: "",
      is_variant_key: "",
      attributes_group_name: "",
    },
  ]);

  const handleAttributeChange = (e, index) => {
    let data = [...formFields];
    setFormFields(data);
    console.log("data", data);
    if (e.target.type === "select") {
      data[index][e.target.name] = e.target.checked ? "y" : "n";
    } else {
      data[index][e.target.name] = e.target.value;
    }
    setUser_data({
      ...userdata,
      attributes: data,
    });
  };

  const addFields = () => {
    let object = {
      attributes_label: "",
      attributes_name: "",
      attributes_type: "",
      attributes_value: "",
      is_variant_key: "",
      attributes_group_name: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h4>Edit Product Category</h4>
      <div class="card">
        <div class="card-body">
          <form  onSubmit={submit} >
            <div className="form-group" style={{ width: "30rem" }}>
              <label for="exampleFormControlSelect1">Product Category</label>
              {/* <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userdata.category_name}
                name="product_category "
              /> */}
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={userdata.category_id}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="category_id"
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

              <label className="demo">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userdata.category_name}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="category_name"
              />
            </div>

            {/* <---------------CustomerImage--------------> */}
            <h6>Product Category Image</h6>
            <div class="card" style={{ height: "auto", width: "30rem" }}>
              <div class="card-body">
                <div className="container" style={{ paddingTop: "38px" }}>
                  <h6>Media</h6>
                  <input
                    type="file"
                    // value={category_image}
                    onChange={(e) => {
                      // console.log(e?.target?.files[0])
                      // setCategory_image(e?.target?.files[0]);
                      handleChange(e?.target?.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
            <br />

            {/* <--------------------Dynamic Form---------------> */}
            <h6>Custom Attribute</h6>
            <div class="card" style={{ height: "auto" }}>
              <div class="card-body">
                {console.log(2, formFields)}
                {formFields.map((form, index) => {
                  return (
                    <div key={index}>
                      <label className="demo" style={{ width: "29rem" }}>
                        Group Name
                      </label>
                      <input
                        name="attributes_group_name"
                        value={form.attributes_group_name}
                        onChange={(e) => {
                          handleAttributeChange(e, index);
                        }}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Label
                      </label>
                      <input
                        name="attributes_label"
                        // placeholder='Field Label'
                        // onChange={(e) => handleAttributeChange(e, index)}
                        onChange={(e) => {
                          handleAttributeChange(e, index);
                        }}
                        value={form.attributes_label}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Name
                      </label>
                      <input
                        name="attributes_name"
                        onChange={(e) => {
                          handleAttributeChange(e, index);
                        }}
                        value={form.attributes_name}
                        style={{ width: "29rem" }}
                        disabled
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Type
                      </label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => {
                          handleAttributeChange(e, index);
                        }}
                        value={form.attributes_type}
                        name="attributes_type"
                        style={{ width: "29rem" }}
                      >
                        <option disabled></option>
                        <option value={"select"}>Select Box</option>
                        <option value={"text"}>Text Box</option>
                      </select>
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Field Value
                      </label>
                      <input
                        name="attributes_value"
                        onChange={(e) => {
                          handleAttributeChange(e, index);
                        }}
                        value={form.attributes_value}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demo" style={{ width: "29rem" }}>
                        Is_Variant_Key
                      </label>
                      <div>
                        <input
                          type="radio"
                          name="is_variant_key"
                          onChange={(e) => {
                            handleAttributeChange(e, index);
                          }}
                          checked={form.is_variant_key === "y"}
                          value="y"
                        />
                        Y &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="is_variant_key"
                          onChange={(e) => {
                            handleAttributeChange(e, index);
                          }}
                          checked={form.is_variant_key === "n"}
                          value="n"
                        />
                        N
                      </div>
                      <br />
                      <br />
                      <button
                        onClick={() => removeFields(index)}
                        disabled={index === 0}
                      >
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
            <div className="float-right">
              <Link to="/product/category/list">
                <button type="submit" class="btn btn-info" onClick={handleCatEdit}>
                  Update
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}