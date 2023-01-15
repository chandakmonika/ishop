import React, {useState} from 'react'
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
export default function Master_EditNewsLetter() {
  const storename = localStorage.getItem("USER_NAME")
    const [value, setValue] = useState("");
  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Newsletter Template</span>
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
           <label className="demo">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add Category"
              name="add_question"
            />
            <br />  

            <label className="demo">From Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add From Name"
              name="add_question"
            />
            <br /> 

            <label className="demo">From Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add From Email"
              name="add_question"
            />
            <br /> 

            <label className="demo">Email Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add Email Subject"
              name="add_question"
            />
            <br /> 

            <h6>Email Content</h6>
                <Master_CMSEditor setValue={setValue} config={config} />
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
