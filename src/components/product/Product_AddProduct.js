import "./Product_AddProduct.css";

import React, { useEffect, useState, } from "react";
import { validateAlphaNumeric, validateNumeric, validateRequired } from "../../utils/form-validation";

import Product_Editor from "./Product_Editor";
import axios from "axios";
import { toaster } from "../../utils/toaster";
import { useNavigate } from "react-router-dom";

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
  const storename = localStorage.getItem("USER_NAME")

  const [mediaFiles, setMediaFiles] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectSubCatData, setSelectSubCatData] = useState([]);
  const [prodAttributeInput, setProdAttributeInput] = useState([]);
  const [varientFormFields, setVarientFormFields] = useState([]);
  const [prodFaqInput, setProdFaqInput] = useState([
    {
      questions: "",
      answers: "",
    },
  ]);
  const [productInputData, setProductInputData] = useState({
    product_name: {
      value: '',
      error: ''
    },
    parent_category_id: {
      value: '',
      error: ''
    },
    category_id: {
      value: '',
      error: ''
    },
    brand: "",
    model_number: {
      value: '',
      error: ''
    },
    product_short_desc: "",
    product_long_desc: "",
    product_image: [{
      media_id: ""
    }],
    product_status: "1",
    product_qty: {
      value: '',
      error: ''
    },
    attributes: [],
    faq: [],
    sku: {
      value: '',
      error: ''
    },
    shipping_charges: {
      value: '',
      error: ''
    },
    price_base: {
      value: '',
      error: ''
    },
    price_sell: {
      value: '',
      error: ''
    },
    price_mrp: {
      value: '',
      error: ''
    },
    product_tags: "",
    product_seo_title: "",
    product_seo_description: "",
    product_seo_keywords: "",
    product_weight: {
      value: '',
      error: ''
    },
    tax_amount: {
      value: '',
      error: ''
    },
    variants: [],
  });

  const navigate = useNavigate();

  function addProductSubmitForm() {

    const { product_name, parent_category_id, category_id, sku, model_number, product_qty, product_weight, shipping_charges, price_base, price_mrp, price_sell, tax_amount } = productInputData

    const productDataValidated = {
      ...productInputData,
      product_name: {
        value: product_name.value,
        error: validateRequired(product_name.value).error ? validateRequired(product_name.value).error : validateAlphaNumeric(product_name.value).error
      },
      parent_category_id: {
        value: parent_category_id.value,
        error: validateRequired(parent_category_id.value).error
      },
      category_id: {
        value: category_id.value,
        error: validateRequired(category_id.value).error
      },
      sku: {
        value: sku.value,
        error: validateAlphaNumeric(sku.value).error
      },
      model_number: {
        value: model_number.value,
        error: validateAlphaNumeric(model_number.value).error
      },
      product_qty: {
        value: product_qty.value,
        error: validateNumeric(product_qty.value).error
      },
      price_base: {
        value: price_base.value,
        error: validateNumeric(price_base.value).error
      },
      price_mrp: {
        value: price_mrp.value,
        error: validateNumeric(price_mrp.value).error
      },
      price_sell: {
        value: price_sell.value,
        error: validateNumeric(price_sell.value).error
      },
      shipping_charges: {
        value: shipping_charges.value,
        error: validateNumeric(shipping_charges.value).error
      },
      product_weight: {
        value: product_weight.value,
        error: validateNumeric(product_weight.value).error
      },
      tax_amount: {
        value: tax_amount.value,
        error: validateNumeric(tax_amount.value).error
      }
    }

    setProductInputData(productDataValidated)

    const ErrorFields = Object.entries(productDataValidated).filter((err) => typeof err[1] === "object" && err[1].error)

    console.log(54546, Object.entries(productDataValidated), ErrorFields)

    if (ErrorFields.length <= 0) {
      const productData = {
        ...productDataValidated,
        product_name: product_name.value,
        parent_category_id: parent_category_id.value,
        category_id: category_id.value,
        sku: sku.value,
        model_number: model_number.value,
        product_qty: product_qty.value,
        price_base: price_base.value,
        price_mrp: price_mrp.value,
        price_sell: price_sell.value,
        shipping_charges: shipping_charges.value,
        product_weight: product_weight.value,
        tax_amount: tax_amount.value
      }
      console.log(761233, productData)
      fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/products/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "Application/json",
          storename: storename,
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
    } else {
      toaster({message: "Please fill proper input data"})
    }

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
            storename: storename,
          },

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
        [inputName]: {
          value: e.toString(),
          error: ''
        },
      });
    } else {
      setProductInputData({
        ...productInputData,
        [e.target.name]: typeof productInputData[e.target.name] === "object" ? {
          value: e.target.value,
          error: ''
        } : e.target.value
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
      category_id: {
        value: e.target.value,
        error: ''
      },
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

  const removeMediaFile = (i) => {
    let data = [...mediaFiles];
    data.splice(i, 1);
    setMediaFiles(data);
  };

  const { product_name, parent_category_id, category_id, sku, model_number, product_qty } = productInputData

  const inputFieldError = (error) => {
    if (error && error.length > 0) {
      return <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
    }

    return <></>
  }

  return (
    <div>
      <div>
        <div class="py-4">
          {console.log(6756, productInputData)}
          <div class="d-flex justify-content-between">
            <div class="">
              <button type="button" class="btn ">
                <i class="fas fa-arrow-left"></i>
              </button>
              <span>Add Product</span>
            </div>
            <div>
              <button type="button" class="btn btn-info float-right" onClick={addProductSubmitForm}>
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
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="product_name"
                        value={product_name.value}
                        onChange={(e) => {
                          productInputChange(e);
                        }}
                        name="product_name"
                      />
                      {inputFieldError(product_name.error)}
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
                        <div className="">
                          {mediaFiles.map((file, i) => (
                            <div className="position-relative image-container">
                              <img
                                src={file.media_file}
                                width={250}
                                height={250}
                              />
                              <div
                                className="remove-file-icon"
                                onClick={() => removeMediaFile(i)}
                              >
                                x
                              </div>
                            </div>
                          ))}
                        </div>
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
                    <div>
                      <div class="list-group category-scrollbar">
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
                                    value={category_id.value}
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
                      {inputFieldError(category_id.error ? category_id.error : parent_category_id.error)}
                    </div>
                    <div>
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
                    </div>
                    <br />

                    <div className="form-group">
                      <label className="demo">Tags</label>
                      <input
                        type="email"
                        className="form-control"
                        id="product_tags"
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
                      id="sku"
                      // aria-describedby="emailHelp"
                      value={sku.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="sku"
                    />
                    {inputFieldError(sku.error)}
                  </div>

                  <div className="col-md-3">
                    <label className="demo">Model Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="model_number"
                      value={model_number.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="model_number"
                    />
                    {inputFieldError(model_number.error)}
                  </div>

                  <div className="col-md-3">
                    <label className="demo">Product Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      id="product_qty"
                      aria-describedby="product_qty"
                      value={product_qty.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="product_qty"
                    />
                    {inputFieldError(product_qty.error)}
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
                      id="price_base"
                      aria-describedby="emailHelp"
                      value={productInputData.price_base.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="price_base"
                    />
                    {inputFieldError(productInputData.price_base.error)}
                  </div>

                  <div className="col-md-4">
                    <label className="demo">Original Price</label>
                    <input
                      type="email"
                      className="form-control"
                      id="price_mrp"
                      aria-describedby="emailHelp"
                      value={productInputData.price_mrp.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="price_mrp"
                    />
                    {inputFieldError(productInputData.price_mrp.error)}
                  </div>
                  <div className="col-md-4">
                    <label className="demo">Selling Price</label>
                    <input
                      type="email"
                      className="form-control"
                      id="price_sell"
                      aria-describedby="emailHelp"
                      value={productInputData.price_sell.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="price_sell"
                    />
                    {inputFieldError(productInputData.price_sell.error)}
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
                      id="shipping_charges"
                      aria-describedby="emailHelp"
                      value={productInputData.shipping_charges.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="shipping_charges"
                    />
                    {inputFieldError(productInputData.shipping_charges.error)}
                  </div>

                  <div className="col-md-4">
                    <label className="demo">Product Weight</label>
                    <input
                      type="email"
                      className="form-control"
                      id="product_weight"
                      aria-describedby="emailHelp"
                      value={productInputData.product_weight.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="product_weight"
                    />
                    {inputFieldError(productInputData.product_weight.error)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

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
                      id="tax_amount"
                      aria-describedby="emailHelp"
                      value={productInputData.tax_amount.value}
                      onChange={(e) => {
                        productInputChange(e);
                      }}
                      name="tax_amount"
                    />
                    {inputFieldError(productInputData.tax_amount.error)}
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
                          {attr.attributes_type === "select" ||
                            attr.attributes_type === "s" ? (
                            <select
                              name={attr.attributes_label}
                              id={attr.attributes_label}
                              onChange={(e) => handleAttributeInputChange(e)}
                              className="form-control"
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
                    </table>
                      <button
                        onClick={addVarientFields}
                        className="float-end"
                      // style={{ marginLeft: "48rem" }}
                      >
                        Add More..
                      </button>
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
                </tbody>
              </table>
              <button
                onClick={addFaqFields}
                // style={{ marginLeft: "48rem" }}
                className="float-end"
              >
                Add More..
              </button>
            </div>
          </div>
          {/* <--------------------------------Pricing From End-----------------------------------> */}
          <button
            type="button"
            class="btn btn-info float-right my-3"
            onClick={addProductSubmitForm}
          >
            Add Product
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}

