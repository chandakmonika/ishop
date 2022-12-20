import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Blog_EditBlog() {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [featured_image, setfeatured_image] = useState();
  const [blogs_tags, setBlogs_tags] = useState();

  const [userdata, setUser_data] = useState({
    title: "",
    description: "",
    featured_image: "",
    blogs_tags: ""
   
  });
  const { blog_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/blog/details/${blog_id}`
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        setUser_data(getData);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target);

    setUser_data({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };


  function customerUser() {
    console.warn(title, description, featured_image, blogs_tags);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/blog/edit/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(userdata),
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
    <div>
    <div style={{ paddingLeft: "10rem" }}>
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Edit Blog</span>
      </h4>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />
          <form
            onSubmit={submit}
            style={{ Display: "float-right", paddingLeft: "2rem" }}
          >
            <div
              className="form-group"
              controlId="formBasicFirstName"
              style={{ width: "40%" }}
            >
              <label className="demo">Add Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                name="title"
                value={userdata?.title}
                onChange={handleChange}
                
              />

              <label className="demo">Description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Description"
                name="description"
                value={userdata?.description}
                onChange={handleChange}
                
              />

              <label className="demo">Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Tags"
                name="blogs_tags"
                value={userdata?.blogs_tags}
                onChange={handleChange}
                
              />
              <label className="demo">Featured Image</label>
              <div className="add">
                <input
                  type="file"
                  name="featured_image"
                  value={userdata?.featured_image}
                  onChange={handleChange}
                  
                />
                <img src={file} />
              </div>

              <label className="demo">Meta Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Meta Tags"
              />

              <label className="demo">Meta Description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Description"
              />

              <label className="demo">Meta Keywords</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Keywords"
              />
            </div>
            <button
              type="button"
              class="btn btn-info"
              onClick={customerUser}
              style={{ marginLeft: "2rem" }}
            >
            Update
            </button>
          </form>
          <br />
        </div>
      </div>
    </div>
  </div>
  )
}
