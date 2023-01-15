import React, { useState } from "react";

export default function Blog_AddBlog() {
  const storename = localStorage.getItem("USER_NAME")
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [featured_image, setfeatured_image] = useState();
  const [blogs_tags, setBlogs_tags] = useState();

  function customerUser() {
    console.warn(title, description, featured_image, blogs_tags);

    let datas = {
      title,
      description,
      blogs_tags,
      featured_image,
    };

    fetch("http://admin.ishop.sunhimlabs.com/api/v1/blog/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
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
    <div>
      <div style={{ paddingLeft: "10rem" }}>
        <h4 style={{ paddingLeft: "2rem" }}>
          <span>Add Blog</span>
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
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  name="title"
                />

                <label className="demo">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  name="description"
                />

                <label className="demo">Tags</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Tags"
                  value={blogs_tags}
                  onChange={(e) => {
                    setBlogs_tags(e.target.value);
                  }}
                  name="blogs_tags"
                />
                <label className="demo">Featured Image</label>
                <div className="add">
                  <input
                    type="file"
                    value={featured_image}
                    // onChange={(e) => {
                    //   setFeatured_image(e.target.value);
                    // }}
                    name="featured_image"
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
                Add Blog
              </button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
