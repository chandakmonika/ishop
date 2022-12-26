import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
export default function M_CMSEditpage() {
  const [value, setValue] = useState("");
  const [page_title, setPage_title] = useState("");
  const [page_description, setPage_description] = useState("");
  const [seo_page_title, setSeo_page_title] = useState("");
  const [seo_page_keywords, setSeo_page_keywords] = useState("");
  const [seo_page_description, setSeo_page_description] = useState([]);
  const [userdata, setUser_data] = useState({
    page_title: "",
    page_description: "",
    seo_page_title: "",
    seo_page_keywords: "",
    seo_page_description: ""
  });
  const { page_id } = useParams();
  console.log('page_id', page_id)
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/cmspages/details/${page_id}`
      )
      .then((res) => {
        const getData = {
          page_title: res?.data?.data?.page_title,
          page_description: res?.data?.data?.page_description,
          seo_page_title: res.data?.seo?.page_title,
          seo_page_keywords: res?.data?.seo?.page_keywords,
          seo_page_description: res?.data?.seo?.page_description
        }
        // const getData = res.data;
        // const getSeo = res.data.seo;
        console.log(678, getData);
        // console.log(getSeo);
        setUser_data(getData);
        // setUser_data(getSeo);
      });
  }, [page_id]);

  const handleChange = (e) => {
    console.log(e.target);

    setUser_data({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function customerUser() {
    console.warn(
      page_title,
      page_description,
      seo_page_title,
      seo_page_keywords,
      seo_page_description
    );

    fetch(
      `http://admin.ishop.sunhimlabs.com/api/v1/cmspages/edit/${page_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userdata),
      }
    ).then((result) => {
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
        <span>CMS Edit Page</span>
      </h4>
      <br />

      <div className="card p-4">
        <form onSubmit={submit} style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
          >
            <label className="demo">Page Title</label>
            <input
              type="text"
              className="form-control"
              name="page_title"
              placeholder="Enter Email Title"
              value={userdata?.page_title}
              onChange={handleChange}
            />
            <br />
            <h6> Short Discription</h6>
            <Master_CMSEditor setValue={setValue} config={config} value={userdata?.page_description} />
            <br />

            <label className="demo">Meta Tags</label>
            <input
              type="text"
              className="form-control"
              name="seo_page_title"
              placeholder="Enter Meta Tags"
              value={userdata?.seo_page_title}
              onChange={handleChange}
            />
            <br />

            <label className="demo">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Enter Description"
              name="seo_page_description"
              value={userdata?.seo_page_description}
              onChange={handleChange}
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
              value={userdata?.seo_page_keywords}
              onChange={handleChange}
              rows="3"
            ></textarea>
            <br />
          </div>
          <br />
          <button type="button" class="btn btn-info" onClick={customerUser}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

