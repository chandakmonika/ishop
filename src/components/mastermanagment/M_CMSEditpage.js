import React,{useState} from 'react'
import Master_CMSEditor from './Master_CMSEditor';


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
export default function M_CMSEditpage() {
    const [value, setValue] = useState("");
  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>CMS Edit Page</span>
      </h4>
      <br />
      <form style={{ Display: "float-right" }}>
        <div className="card" style={{ paddingLeft: "1rem", width:'70rem' }}>
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
            <h6>Product Short Discription</h6>
                <Master_CMSEditor setValue={setValue} config={config} />
                <br />
                

                <label className="demo">Meta Tags</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Meta Tags"
              name="add_question"
            />
            <br /> 

            <label className="demo">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Enter Answer" rows="3"></textarea>
            <br /> 

            <label className="demo">Keywords</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Enter Answer" rows="3"></textarea>
            <br /> 

          </div>
          </div><br/>
          <button type="button" class="btn btn-info" style={{marginLeft:'60rem'}}>
          Submit
        </button>
          </form>
          </div>
  )
}
