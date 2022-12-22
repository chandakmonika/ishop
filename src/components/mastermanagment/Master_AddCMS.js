import React, { useState, useEffect } from "react";
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
  const [page_title, setPage_title] = useState("");
  const [page_description, setPage_description] = useState("");
  const [featured_image, setFeatured_image] = useState("");
  const [seo_page_title, setSeo_page_title] = useState("");
  const [seo_page_keywords, setSeo_page_keywords] = useState("");
  const [seo_page_description, setSeo_page_description] = useState("");

  function customerUser() {
    console.warn(
      page_title,
      page_description,
      featured_image,
      seo_page_title,
      seo_page_keywords,
      seo_page_description
    );
    let datas = {
      page_title,
      page_description,
      featured_image,
      seo_page_title,
      seo_page_keywords,
      seo_page_description,
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/cmspages/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
      });
    });
  }
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>CMS Add Page</span>
      </h4>
      <br />

      <div className="card" style={{ paddingLeft: "1rem", width: "70rem" }}>
        <br />

        <form onSubmit={submit} style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "60%" }}
          >
            <label className="demo">Page Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email Title"
              value={page_title}
              onChange={(e) => {
                setPage_title(e.target.value);
              }}
              name="page_title"
            />
            <br />
            <h6> CMS Discription</h6>
            <Master_CMSEditor
              Value={page_description}
              onChange={(e) => {
                setPage_description(e.target.value);
              }}
              config={config}
            />
            <br />

            <label className="demo">Meta Tags</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Meta Tags"
              value={seo_page_title}
              onChange={(e) => {
                setSeo_page_title(e.target.value);
              }}
              name="seo_page_title"
            />
            <br />

            <label className="demo">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Enter Description"
              value={seo_page_description}
              onChange={(e) => {
                setSeo_page_description(e.target.value);
              }}
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
              value={seo_page_keywords}
              onChange={(e) => {
                setSeo_page_keywords(e.target.value);
              }}
              name="seo_page_keywords"
              rows="3"
            ></textarea>
            <br />
          </div>
          <br />
          <button type="button" class="btn btn-info" onClick={customerUser}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
