import React, { useState, useEffect } from "react";
import Product_Editor from "./Product_Editor";
import axios from "axios";
import "./Product_AddProduct.css";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../utils/toaster";
const config = {
  buttons: [
    "bold",
    "italic",
    "underline",
    "link",
    "unlink",
    "source",
    "paragraph",
    "image",
    "video",
    "table",
    "search",
    "file",
    "preview",
    "align",
    "undo",
    "redo",
    "fullsize",
    "dots",
    "copyformat",
    "hr",
    "brush",
    "fontsize",
  ],
};

export default function Product_AddProduct() {
  // const [value, setValue] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  // const [product_name, setProduct_name] = useState("");
  // const [category_id, setCategory_id] = useState("");
  // const [brand, setBrand] = useState("");
  // const [variants, setVariants] = useState("");
  // const [model_number, setModel_number] = useState("");
  // const [product_short_desc, setProduct_short_desc] = useState("");
  // const [product_long_desc, setProduct_long_desc] = useState("");
  // const [product_image, setProduct_image] = useState("");
  // const [product_other_images, setProduct_other_images] = useState("");
  // const [product_qty, setProduct_qty] = useState("");
  // const [sku, setSku] = useState("");
  // const [price_base, setPrice_base] = useState("");
  // const [price_sell, setPrice_sell] = useState("");
  // const [price_mrp, setPrice_mrp] = useState("");
  // const [product_tags, setProduct_tags] = useState("");
  // const [product_seo_title, setProduct_seo_title] = useState("");
  // const [product_seo_description, setProduct_seo_description] = useState("");
  // const [product_seo_keywords, setProduct_seo_keywords] = useState("");
  // const [index, setIndex] = useState([]);
  const [selectSubCatData, setSelectSubCatData] = useState([]);
  const [prodAttributeInput, setProdAttributeInput] = useState([]);
  const [varientFormFields, setVarientFormFields] = useState([]);
  // const [prodVarientInput, setProdVarientInput] = useState([]);
  const [prodFaqInput, setProdFaqInput] = useState([
    {
      questions: "",
      answers: "",
    },
  ]);
  const [productInputData, setProductInputData] = useState({
    product_name: "",
    parent_category_id: "",
    category_id: "",
    brand: "",
    // brand_id: 0,
    model_number: "",
    product_short_desc: "",
    product_long_desc: "",
    product_image: [],
    product_status: "1",
    product_qty: "",
    attributes: [],
    faq: [],
    sku: "",
    price_base: "",
    price_sell: "",
    price_mrp: "",
    product_tags: "",
    product_seo_title: "",
    product_seo_description: "",
    product_seo_keywords: "",
    product_weight: "",
    variants: [],
  });
  // useEffect(() => {
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/product/add`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "Application/json",
  //         storename: "kbtrends",
  //       },
  //     })
  //     .then((res) => setIndex(res.data.data));
  // }, []);

  const navigate = useNavigate();

  function productUser() {
    const productData = {
      ...productInputData,
      // brand: productInputData.brand_id.toString(),
    };
    fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "Application/json",
        storename: "kbtrends",
      },
      body: JSON.stringify(productData),
    })
      .then((result) => {
        result.json().then((response) => {
          toaster(response, "Product Added Successfully!");
          if (response === true) {
            navigate("/product/list?page=1");
          }
          console.warn("response", response);
        });
      })
      .catch((err) => {
        console.log(32324, err);
        // toast.error(err.message)
      });
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/categorieswithsubcategories`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "Application/json",
            storename: "kbtrends",
          },
          // body: JSON.stringify(productInputData),
        }
      )
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleImageUpload(e) {
    const fileData = [...e.target.files];
    console.log(
      37,
      fileData,
      e.target.files,
      URL.createObjectURL(e.target.files[0])
    );
    const media = fileData.map((file, i) => {
      return {
        media_id: file.lastModified.toString(),
        media_name: file.name,
        media_file: URL.createObjectURL(e.target.files[i]),
      };
    });
    console.log(56, media);

    setMediaFiles(media);
    setProductInputData({
      ...productInputData,
      product_image: media.map((file) => {
        return {
          media_id: file.media_id,
        };
      }),
    });
  }
  const productInputChange = (e, inputField, inputName) => {
    if (inputField === "editor") {
      setProductInputData({
        ...productInputData,
        [inputName]: e,
      });
    } else if (inputField === "parent_cat_id") {
      setProductInputData({
        ...productInputData,
        [inputName]: e.toString(),
      });
    } else {
      setProductInputData({
        ...productInputData,
        [e.target.name]: e.target.value,
      });
    }
  };
  // <----------------Dynamic Form--------------->

  const handleVarientFormChange = (fieldName, e, index, itemIndex) => {
    const finatm = varientFormFields.map((prodRow, i) => {
      if (i === index) {
        // row index
        const inputFieldList = prodRow.map((inputField, j) => {
          if (fieldName === "inventory") {
            return {
              ...inputField,
              product_qty: e.target.value,
              attributes_id: inputField?.attribute_id,
              product_price: inputField?.product_price,
            };
          }
          if (fieldName === "price") {
            return {
              ...inputField,
              product_price: e.target.value,
              attributes_id: inputField?.attribute_id,
              product_qty: inputField?.product_qty,
            };
          }
          if (j === itemIndex) {
            // column index
            return {
              ...inputField,
              value: e.target.value,
              attributes_id: inputField?.attribute_id,
              product_qty: inputField?.product_qty,
              product_price: inputField?.product_price,
            };
          }
          return inputField;
        });
        return inputFieldList;
      }
      return prodRow;
    });

    setVarientFormFields(finatm);
    const fin = finatm.map((varient) => {
      return varient.map((vs) => {
        return {
          attributes_id: vs.attributes_id.toString(),
          attributes_value: vs.value,
          product_qty: vs?.product_qty,
          product_price: vs?.product_price,
        };
      });
    });
    setProductInputData({
      ...productInputData,
      variants: fin,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(varientFormFields);
  };

  const addVarientFields = () => {
    const finalAddObject = selectSubCatData.variants_fields.map((vr) => {
      return {
        ...vr,
        product_qty: "",
        product_price: "",
      };
    });
    setVarientFormFields([...varientFormFields, finalAddObject]);
  };
  const removeVarientFields = (index) => {
    let data = [...varientFormFields];
    data.splice(index, 1);
    setVarientFormFields(data);
  };

  const addFaqFields = () => {
    let object = {
      questions: "",
      answers: "",
    };

    setProdFaqInput([...prodFaqInput, object]);
  };
  const removeFaqFields = (index) => {
    let data = [...prodFaqInput];
    data.splice(index, 1);
    setProdFaqInput(data);
  };

  const handleSubCategoryClick = (e) => {
    console.log(897, e.target.value);
    setProductInputData({
      ...productInputData,
      category_id: e.target.value,
    });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/category/attributeswithbrand?category_id=${e.target.value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "Application/json",
            storename: "kbtrends",
          },
        }
      )

      .then((res) => {
        setProdAttributeInput(res.data.category_attrbutes);
        setVarientFormFields([...varientFormFields, res.data.variants_fields]);
        setSelectSubCatData(res.data);
      });
  };

  const handleAttributeInputChange = (e) => {
    const prodAttrData = prodAttributeInput.map((attr) => {
      if (e.target.name === attr.attributes_label) {
        attr.value = e.target.value;
      }
      return attr;
    });
    setProdAttributeInput(prodAttrData);
    const attrDatas = prodAttrData.map((attr) => {
      return {
        attributes_id: attr.attribute_id.toString(),
        attributes_value: attr.value,
      };
    });

    setProductInputData({
      ...productInputData,
      attributes: attrDatas,
    });
  };

  const productFaqChange = (e, index) => {
    const faqData = prodFaqInput.map((faq, faqIndex) => {
      if (index === faqIndex) {
        return {
          ...faq,
          [e.target.name]: e.target.value,
        };
      } else {
        return faq;
      }
    });
    setProdFaqInput(faqData);

    setProductInputData({
      ...productInputData,
      faq: faqData,
    });
  };

  return (
    <div>
      <div>
        <div class="py-4">
          {console.log(6756, varientFormFields)}
          <div class="d-flex justify-content-between">
            <div class="">
              <button type="button" class="btn ">
                <i class="fas fa-arrow-left"></i>
              </button>
              <span>Add Product</span>
            </div>
            <div>
              <button type="button" class="btn btn-info float-right">
                Add Product
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={submit}>
          <div className="form-group" controlId="formBasicFirstName">
            <div class="row">
              <div className="col-lg-8 col-mb-8">
                {/* <-----------------------------------Title From------------------------> */}
                {/* <div
            class="col-lg-4 col-md-12 mb-4 mb-lg-0"
            style={{ paddingLeft: "1rem" }}
          > */}
                {/* <div class="card" style={{ height: "40rem", width: "50rem" }}> */}
                <div class="card">
                  <div class="card-body">
                    <div className="form-group">
                      <label for="exampleInputPassword1" className="form-label">
                        Title
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={productInputData.product_name}
                        onChange={(e) => {
                          productInputChange(e);
                        }}
                        name="product_name"
                      />
                    </div>
                    <h6>Product Short Discription</h6>
                    <Product_Editor
                      setValue={(e) =>
                        productInputChange(e, "editor", "product_short_desc")
                      }
                      config={config}
                    />
                    <br />
                    <div></div>
                    <h6>Product Long Discription</h6>
                    <Product_Editor
                      setValue={(e) =>
                        productInputChange(e, "editor", "product_long_desc")
                      }
                      config={config}
                    />
                  </div>
                </div>
                <br />
                {/* <---------------------------------Title From End------------------------------------------> */}

                {/* <---------------------------------Media From----------------------------------> */}
                {/* <div class="card" style={{ height: "24rem", width: "50rem" }}> */}
                <div class="card">
                  <div class="card-body">
                    <div className="container">
                      <h5>Media</h5>
                      <div className="add">
                        <input
                          type="file"
                          id="files"
                          name="files"
                          onChange={handleImageUpload}
                          multiple
                        />
                        {mediaFiles.map((file) => (
                          <img src={file.media_file} width={250} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <--------------------------------------Product Status From Start---------------------------------> */}
              <div class="col-lg-4 col-mb-4">
                <div class="card">
                  <div class="card-body">
                    <div className="form-group">
                      <label for="exampleFormControlSelect1">
                        Product Status
                      </label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                        name="product_status"
                        value={productInputData.product_status}
                        onChange={(e) => productInputChange(e)}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                      <br />
                    </div>
                  </div>
                </div>
                <br />
                {/* <---------------------------------Product Status From End------------------------------------------> */}

                {/* <-----------------------------------Product Organization From Start--------------------------------------> */}

                <div class="card">
                  <div class="card-body">
                    <h5>Product Categories</h5>
                    <br />

                    <p>Category</p>
                    <div class="list-group">
                      {categoryData &&
                        categoryData.length > 0 &&
                        categoryData.map((cat) => {
                          return (
                            <div className="category-item">
                              <div key={`category${cat.category_id}`}>
                                <input
                                  type="checkbox"
                                  id={cat.category_slug}
                                  name="parent_category_id"
                                  value={productInputData.category_id}
                                  checked={cat.isChecked ? "checked" : false}
                                  onChange={(e) => {
                                    productInputChange(e);
                                    const checkedData = categoryData.map(
                                      (d) => {
                                        if (d.category_id === cat.category_id) {
                                          productInputChange(
                                            cat.category_id,
                                            "parent_cat_id",
                                            "parent_category_id"
                                          );
                                          return {
                                            ...d,
                                            isChecked: e.target.checked,
                                          };
                                        } else {
                                          return {
                                            ...d,
                                            isChecked: false,
                                          };
                                        }
                                      }
                                    );
                                    setCategoryData(checkedData);
                                  }}
                                />
                                <label for={cat.category_slug}>
                                  {cat.isChecked ? (
                                    <span> - </span>
                                  ) : (
                                    <span> + </span>
                                  )}
                                  <span>{cat.category_name} </span>
                                </label>
                                {cat.isChecked && (
                                  <div
                                    class="list-group"
                                    style={{ paddingLeft: "2rem" }}
                                  >
                                    {cat.subcategories.map((subCat) => {
                                      return (
                                        <div
                                          key={`sub-category${subCat.category_id}`}
                                        >
                                          <input
                                            type="radio"
                                            id={subCat.category_slug}
                                            name="sub-category-list"
                                            value={subCat.category_id}
                                            onChange={(e) =>
                                              handleSubCategoryClick(e)
                                            }
                                          />
                                          <label for={subCat.category_slug}>
                                            {subCat.category_name}
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <br />
                    <br />
                    {selectSubCatData.brands &&
                      selectSubCatData.brands.length > 0 && (
                        <div>
                          <p>Brand</p>
                          <div className="list-group">
                            {selectSubCatData.brands.map((brand) => {
                              return (
                                <div key={`sub-category${brand.brand_id}`}>
                                  {/* <a
                                          href="#"
                                          class="list-group-item"
                                          style={{ border: "none" }}
                                        > */}
                                  <input
                                    type="radio"
                                    id={brand.brand_name}
                                    name="brand"
                                    value={brand.brand_id}
                                    onChange={(e) => productInputChange(e)}
                                  />
                                  <label for={brand.brand_name}>
                                    {brand.brand_name}
                                  </label>
                                  {/* </a> */}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    <br />

                    <div className="form-group">
                      <label className="demo">Tags</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={productInputData.product_tags}
                        onChange={(e) => {
                          productInputChange(e);
                        }}
                        name="product_tags"
                      />
                      <br />
                      <button type="button" class="btn btn-info">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <---------------------------------Media From End------------------------------------------> */}
          </div>
          <br />
          {/* <-----------------------------------Product Organization From End--------------------------------------> */}

          {/* <-----------------------Product Information From Start-------------------------------> */}

          <div class="card" style={{ height: "13rem" }}>
            <div class="card-body">
              <h5>Product Information</h5>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-3">
                    <label className="demo">SKU</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      // aria-describedby="emailHelp"
                      value={productInputData.sku}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="sku"
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="demo">Model Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      // aria-describedby="emailHelp"
                      value={productInputData.model_number}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="model_number"
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="demo">Product Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={productInputData?.product_qty}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="product_qty"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          {/* <-----------------------Product Information From End-------------------------------> */}

          {/* <--------------------------------Pricing From start-----------------------------------> */}

          <div class="card" style={{ height: "11rem" }}>
            <div class="card-body">
              <h5>Pricing</h5>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="demo">Base Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={productInputData.price_base}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="price_base"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="demo">Original Price</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={productInputData.price_mrp}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="price_mrp"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="demo">Selling Price</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={productInputData.price_sell}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="price_sell"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* <--------------------------------Pricing From End-----------------------------------> */}

          {/* <---------------------------------------Shipping Information From Start-----------------------------------> */}

          <div class="card" style={{ height: "11rem" }}>
            <div class="card-body">
              <h5>Shipping Information</h5>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="demo">Shipping Charges</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={productInputData.shipping_charges}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="shipping_charges"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="demo">Product Weight</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={productInputData.product_weight}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="product_weight"
                    />
                  </div>                 
                </div>
              </div>
            </div>
          </div><br/>

          {/* <------------------------------------Shipping Information From End------------------------------> */}

          {/* <-----------------------Tax Information From Start--------------------------------> */}

          <div class="card" style={{ height: "11rem" }}>
            <div class="card-body">
              <h5>Tax Information</h5>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <label className="demo">Tax Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={productInputData.tax_amount}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="tax_amount"
                    />
                  </div>          
                </div>
              </div>
            </div>
          </div>

          {/* <---------------------------Tax Information From End-------------------------------> */}

          {/* <-----------------------Product Attribute From Start-------------------------------> */}

          {selectSubCatData.category_attrbutes &&
            selectSubCatData.category_attrbutes.length > 0 && (
              <div class="card">
                <div class="card-body">
                  <h5>Product Attribute</h5>
                  {selectSubCatData.category_attrbutes.map((attr) => {
                    return (
                      <div class="form-group row">
                        <label for="inputColor" class="col-sm-2 col-form-label">
                          {attr.attributes_label}
                        </label>
                        <div class="col-sm-4">
                          {attr.attributes_type === "select" ? (
                            <select
                              name={attr.attributes_label}
                              id={attr.attributes_label}
                              onChange={(e) => handleAttributeInputChange(e)}
                            >
                              {attr.attributes_value.split(",").map((opt) => (
                                <option value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              class="form-control"
                              name={attr.attributes_label}
                              id={attr.attributes_label}
                              placeholder=""
                              onChange={(e) => handleAttributeInputChange(e)}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          <br />
          {/* <-----------------------Product Attribute From End-------------------------------> */}

          {/* <--------------------Dynamic Form---------------> */}
          {selectSubCatData.variants_fields &&
            selectSubCatData.variants_fields.length > 0 && (
              <div class="card" style={{ height: "auto" }}>
                <div class="card-body">
                  <h5>Product Varient</h5>
                  <div>
                    <table class="table table-bordered">
                      <thead>
                        {selectSubCatData.variants_fields.map((item) => (
                          <th scope="col">{item.attributes_label}</th>
                        ))}
                        <th scope="col">Inventory</th>
                        <th scope="col">Price</th>
                      </thead>

                      <tbody>
                        {varientFormFields.map((form, index) => {
                          return (
                            <tr key={index}>
                              {form.map((field, fieldIndex) => (
                                <td>
                                  {field.attributes_type === "select" ? (
                                    <select
                                      id="product_varient_input"
                                      className="form-control"
                                      placeholder={field.attributes_label}
                                      onChange={(e) => {
                                        handleVarientFormChange(
                                          "product_varient_input",
                                          e,
                                          index,
                                          fieldIndex
                                        );
                                      }}
                                    >
                                      <option value="">
                                        select {field.attributes_label}
                                      </option>
                                      {field.attributes_value
                                        .split(",")
                                        .map((attrOption) => (
                                          <option value={attrOption}>
                                            {attrOption}
                                          </option>
                                        ))}
                                    </select>
                                  ) : (
                                    <input
                                      type="text"
                                      p
                                      placeholder={field.attributes_label}
                                      onChange={(e) => {
                                        handleVarientFormChange(
                                          "product_varient_input",
                                          e,
                                          index,
                                          fieldIndex
                                        );
                                      }}
                                      value={field.value ? field.value : ""}
                                      className="form-control"
                                      id="product_varient_input"
                                      aria-describedby="emailHelp"
                                    />
                                  )}
                                </td>
                              ))}
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inventory"
                                  aria-describedby="inventory"
                                  onChange={(e) => {
                                    handleVarientFormChange(
                                      "inventory",
                                      e,
                                      index
                                    );
                                  }}
                                  value={form[index]?.product_qty}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="price"
                                  aria-describedby="price"
                                  onChange={(e) => {
                                    handleVarientFormChange("price", e, index);
                                  }}
                                  value={form[index]?.product_price}
                                />
                              </td>
                              <button
                                className="pt-1"
                                onClick={() => removeVarientFields(index)}
                                style={{ marginLeft: "1rem" }}
                              >
                                Remove
                              </button>
                            </tr>
                          );
                        })}
                      </tbody>
                      <button
                        onClick={addVarientFields}
                        style={{ marginLeft: "48rem" }}
                      >
                        Add More..
                      </button>
                      <br />
                    </table>
                  </div>
                </div>
              </div>
            )}
          <br />
          {/* <--------------------Dynamic Form end------------------> */}

          {/* <--------------------------------Pricing From start-----------------------------------> */}

          <div class="card" style={{ height: "auto" }}>
            <div class="card-body">
              <h5>SEO</h5>
              <div class="form-group row">
                <label for="inputColor" class="col-sm-2 col-form-label">
                  Meta Tags
                </label>
                <div class="col-sm-4">
                  <input
                    type="text"
                    class="form-control"
                    id="inputColor"
                    placeholder="Meta Tags"
                    value={productInputData.product_seo_title}
                    onChange={(e) => {
                      productInputChange(e);
                    }}
                    name="product_seo_title"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputColor" class="col-sm-2 col-form-label">
                  Description
                </label>
                <div class="col-sm-4">
                  <input
                    type="text"
                    class="form-control"
                    id="inputColor"
                    placeholder="Description"
                    value={productInputData.product_seo_description}
                    onChange={(e) => {
                      productInputChange(e);
                    }}
                    name="product_seo_description"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputColor" class="col-sm-2 col-form-label">
                  Keyword
                </label>
                <div class="col-sm-4">
                  <input
                    type="text"
                    class="form-control"
                    id="inputColor"
                    placeholder="Keyword"
                    value={productInputData.product_seo_keywords}
                    onChange={(e) => {
                      productInputChange(e);
                    }}
                    name="product_seo_keywords"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />

          <div class="card" style={{ height: "auto" }}>
            <div class="card-body">
              <h5>FAQ</h5>
              <table class="table table-bordered">
                <thead>
                  <th scope="col" style={{ width: "1rem" }}>
                    Question
                  </th>
                  <th scope="col">Answer</th>
                </thead>

                <tbody>
                  {prodFaqInput.map((form, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {/* <select
                          class="form-control"
                          id="exampleFormControlSelect1"
                          style={{}}
                          name="questions"
                          value={productInputData.questions}
                          onChange={(e) => productInputChange(e)}
                        >
                          <option value="questions">How are you?</option>

                        </select> */}
                          <input
                            type="text"
                            class="form-control"
                            id="inputColor"
                            placeholder=""
                            value={form.questions}
                            onChange={(e) => {
                              productFaqChange(e, index);
                            }}
                            name="questions"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            id="inputColor"
                            placeholder=""
                            value={form.answers}
                            onChange={(e) => {
                              productFaqChange(e, index);
                            }}
                            name="answers"
                          />
                        </td>

                        <td>
                          <button
                            onClick={() => removeFaqFields(index)}
                            style={{ marginLeft: "1rem" }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={3}>
                      <button
                        onClick={addFaqFields}
                        style={{ marginLeft: "48rem" }}
                      >
                        Add More..
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* <--------------------------------Pricing From End-----------------------------------> */}
          <button
            type="button"
            class="btn btn-info float-right my-3"
            onClick={productUser}
          >
            Add Product
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}
