import "./Product_AddProductCategory.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toaster } from "../../utils/toaster";
import { validateRequired } from "../../utils/form-validation";

export default function Product_AddProductCategory() {
  const storename = localStorage.getItem("USER_NAME")
  const [prodCategoryData, setProdCategoryData] = useState({
    parent_category_id: {
      value: "",
      error: ""
    },
    category_name: {
      value: "",
      error: ""
    },
    category_image: "",
    media_id: {
      id: '',
      previewImg: ''
    }
  });
  // const [category_image, setCategory_image] = useState("");
  // const [attributes_label, setAttributes_label] = useState("");
  // const [attributes_name, setAttributes_name] = useState("");
  // const [attributes_type, setAttributes_type] = useState("");
  // const [attributes_value, setAttributes_value] = useState("");
  // const [is_variant_key, setIs_variant_key] = useState("");
  // const [attributes_group_name, setAttributes_group_name] = useState("");
  // const [media_id, setMedia_id] = useState({
  //   id: '',
  //   previewImg: ''
  // })
  const [index, setIndex] = useState([]);

  const navigate = useNavigate();

  // <----------------Dynamic Form--------------->
  const [formFields, setFormFields] = useState([
    {
      attributes_label: "",
      attributes_name: "",
      attributes_type: "",
      attributes_value: "",
      is_variant_key: "",
      attributes_group_name: ""
    },
  ]);



  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/parentcategories`,{
        headers: {
          Accept: "application/json",
          "content-Type": "Application/json",
          storename: storename,
        }
      })
      .then((res) => setIndex(res.data.data));
  }, []);

  function productCategoryUser() {
    // console.warn(
    //   parent_category_id,
    //   category_name,
    //   category_image,
    //   attributes_group_name,
    //   attributes_label,
    //   attributes_name,
    //   attributes_type,
    //   attributes_value,
    //   is_variant_key
    // );

    const { parent_category_id, category_name } = prodCategoryData

    const productDataValidated = {
      ...prodCategoryData,
      parent_category_id: {
        value: parent_category_id.value,
        error: validateRequired(parent_category_id.value).error
      },
      category_name: {
        value: category_name.value,
        error: validateRequired(category_name.value).error
      }
    }

    setProdCategoryData(productDataValidated)

    const ErrorFields = Object.entries(productDataValidated).filter((err) => typeof err[1] === "object" && err[1].error)

    if (ErrorFields <= 0) {

      let data = {
        parent_category_id: Number(productDataValidated.parent_category_id.value),
        category_name: productDataValidated.category_name.value,
        category_image: productDataValidated.category_image,
        attributes: formFields,
        media_id: productDataValidated.media_id.id
      };

      console.log(9878, data)

      fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/category/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          storename: storename,
        },
        // body: formData,
        body: JSON.stringify(data)
      }).then((result) => {
        result.json().then((resp) => {
          console.warn("resp", resp);
          toaster(resp, 'Product Category Added Successfully!')
          if (resp === true) {
            navigate("/product/category/list")
          }
        });
      });
    } else {
      toaster({ message: "Please fill proper input data" })
    }
  }

  const handleInputFields = (e) => {
    setProdCategoryData({
      ...prodCategoryData,
      [e.target.name]: typeof prodCategoryData[e.target.name] === "object" ? {
        value: e.target.value,
        error: ''
      } : e.target.value
    })
  }

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



  // const handleImageUpload1 = (event) => {
  //   // setImgError('')
  //   const reader = new FileReader()
  //   const file = event.target.files
  //   const fieSize = Number((file[0]?.size / 1024 / 1024)?.toFixed(2))
  //   const extension = file[0]?.name?.substring(file[0]?.name?.lastIndexOf(".") + 1)?.toLowerCase()
  //   if (extension === "png" || extension === "jpeg" || extension === "jpg") {
  //     // if (fieSize <= (Number(process.env.ORGANIZATION_LOGO_MAX_SIZE) | imageSizeAccepted)) {
  //     //     if (file[0] !== undefined) {
  //     reader.onloadend = () => {
  //       console.log(fieSize, file, extension, file[0])
  //       setCategory_image({
  //         logoFile: file[0],
  //         imagePreviewUrl: reader.result
  //       })
  //     }
  //     reader.readAsDataURL(file[0])
  //     // }
  //     event.preventDefault()
  //     //     setEditLogo(true)
  //     // } else {
  //     //     setImgError("Please check image size")
  //     // }
  //   } else {
  //     // setImgError("Invalid image type")
  //   }
  // }

  const handleImageUpload = (e) => {
    const fileData = e.target.files[0]
    console.log(37, fileData, e.target.files, URL.createObjectURL(e.target.files[0]));

    // setCategory_image(fileData.lastModified.toString())
    setProdCategoryData({
      ...prodCategoryData,
      media_id: {
        id: fileData.lastModified.toString(),
        previewImg: URL.createObjectURL(fileData)
      },
      category_image: fileData.lastModified.toString()
    })
    // handleInputFields(e)
    // setMedia_id({
    //   id: fileData.lastModified.toString(),
    //   previewImg: URL.createObjectURL(fileData)
    // });
  }

  const inputFieldError = (error) => {
    if (error && error.length > 0) {
      return <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
    }

    return <></>
  }

  const redirectToErrorField = () => {
    const label = Object.entries(prodCategoryData).filter((err) => typeof err[1] === "object" && err[1].error)
    console.log(546, label, prodCategoryData )
    return label.length > 0 ? label[1][0] : ""
  }

  return (
    <div>
      <h4>Add Product Category</h4>
      <div class="card">
        <div class="card-body">
          <form enctype="multipart/form-data" onSubmit={submit}>
            <div className="form-group" style={{ width: "30rem" }}>
              <div>
                <label for="exampleFormControlSelect1">Product Category</label>
                <select
                  class="form-control"
                  id="parent_category_id"
                  value={prodCategoryData.parent_category_id.value}
                  onChange={(e) => handleInputFields(e)}
                  name="parent_category_id"
                  category
                >
                  <option value="">

                    Select Category
                  </option>
                  {index.map((item) => {
                    return (
                      <option value={item.category_id}>

                        {item.category_name}
                      </option>
                    );
                  })}
                </select>
                {inputFieldError(prodCategoryData.parent_category_id.error)}
              </div>
              <div>
                <label className="demo">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="category_name"
                  aria-describedby="emailHelp"
                  value={prodCategoryData.category_name.value}
                  onChange={(e) => handleInputFields(e)}
                  name="category_name"
                />
                {inputFieldError(prodCategoryData.category_name.error)}
              </div>
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

                      handleImageUpload(e)

                    }}

                  />
                  {prodCategoryData.media_id.previewImg && <img style={{ width: '100%', height: '250px' }} src={prodCategoryData.media_id.previewImg} alt="preview" />}
                  {/* <input
                    type="file"
                    name="category_image"
                    value={category_image}
                    onChange={(e) => {
                      console.log(e)
                      setCategory_image(e.target.files[0]);
                    }} */}
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
                      <label className="demos" style={{ width: "29rem" }}>
                        Group Name
                      </label>
                      <input
                        name="attributes_group_name"
                        onChange={(e) => {
                          handleFormChange(e, index);
                        }}

                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demos" style={{ width: "29rem" }}>
                        Field Label
                      </label>
                      <input
                        name="attributes_label"
                        // placeholder='Field Label'
                        // onChange={(e) => handleFormChange(e, index)}
                        onChange={(e) => {
                          handleFormChange(e, index);
                        }}
                        // value={attributes_label}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demos" style={{ width: "29rem" }}>
                        Field Name
                      </label>
                      <input
                        name="attributes_name"
                        onChange={(e) => {
                          handleFormChange(e, index);
                        }}
                        // value={attributes_name}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demos" style={{ width: "29rem" }}>
                        Field Type
                      </label>
                      {/* <input
                        name="attributes_type"
                        onChange={(e) => {
                          handleFormChange(e,index);
                        }}
                        // value={attributes_type}
                        style={{ width: "29rem" }}
                      /> */}
                      <select
                        class="demos"
                        id="exampleFormControlSelect1"

                        onChange={(e) => {
                          handleFormChange(e, index);
                        }}
                        name="attributes_type"
                        style={{ width: "29rem" }}

                      >
                        <option disabled></option>
                        <option>Select Box</option>
                        <option>Text Box</option>

                      </select>
                      <br />
                      <label className="demos" style={{ width: "29rem" }}>
                        Field Value
                      </label>
                      <input
                        name="attributes_value"
                        onChange={(e) => {
                          handleFormChange(e, index);
                        }}
                        // value={attributes_value}
                        style={{ width: "29rem" }}
                      />
                      <br />
                      <label className="demos" style={{ width: "29rem" }}>
                        Is_Variant_Key
                      </label>
                      {/* <div style={{ paddingRight: "30rem" }}> */}
                      <input
                        type="radio"
                        name={`is_variant_key`}
                        onChange={(e) => {
                          handleFormChange(e, index);
                        }}
                        value={"y"}
                      />
                      Y &nbsp;&nbsp;
                      <input
                        type="radio"
                        name={`is_variant_key`}
                        onChange={(e) => {
                          handleFormChange(e, index);
                        }}
                        value={"n"}
                      />
                      N
                      {/* </div> */}
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
            <div class="float-right">
              <a href={`#${redirectToErrorField()}`}>
                <button type="submit" class="btn btn-info" onClick={productCategoryUser}>
                  Add Product Category
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


