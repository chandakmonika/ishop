import React , { useState, useEffect }from 'react'
import axios from "axios";
import Master_CMSEditor from "./Master_CMSEditor";

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

export default function Master_AddCMS() {
  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>CMS Add Page</span>
      </h4>
      <br />

      <div className="card" style={{ paddingLeft: "1rem", width: "70rem" }}>
        <br />

        <form  style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "60%" }}
          >
            <label className="demo">Page Title</label>
            <input
              type="text"
              className="form-control"
              name="page_title"
              placeholder="Enter Email Title"
              
            />
            <br />
            <h6> CMS Discription</h6>
            <Master_CMSEditor  config={config} />
            <br />

            <label className="demo">Meta Tags</label>
            <input
              type="text"
              className="form-control"
              name="seo_page_title"
              placeholder="Enter Meta Tags"
              
            />
            <br />

            <label className="demo">Description</label>
            <textarea
             type="text"
              class="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Enter Description"
              name="seo_page_description"
             
              rows="3"
            ></textarea>
            <br />

            <label className="demo">Keywords</label>
            <textarea
             type="text"
              class="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Enter Keywords"
              name="seo_page_keywords"
              
              rows="3"
            ></textarea>
            <br />
          </div>
          <br />
          <button type="button" class="btn btn-info">
              Update
            </button>
        </form>
      </div>
    </div>
  )
}
