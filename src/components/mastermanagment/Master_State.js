import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function Master_State() {
  const [index, setIndex] = useState([]);
  const [country_name, setCountry_name] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [state_name, setState_name] = useState("");


  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcountries/`)
      .then((res) => setIndex(res.data.data));
  }, []);

  function customerUser() {
    console.warn(country_name,country_id,state_name);
    let datas = {
      country_name,
      country_id,
      state_name  
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/states/add", {
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
        <span>Add State</span>
      </h4>
      <br />
      
        <div className="card" style={{ paddingLeft: "1rem", width:'70rem' }}>
          <br />
          <form onSubmit={submit} style={{ Display: "float-right" }}>

          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "50%" }}
          >
          <label for="exampleFormControlSelect1">Country</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={country_id}
                onChange={(e) => {
                  setCountry_id(e.target.value);
                }}
                name="country_id"
                category
              >
                {index.map((item) => {
                  return (
                    <option value={item.country_id}>
                      {item.country_name}
                    </option>
                  );
                })}
              </select>
            <br />  

            <label className="demo">State </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add State"
              value={state_name}
                onChange={(e) => {
                  setState_name(e.target.value);
                }}
                name="state_name"
            />
          </div><br/>
          <button type="button" class="btn btn-info" onClick={customerUser}>
          Add State
        </button>
        </form><br/>
          </div>
          
          
          </div>
  )
}

