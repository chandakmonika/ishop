import React from 'react'

export default function Seo() {
  return (
    <div>
      <div style={{ paddingLeft: "10rem" }}>
        <h4 style={{ paddingLeft: "2rem" }}>
          <span>SEO</span>
        </h4>
        <div className="card" style={{ width: "50rem" }}>
          <div className="ind">
            <br />

            {/* <h6 style={{ paddingLeft: "2rem" }}>Payment Getway Edit</h6> */}
            <form style={{ Display: "float-right", paddingLeft: "2rem" }}>
            
            <label for="exampleFormControlSelect1">Page Name</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  category
                >
                  <option></option>
               <option></option>
                </select><br/>
               
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
            </form>
          </div>
    </div>
    </div>
    </div>
    
  )
}
