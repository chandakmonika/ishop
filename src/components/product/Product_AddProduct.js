// import React, { useState, useEffect }  from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Product_Editor from "./Product_Editor";
// // import ReactChipInput from "react-chip-input";
// import axios from "axios";

// import "./Product_AddProduct.css";
// const config = {
//   buttons: [
//     "bold",
//     "italic",
//     "underline",
//     "link",
//     "unlink",
//     "source",
//     "paragraph",
//     "image",
//     "video",
//     "table",
//     "search",
//     "file",
//     "preview",
//     "align",
//     "undo",
//     "redo",
//     "fullsize",
//     "dots",
//     "copyformat",
//     "hr",
//     "brush",
//     "fontsize",
//   ],
// };

// export default function Product_AddProduct() {
//   const [value, setValue] = useState("");
//   const [file, setFile] = useState();
//   const [data, setData] = useState([]);

// useEffect(() => {
// axios
// .get(
// "http://admin.ishop.sunhimlabs.com/api/v1/products/categorieswithsubcategories"
// )
// .then((res) => setData(res.data.data));
// }, []);
//   function handleChange(e) {
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
//   }

//   // <----------------Dynamic Form--------------->
//   const [formFields, setFormFields] = useState([
//     { fieldlabel: "", fieldname: "", fieldtype: "", fieldvalue: "" },
//   ]);

//   const handleFormChange = (e, index) => {
//     let data = [...formFields];
//     data[index][e.target.name] = e.target.value;
//     setFormFields(data);
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     console.log(formFields);
//   };

//   const addFields = () => {
//     let object = {
//       fieldlabel: "",
//       fieldname: "",
//       fieldtype: "",
//       fieldvalue: "",
//     };
//     setFormFields([...formFields, object]);
//   };

//   const removeFields = (index) => {
//     let data = [...formFields];
//     data.splice(index, 1);
//     setFormFields(data);
//   };
//   return (
//     <div>
//       <div class="container">
//         <div class="row">
//           <div class="col" style={{ paddingRight: "30rem" }}>
//             <button type="button" class="btn ">
//               <i class="fas fa-arrow-left"></i>
//             </button>
//             <span>Add Product</span>
//           </div>
//           <div>
//             <button type="button" class="btn btn-info float-right">
//               Add Product
//             </button>
//           </div>
//         </div>
//       </div>
//       <from>
//         <div class="row">
//           {/* <-----------------------------------Title From------------------------> */}
//           <div
//             class="col-lg-4 col-md-12 mb-4 mb-lg-0"
//             style={{ paddingLeft: "1rem" }}
//           >
//             <div class="card" style={{ height: "40rem", width: "50rem" }}>
//               <div class="card-body">
//                 <div className="form-group" style={{ Float: "left" }}>
//                   <label for="exampleInputPassword1" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                 </div>
//                 <h6>Product Short Discription</h6>
//                 <Product_Editor setValue={setValue} config={config} />
//                 <br />
//                 <div></div>
//                 <h6>Product Long Discription</h6>
//                 <Product_Editor setValue={setValue} config={config} />
//               </div>
//             </div>
//             <br />
//             {/* <---------------------------------Title From End------------------------------------------> */}

//             {/* <---------------------------------Media From----------------------------------> */}

//             <div class="card" style={{ height: "24rem", width: "50rem" }}>
//               <div class="card-body">
//                 <div className="container" style={{ paddingTop: "38px" }}>
//                   <h5>Media</h5>
//                   <div className="add">
//                     <input type="file" onChange={handleChange} />
//                     <img src={file} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <---------------------------------Media From End------------------------------------------> */}

//           {/* <--------------------------------------Product Status From Start---------------------------------> */}
//           <div class="col-lg-4 mb-4 mb-lg-0" style={{ paddingLeft: "25rem" }}>
//             <div class="card" style={{ height: "14rem", width: "24rem" }}>
//               <div class="card-body">
//                 <div
//                   className="form-group"
//                   style={{ Float: "left", width: "20rem" }}
//                 >
//                   <label for="exampleFormControlSelect1">Product Status</label>
//                   <select class="form-control" id="exampleFormControlSelect1">
//                     <option>Active</option>
//                     <option>Inactive</option>
//                   </select>
//                   <br />

//                 </div>
//               </div>
//             </div>
//             <br />
//             {/* <---------------------------------Product Status From End------------------------------------------> */}

//             {/* <-----------------------------------Product Organization From Start--------------------------------------> */}

//             <div class="card" style={{ height: "76%", width: "24rem" }}>
//               <div class="card-body">
//                 <h5>Product Categorys</h5>
//                 <br />

//                 <p>Category</p>
//                 <div class="list-group">
//                   <a
//                     href="#"
//                     class="list-group-item"
//                     style={{ border: "none" }}
//                   >
//                     <form action="/action_page.php">
//                       <input
//                         type="checkbox"
//                         id="vehicle1"
//                         name="vehicle1"
//                         value="Bike"
//                       />
//                       <label for="vehicle1"> Category 1</label>
//                     </form>
//                   </a>
//                   <div class="list-group" style={{ paddingLeft: "2rem" }}>
//                     <form action="/action_page.php">
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle1"
//                           name="vehicle1"
//                           value="rtr"
//                         />
//                         <label for="vehicle2"> Sub Category 1</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle2"
//                           name="vehicle2"
//                           value="sfg"
//                         />
//                         <label for="vehicle3"> Sub Category 2</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle3"
//                           name="vehicle3"
//                           value="fgh"
//                         />
//                         <label for="vehicle4"> Sub Category 3</label>
//                       </a>
//                     </form>
//                   </div>

//                   <a
//                     href="#"
//                     class="list-group-item"
//                     style={{ border: "none" }}
//                   >
//                     <form action="/action_page.php">
//                       <input
//                         type="checkbox"
//                         id="vehicle4"
//                         name="vehicle4"
//                         value="Bike"
//                       />
//                       <label for="vehicle5"> Category 2</label>
//                     </form>
//                   </a>
//                   <div class="list-group" style={{ paddingLeft: "2rem" }}>
//                     <form action="/action_page.php">
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle5"
//                           name="vehicle5"
//                           value="rtr"
//                         />
//                         <label for="vehicle6"> Sub Category 1</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle6"
//                           name="vehicle6"
//                           value="sfg"
//                         />
//                         <label for="vehicle7"> Sub Category 2</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle7"
//                           name="vehicle7"
//                           value="fgh"
//                         />
//                         <label for="vehicle8"> Sub Category 3</label>
//                       </a>
//                     </form>
//                   </div>

//                   <a
//                     href="#"
//                     class="list-group-item"
//                     style={{ border: "none" }}
//                   >
//                     <form action="/action_page.php">
//                       <input
//                         type="checkbox"
//                         id="vehicle8"
//                         name="vehicle8"
//                         value="Bike"
//                       />
//                       <label for="vehicle9"> Category 3</label>
//                     </form>
//                   </a>
//                   <div class="list-group" style={{ paddingLeft: "2rem" }}>
//                     <form action="/action_page.php">
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle9"
//                           name="vehicle9"
//                           value="rtr"
//                         />
//                         <label for="vehicle10"> Sub Category 1</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle10"
//                           name="vehicle10"
//                           value="sfg"
//                         />
//                         <label for="vehicle11"> Sub Category 2</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle11"
//                           name="vehicle11"
//                           value="fgh"
//                         />
//                         <label for="vehicle12"> Sub Category 3</label>
//                       </a>
//                     </form>
//                   </div>
//                 </div>
//                 <br />
//                 <br />

//                 <p>Brand</p>

//                 <div class="list-group">
//                   <a
//                     href="#"
//                     class="list-group-item"
//                     style={{ border: "none" }}
//                   >
//                     <form action="/action_page.php">
//                       <input
//                         type="checkbox"
//                         id="vehicle1"
//                         name="vehicle1"
//                         value="Bike"
//                       />
//                       <label for="vehicle1"> Category 1</label>
//                     </form>
//                   </a>
//                   <div class="list-group" style={{ paddingLeft: "2rem" }}>
//                     <form action="/action_page.php">
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle1"
//                           name="vehicle1"
//                           value="rtr"
//                         />
//                         <label for="vehicle1"> Sub Category 1</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle2"
//                           name="vehicle2"
//                           value="sfg"
//                         />
//                         <label for="vehicle1"> Sub Category 2</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle3"
//                           name="vehicle3"
//                           value="fgh"
//                         />
//                         <label for="vehicle1"> Sub Category 3</label>
//                       </a>
//                     </form>
//                   </div>

//                   <a
//                     href="#"
//                     class="list-group-item"
//                     style={{ border: "none" }}
//                   >
//                     <form action="/action_page.php">
//                       <input
//                         type="checkbox"
//                         id="vehicle1"
//                         name="vehicle1"
//                         value="Bike"
//                       />
//                       <label for="vehicle1"> Category 2</label>
//                     </form>
//                   </a>
//                   <div class="list-group" style={{ paddingLeft: "2rem" }}>
//                     <form action="/action_page.php">
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle1"
//                           name="vehicle1"
//                           value="rtr"
//                         />
//                         <label for="vehicle1"> Sub Category 1</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle2"
//                           name="vehicle2"
//                           value="sfg"
//                         />
//                         <label for="vehicle1"> Sub Category 2</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle3"
//                           name="vehicle3"
//                           value="fgh"
//                         />
//                         <label for="vehicle1"> Sub Category 3</label>
//                       </a>
//                     </form>
//                   </div>

//                   <a
//                     href="#"
//                     class="list-group-item"
//                     style={{ border: "none" }}
//                   >
//                     <form action="/action_page.php">
//                       <input
//                         type="checkbox"
//                         id="vehicle1"
//                         name="vehicle1"
//                         value="Bike"
//                       />
//                       <label for="vehicle1"> Category 3</label>
//                     </form>
//                   </a>
//                   <div class="list-group" style={{ paddingLeft: "2rem" }}>
//                     <form action="/action_page.php">
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle1"
//                           name="vehicle1"
//                           value="rtr"
//                         />
//                         <label for="vehicle1"> Sub Category 1</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle2"
//                           name="vehicle2"
//                           value="sfg"
//                         />
//                         <label for="vehicle1"> Sub Category 2</label>
//                       </a>
//                       <a
//                         href="#"
//                         class="list-group-item"
//                         style={{ border: "none" }}
//                       >
//                         <input
//                           type="checkbox"
//                           id="vehicle3"
//                           name="vehicle3"
//                           value="fgh"
//                         />
//                         <label for="vehicle1"> Sub Category 3</label>
//                       </a>
//                     </form>
//                   </div>
//                 </div>
//                 <br />
//                 <div className="form-group">
//                   <label className="demo">Tags</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                   <br />
//                   <button type="button" class="btn btn-info">
//                     Add
//                   </button>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <br />
//         {/* <-----------------------------------Product Organization From End--------------------------------------> */}

//         {/* <-----------------------Product Information From Start-------------------------------> */}

//         <div
//           class="card"
//           style={{ height: "13rem", width: "73rem", marginLeft: "8px" }}
//         >
//           <div class="card-body">
//             <h5>Product Information</h5>
//             <div className="form-group">
//               <div className="row">
//                 <div className="col-md-4">
//                   <label className="demo">SKU</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                 </div>

//                 <div className="col-md-4">
//                   <label className="demo">Model Number</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <br />

//         {/* <-----------------------Product Information From End-------------------------------> */}

//         {/* <--------------------------------Pricing From start-----------------------------------> */}

//         <div
//           class="card"
//           style={{ height: "11rem", width: "73rem", marginLeft: "8px" }}
//         >
//           <div class="card-body">
//             <h5>Pricing</h5>
//             <div className="form-group">
//               <div className="row">
//                 <div className="col-md-4">
//                   <label className="demo">Base Price</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                 </div>

//                 <div className="col-md-4">
//                   <label className="demo">Selling price</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <br />
//         {/* <--------------------------------Pricing From End-----------------------------------> */}

//         {/* <-----------------------Product Attribute From Start-------------------------------> */}

//         <div
//           class="card"
//           style={{ height: "33rem", width: "73rem", marginLeft: "8px" }}
//         >
//           <div class="card-body">
//             <h5>Product Attribute</h5>
//             <div class="form-group row">
//               <label for="inputColor" class="col-sm-2 col-form-label">
//                 Color
//               </label>
//               <div class="col-sm-4">
//                 <input
//                   type="text"
//                   class="form-control"
//                   id="inputColor"
//                   placeholder="Color"
//                 />
//               </div>
//             </div>
//             <div class="form-group row">
//               <label for="inputSize" class="col-sm-2 col-form-label">
//                 Size
//               </label>
//               <div class="col-sm-4">
//                 <input
//                   type="text"
//                   class="form-control"
//                   id="inputSize"
//                   placeholder="Size"
//                 />
//               </div>
//             </div>
//             <div class="form-group row">
//               <label for="inputLorem" class="col-sm-2 col-form-label">
//                 Material
//               </label>
//               <div class="col-sm-4">
//                 <input
//                   type="text"
//                   class="form-control"
//                   id="inputLorem"
//                   placeholder="Lorem"
//                 />
//               </div>
//             </div>
//             <div class="form-group row">
//               <label
//                 class="col-sm-2 col-form-label"
//                 for="exampleFormControlSelect1"
//               >
//                 Product Status
//               </label>
//               <select
//                 class="form-control "
//                 id="exampleFormControlSelect1"
//                 style={{ width: "25rem" }}
//               >
//                 <option>Yes</option>
//                 <option>No</option>
//               </select>
//             </div>

//             <h5>Add Customized Attribute</h5>
//             <div class="card" style={{ height: "7rem", width: "52rem" }}>
//               <div class="card-body">
//                 <div class="form-group row" style={{ marginRight: "-505px " }}>
//                   <label
//                     for="inputCustomizedAttribute"
//                     class="col-sm-2 col-form-label"
//                   >
//                     Customized Attribute
//                   </label>
//                   <div class="col-sm-4">
//                     <input
//                       type="text"
//                       class="form-control"
//                       id="inputCustomizedAttribute"
//                       placeholder="Customized Attribute"
//                     />
//                   </div>
//                   <button type="button" class="btn btn-info">
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <br />
//         {/* <-----------------------Product Attribute From End-------------------------------> */}

//         {/* <--------------------Dynamic Form---------------> */}

//         <div class="card" style={{ height: "auto", width: "73rem" }}>
//           <div class="card-body">
//             <h5>Product Varient</h5>
//             <table class="table table-bordered">
//             <thead>

//                       <th scope="col">
//                        Color
//                       </th>
//                       <th scope="col">
//                         Size
//                       </th>
//                       <th scope="col">
//                        Inventory
//                       </th>
//                       <th scope="col">
//                         Price
//                       </th>

//                     </thead>

//                     <tbody>
//                     {formFields.map((form, index) => {
//                 return (

//                     <tr key={index}>
//                       <td>
//                         <select
//                           class="form-control "
//                           id="exampleFormControlSelect1"
//                           style={{ width: "13rem" }}
//                         >
//                           <option>Red</option>
//                           <option>Black</option>
//                         </select>
//                       </td>
//                       <td>
//                         <select
//                           class="form-control "
//                           id="exampleFormControlSelect1"
//                           style={{ width: "13rem" }}
//                         >
//                           <option>L</option>
//                           <option>M</option>
//                         </select>
//                       </td>
//                       <td>
//                       <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                       </td>
//                       <td>
//                       <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                   />
//                       </td>
//                       <button onClick={() => removeFields(index)} style={{marginLeft:'1rem'}}>
//                         Remove
//                       </button>
//                     </tr>

//                 );

//               })}
//               </tbody>
//                 <button onClick={addFields} style={{marginLeft:'48rem'}}>Add More..</button>
//                     <br />
//             </table>
//           </div>
//         </div><br/>
//         {/* <--------------------Dynamic Form end------------------> */}

//         {/* <--------------------------------Pricing From start-----------------------------------> */}

//         <div
//           class="card"
//           style={{ height: "auto", width: "73rem", marginLeft: "7px" }}
//         >
//           <div class="card-body">
//             <h5>Pricing</h5>
//             <div class="form-group row">
//               <label for="inputColor" class="col-sm-2 col-form-label">
//                 Meta Tags
//               </label>
//               <div class="col-sm-4">
//                 <input
//                   type="text"
//                   class="form-control"
//                   id="inputColor"
//                   placeholder="Meta Tags"
//                 />
//               </div>
//             </div>
//             <div class="form-group row">
//               <label for="inputColor" class="col-sm-2 col-form-label">
//                 Description
//               </label>
//               <div class="col-sm-4">
//                 <input
//                   type="text"
//                   class="form-control"
//                   id="inputColor"
//                   placeholder="Description"
//                 />
//               </div>
//             </div>
//             <div class="form-group row">
//               <label for="inputColor" class="col-sm-2 col-form-label">
//                 Keyword
//               </label>
//               <div class="col-sm-4">
//                 <input
//                   type="text"
//                   class="form-control"
//                   id="inputColor"
//                   placeholder="Keyword"
//                 />
//               </div>
//             </div>

//           </div>
//         </div>
//         <br />
//         {/* <--------------------------------Pricing From End-----------------------------------> */}
//         <button type="button" class="btn btn-info " style={{marginLeft:"65rem"}}>
//           Add Product
//         </button>
//       </from>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Product_Editor from "./Product_Editor";
// import ReactChipInput from "react-chip-input";
import axios from "axios";

import "./Product_AddProduct.css";
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
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://admin.ishop.sunhimlabs.com/api/v1/products/categorieswithsubcategories"
      )
      .then((res) => {
        setCategoryData(res.data.data);
      });
  }, []);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
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

  // const CategoryDataList = () => {
  // categoryData && categoryData.length > 0 &&
  // categoryData.map((cat) => {
  // return (
  // <div key={cat.category_name}>
  // <a
  // href="#"
  // class="list-group-item"
  // style={{ border: "none" }}
  // >
  // <form action="/action_page.php">
  // <input
  // type="checkbox"
  // id="vehicle1"
  // name="vehicle1"
  // value="Bike"
  // />
  // <label for="vehicle1">{cat.category_name}</label>
  // </form>
  // </a>
  // <div class="list-group" style={{ paddingLeft: "2rem" }}>
  // <form action="/action_page.php">
  // {
  // cat.subcategories.map((subCat) => {
  // return (
  // <div key={subCat.category_name}>
  // <a
  // href="#"
  // class="list-group-item"
  // style={{ border: "none" }}
  // >
  // <input
  // type="checkbox"
  // id="vehicle1"
  // name="vehicle1"
  // value="rtr"
  // />
  // <label for="vehicle2">{subCat.category_name}</label>
  // </a>
  // </div>
  // )
  // })
  // }
  // </form>
  // </div>
  // </div>
  // )
  // })
  // }

  return (
    <div>
      {console.log(2324, categoryData)}
      <div class="container">
        <div class="row">
          <div class="col" style={{ paddingRight: "30rem" }}>
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
      <form>
        <div class="row">
          {/* <-----------------------------------Title From------------------------> */}
          <div
            class="col-lg-4 col-md-12 mb-4 mb-lg-0"
            style={{ paddingLeft: "1rem" }}
          >
            <div class="card" style={{ height: "40rem", width: "50rem" }}>
              <div class="card-body">
                <div className="form-group" style={{ Float: "left" }}>
                  <label for="exampleInputPassword1" className="form-label">
                    Title
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <h6>Product Short Discription</h6>
                <Product_Editor setValue={setValue} config={config} />
                <br />
                <div></div>
                <h6>Product Long Discription</h6>
                <Product_Editor setValue={setValue} config={config} />
              </div>
            </div>
            <br />
            {/* <---------------------------------Title From End------------------------------------------> */}

            {/* <---------------------------------Media From----------------------------------> */}

            <div class="card" style={{ height: "24rem", width: "50rem" }}>
              <div class="card-body">
                <div className="container" style={{ paddingTop: "38px" }}>
                  <h5>Media</h5>
                  <div className="add">
                    <input type="file" onChange={handleChange} />
                    <img src={file} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <---------------------------------Media From End------------------------------------------> */}

          {/* <--------------------------------------Product Status From Start---------------------------------> */}
          <div class="col-lg-4 mb-4 mb-lg-0" style={{ paddingLeft: "25rem" }}>
            <div class="card" style={{ height: "14rem", width: "24rem" }}>
              <div class="card-body">
                <div
                  className="form-group"
                  style={{ Float: "left", width: "20rem" }}
                >
                  <label for="exampleFormControlSelect1">Product Status</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <br />
                </div>
              </div>
            </div>
            <br />
            {/* <---------------------------------Product Status From End------------------------------------------> */}

            {/* <-----------------------------------Product Organization From Start--------------------------------------> */}

            <div class="card" style={{ height: "76%", width: "24rem" }}>
              <div class="card-body">
                <h5>Product Categories</h5>
                <br />

                <p>Category</p>
                <div class="list-group">
                  {categoryData &&
                    categoryData.length > 0 &&
                    categoryData.map((cat) => {
                      return (
                        <div>
                          <div key={`category${cat.category_id}`}>
                            <input
                              type="checkbox"
                              id={cat.category_slug}
                              name={cat.category_slug}
                              checked={cat.isChecked ? "checked" : false}
                              onChange={(e) => {
                                const checkedData = categoryData.map((d) => {
                                  if (d.category_id === cat.category_id) {
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
                                });
                                setCategoryData(checkedData);
                              }}
                            />
                            <label for={cat.category_slug}>
                              <span>{cat.category_name}</span>
                            </label>
                            {cat.isChecked && (
                              <div
                                class="list-group"
                                style={{ paddingLeft: "2rem" }}
                              >
                                <form action="/action_page.php">
                                  {cat.subcategories.map((subCat) => {
                                    return (
                                      <div
                                        key={`sub-category${subCat.category_id}`}
                                      >
                                        <a
                                          href="#"
                                          class="list-group-item"
                                          style={{ border: "none" }}
                                        >
                                          <input
                                            type="checkbox"
                                            id={subCat.category_slug}
                                            name={subCat.category_slug}
                                            value="rtr"
                                          />
                                          <label for={subCat.category_slug}>
                                            {subCat.category_name}
                                          </label>
                                        </a>
                                      </div>
                                    );
                                  })}
                                </form>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <br />
                <br />

                <p>Brand</p>

                <div class="list-group">
                  <a
                    href="#"
                    class="list-group-item"
                    style={{ border: "none" }}
                  >
                    <form action="/action_page.php">
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      />
                      <label for="vehicle1"> Category 1</label>
                    </form>
                  </a>
                  <div class="list-group" style={{ paddingLeft: "2rem" }}>
                    <form action="/action_page.php">
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="vehicle1"
                          value="rtr"
                        />
                        <label for="vehicle1"> Sub Category 1</label>
                      </a>
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle2"
                          value="sfg"
                        />
                        <label for="vehicle1"> Sub Category 2</label>
                      </a>
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle3"
                          name="vehicle3"
                          value="fgh"
                        />
                        <label for="vehicle1"> Sub Category 3</label>
                      </a>
                    </form>
                  </div>

                  <a
                    href="#"
                    class="list-group-item"
                    style={{ border: "none" }}
                  >
                    <form action="/action_page.php">
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      />
                      <label for="vehicle1"> Category 2</label>
                    </form>
                  </a>
                  <div class="list-group" style={{ paddingLeft: "2rem" }}>
                    <form action="/action_page.php">
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="vehicle1"
                          value="rtr"
                        />
                        <label for="vehicle1"> Sub Category 1</label>
                      </a>
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle2"
                          value="sfg"
                        />
                        <label for="vehicle1"> Sub Category 2</label>
                      </a>
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle3"
                          name="vehicle3"
                          value="fgh"
                        />
                        <label for="vehicle1"> Sub Category 3</label>
                      </a>
                    </form>
                  </div>

                  <a
                    href="#"
                    class="list-group-item"
                    style={{ border: "none" }}
                  >
                    <form action="/action_page.php">
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      />
                      <label for="vehicle1"> Category 3</label>
                    </form>
                  </a>
                  <div class="list-group" style={{ paddingLeft: "2rem" }}>
                    <form action="/action_page.php">
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="vehicle1"
                          value="rtr"
                        />
                        <label for="vehicle1"> Sub Category 1</label>
                      </a>
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle2"
                          value="sfg"
                        />
                        <label for="vehicle1"> Sub Category 2</label>
                      </a>
                      <a
                        href="#"
                        class="list-group-item"
                        style={{ border: "none" }}
                      >
                        <input
                          type="checkbox"
                          id="vehicle3"
                          name="vehicle3"
                          value="fgh"
                        />
                        <label for="vehicle1"> Sub Category 3</label>
                      </a>
                    </form>
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <label className="demo">Tags</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
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
        <br />
        {/* <-----------------------------------Product Organization From End--------------------------------------> */}

        {/* <-----------------------Product Information From Start-------------------------------> */}

        <div
          class="card"
          style={{ height: "13rem", width: "73rem", marginLeft: "8px" }}
        >
          <div class="card-body">
            <h5>Product Information</h5>
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="demo">SKU</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="col-md-4">
                  <label className="demo">Model Number</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        {/* <-----------------------Product Information From End-------------------------------> */}

        {/* <--------------------------------Pricing From start-----------------------------------> */}

        <div
          class="card"
          style={{ height: "11rem", width: "73rem", marginLeft: "8px" }}
        >
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
                  />
                </div>

                <div className="col-md-4">
                  <label className="demo">Selling price</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* <--------------------------------Pricing From End-----------------------------------> */}

        {/* <-----------------------Product Attribute From Start-------------------------------> */}

        <div
          class="card"
          style={{ height: "23rem", width: "73rem", marginLeft: "8px" }}
        >
          <div class="card-body">
            <h5>Product Attribute</h5>
            <div class="form-group row">
              <label for="inputColor" class="col-sm-2 col-form-label">
                Color
              </label>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  id="inputColor"
                  placeholder="Color"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputSize" class="col-sm-2 col-form-label">
                Size
              </label>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  id="inputSize"
                  placeholder="Size"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputLorem" class="col-sm-2 col-form-label">
                Material
              </label>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  id="inputLorem"
                  placeholder="Lorem"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                class="col-sm-2 col-form-label"
                for="exampleFormControlSelect1"
              >
                Product Status
              </label>
              <select
                class="form-control "
                id="exampleFormControlSelect1"
                style={{ width: "25rem" }}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        {/* <-----------------------Product Attribute From End-------------------------------> */}

        {/* <--------------------Dynamic Form---------------> */}

        <div class="card" style={{ height: "auto", width: "73rem" }}>
          <div class="card-body">
            <h5>Product Varient</h5>
            <table class="table table-bordered">
              <thead>
                <th scope="col">Color</th>
                <th scope="col">Size</th>
                <th scope="col">Inventory</th>
                <th scope="col">Price</th>
              </thead>

              <tbody>
                {formFields.map((form, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <select
                          class="form-control "
                          id="exampleFormControlSelect1"
                          style={{ width: "13rem" }}
                        >
                          <option>Red</option>
                          <option>Black</option>
                        </select>
                      </td>
                      <td>
                        <select
                          class="form-control "
                          id="exampleFormControlSelect1"
                          style={{ width: "13rem" }}
                        >
                          <option>L</option>
                          <option>M</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </td>
                      <button
                        onClick={() => removeFields(index)}
                        style={{ marginLeft: "1rem" }}
                      >
                        Remove
                      </button>
                    </tr>
                  );
                })}
              </tbody>
              <button onClick={addFields} style={{ marginLeft: "48rem" }}>
                Add More..
              </button>
              <br />
            </table>
          </div>
        </div>
        <br />
        {/* <--------------------Dynamic Form end------------------> */}

        {/* <--------------------------------Pricing From start-----------------------------------> */}

        <div
          class="card"
          style={{ height: "auto", width: "73rem", marginLeft: "7px" }}
        >
          <div class="card-body">
            <h5>Pricing</h5>
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
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* <--------------------------------Pricing From End-----------------------------------> */}
        <button
          type="button"
          class="btn btn-info "
          style={{ marginLeft: "65rem" }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
