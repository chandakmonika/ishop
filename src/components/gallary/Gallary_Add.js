import React, { useState } from 'react'
import { Button } from "@mui/material";

export default function Gallary_Add() {
    const [file, setFile] = useState();
    const [mediaFiles, setMediaFiles] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

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
                />

             
                <label className="demo">Featured Image</label>
                <div className="add">
                  <input
                    type="file"
                   
                    // onChange={(e) => {
                    //   setFeatured_image(e.target.value);
                    // }}
                    name="featured_image"
                  />
                  <img src={file} />
                </div>
 
                <div className="add">
                        {/* <input
                          type="file"
                          id="files"
                          name="files"
                          onChange={handleImageUpload}
                          multiple
                        /> */}
                        <Button variant="contained" className="upload_button" onClick={handleOpen}>upload Media</Button>
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
                                
                              >
                                x
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

              </div>
              <button
                type="button"
                class="btn btn-info"
              
                style={{ marginLeft: "2rem" }}
              >
                Add Gallary
              </button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
