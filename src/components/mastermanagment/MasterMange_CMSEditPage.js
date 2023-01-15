import React,{useState} from 'react'
import Product_Editor from "./Product_Editor";

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
export default function mastermange_CMSEditPage() {
    const [value, setValue] = useState([]);
  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Add FAQ Category</span>
      </h4>
      <br />
      <form style={{ Display: "float-right" }}>
        <div className="card" style={{ paddingLeft: "1rem" }}>
          <br />

          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "50%" }}
          >
           <label className="demo">Page Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add Category"
              name="add_question"
            />
            <br />  
            <h6>Product Discription</h6>
                <Product_Editor setValue={setValue} config={config} />
                <br />
                

          </div>
          </div><br/>
          <button type="button" class="btn btn-info float-right">
          Submit
        </button>
          </form>
          </div>
    
  )
}
